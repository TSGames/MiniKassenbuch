<?php

class CSV{
	
	public function __construct($config){
		$this->config=$config;
	}
	public function parse($csv){
		$rows=str_getcsv($csv,"\n");
		$result=[];
		foreach($rows as $row){
			$result[]=str_getcsv($row,$this->config["seperator"]);
		}
		return $result;
	}
}
?>
