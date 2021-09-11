<?php

class CSV{
	
	public function __construct($config){
		$this->config=$config;
	}
	private function getData($key, $headers, $post) {
		$idx = array_search(@$this->config->mappings->{$key}, $headers);
		if($idx === false) {
			return null;
		}
		return @$post[$idx];
	}
	public function map($headers, $post) {
		$data["label"]=$this->getData('label', $headers, $post);
		$data["date"]=@strtotime($this->getData('date', $headers, $post));
		$data["_date"]=date("d.m.Y",$data['date']);
		$data["amount"]=$this->getData('amount', $headers, $post);
		$data["type"]=@$data["amount"] >= 0 ? 0 : 1;
		$data["notes"]=$this->getData('notes', $headers, $post);
		$data["_invalid"]=!$data["date"] || count($post) != count($headers);
		$category=@$this->config->category;
		return $data;
	}
	public function parse($csv){
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
			$result["bookings"][]=$booking;
		}
		return $result;
	}
}
?>
