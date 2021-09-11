<?php

class CSV{
	
	public function __construct($config){
		$this->config=$config;
		$this->db=new DB();
		$this->currency = $this->db->getSettings()['currency'];
	}
	private function getData($key, $headers, $post) {
		$idx = array_search(@$this->config->mappings->{$key}, $headers);
		if($idx === false) {
			return null;
		}
		return @$post[$idx];
	}
	private function convertCurrencyValue($numeric) {
		if(strpos($numeric, '.') === false && strpos($numeric, ',') === false) {
			return intval($numeric) / 100;
		}
		return doubleval(str_replace(',', '.', $numeric));
	}
	private function convertDate($date) {
		$formats = [
			"d.m.y",
			"d.m.Y",
			"Y-m-d"
		];
		foreach($formats as $format) {
			$parsed = DateTime::createFromFormat("d.m.y", $date);
			if($parsed) {
				return $parsed->getTimestamp();
			}
		}
		return null;
	
	}
	public function map($headers, $post) {
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
		$category=@$this->config->category;
		return $data;
	}
	public function parse($csv, $import = false){
		$rows=str_getcsv($csv,"\n");
		$result=["headers" => 
			str_getcsv($rows[0],$this->config->seperator),
			"bookings" => []
		];
		$i = 0;
		foreach($rows as $row){
			if($i++ == 0) {
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
