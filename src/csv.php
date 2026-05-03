<?php

class CSV{
	private mixed $config;
	private DB $db;
	private string $currency;
	private array $categories = [];

	public function __construct($config){
		$this->config=$config;
		$this->db=new DB();
		$this->currency = $this->db->getSettings()['currency'];
		if(isset($this->config->autoDetectCategory) && $this->config->autoDetectCategory) {
			$this->categories = $this->db->getCategoriesForAutoDetect();
		}
	}
	private function getData($key, $headers, $post) {
		$idx = array_search(@$this->config->mappings->{$key}, $headers);
		if($idx === false) {
			return null;
		}
		return @$post[$idx];
	}
	private function convertCurrencyValue($numeric): float|int {
		if(strpos($numeric, '.') === false && strpos($numeric, ',') === false) {
			return intval($numeric) / 100;
		}
		if(strpos($numeric, '.') !== false && strpos($numeric, ',') !== false && 
		strpos($numeric, '.') < strpos($numeric, ',')) {
			$numeric = str_replace('.', '', $numeric); 
		}
		return doubleval(str_replace(',', '.', $numeric));
	}
	private function convertDate($date): int|null {
		$formats = [
			"d.m.y",
			"d.m.Y",
			"Y-m-d"
		];
		foreach($formats as $format) {
			$parsed = DateTime::createFromFormat($format, $date);
			if($parsed) {
				return $parsed->getTimestamp();
			}
		}
		return null;
	}
	private function guessCategory($label, $notes = null): int|null {
		$combined = trim(($label ?? '') . ' ' . ($notes ?? ''));
		if(!$combined || empty($this->categories)) {
			return null;
		}

		/** @var array<string, mixed>|null */
		$matched = null;
		$splitted = explode(' ', $combined);

		// First try keyword matching
		foreach($this->categories as $category) {
			if(!empty($category['keywords'])) {
				$keywords = array_map('trim', explode(',', strtolower($category['keywords'])));
				foreach($keywords as $keyword) {
					if(!empty($keyword) && strpos(strtolower($combined), $keyword) !== false) {
						$matched = $category;
						break;
					}
				}
			}
			if($matched !== null) break;
		}

		// Fall back to label matching (original algorithm)
		if($matched === null) {
			foreach($this->categories as $category) {
				foreach($splitted as $word) {
					if(strlen($word) > 3) {
						$wordLen = strlen($word);
						$searchLen = (int)round((float)$wordLen * 0.8);
						$search = substr($word, 0, $searchLen);
						if(stripos($category['label'], $search) !== false) {
							$matched = $category;
							break;
						}
					}
				}
				if($matched !== null) break;
			}
		}

		return $matched !== null ? $matched['id'] : null;
	}
	/**
	 * @return (mixed|scalar)[]
	 *
	 * @psalm-return array{label: mixed, date: mixed, _date: string, amount: float|int<0, max>, _amount: string, type: 0|1, source: 1, notes: mixed, _invalid: bool, _duplicate: mixed,...}
	 */
	public function map($headers, $post): array {
		$data = [];
		$data["label"]=$this->getData('label', $headers, $post);
		$data["date"]=$this->convertDate($this->getData('date', $headers, $post));
		$data["_date"]=@date("d.m.Y",($data['date']));
		$data["amount"]=$this->convertCurrencyValue($this->getData('amount', $headers, $post));
		$data["_amount"] = number_format($data['amount'], 2, ',', '.').' '.$this->currency;
		$data["type"]=@$data["amount"] >= 0 ? 0 : 1;
		$data["amount"] = abs($data["amount"]);
		$data["source"]=1; // equals imported
		$data["notes"]=$this->getData('notes', $headers, $post);
		$data["_invalid"]=!$data["date"] || count($post) != count($headers);
		$data["_duplicate"]=$this->db->hasBooking($data);

		// Auto-detect category if enabled
		if(!empty($this->categories)) {
			$categoryId = $this->guessCategory($data["label"], $data["notes"]);
			if($categoryId) {
				$data["category"] = $categoryId;
			}
		}

		return $data;
	}
	/**
	 * @return (mixed|null|string)[][]
	 *
	 * @psalm-return array{headers: list{0?: null|string, ...<string>}, bookings: list<array{label: mixed, date: mixed, _date: string, amount: float|int<0, max>, _amount: string, type: 0|1, source: 1, notes: mixed, _invalid: bool, _duplicate: mixed, ...}>}
	 */
	public function parse($csv, $import = false): array{
		$rows=str_getcsv($csv,"\n");
		$result=["headers" =>
			isset($rows[0]) ? str_getcsv($rows[0],$this->config->seperator) : [],
			"bookings" => []
		];
		$i = 0;
		foreach($rows as $row){
			if($i++ == 0) {
				continue;
			}
			if ($row === null) {
				continue;
			}
			$booking = $this->map($result["headers"], str_getcsv($row,$this->config->seperator));
			if($import && !$booking['_invalid'] && !$booking['_duplicate']) {
				$this->db->setBooking($booking);
			}
			$result["bookings"][]=$booking;
		}
		return $result;
	}
}
?>
