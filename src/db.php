<?php

class DB{
	public function __construct(){
		$this->db = new PDO('sqlite:../storage.sqlite');
		$this->db->exec("CREATE TABLE IF NOT EXISTS BOOKING (id INTEGER PRIMARY KEY AUTOINCREMENT,account INT, label TEXT, date NUMERIC,amount INT,type INT,notes TEXT)");   
		$this->db->exec("CREATE TABLE IF NOT EXISTS ACCOUNT (id INTEGER PRIMARY KEY AUTOINCREMENT,label TEXT,comment TEXT)");   
		$this->db->exec("CREATE TABLE IF NOT EXISTS DOCUMENT (id INTEGER PRIMARY KEY AUTOINCREMENT,booking INT,filename TEXT)");   
		$this->db->exec("INSERT INTO ACCOUNT VALUES (1,'Kasse',NULL)");   
		$this->db->exec("INSERT INTO ACCOUNT VALUES (2,'Bank',NULL)");   
		$this->db->exec("INSERT INTO ACCOUNT VALUES (3,'Konto 1',NULL)");   
		$this->db->exec("INSERT INTO ACCOUNT VALUES (4,'Konto 2',NULL)");   
		$this->db->exec("INSERT INTO ACCOUNT VALUES (5,'Konto 3',NULL)");  
		$this->db->exec("INSERT INTO ACCOUNT VALUES (6,'Konto 4',NULL)");   
		$this->db->exec("INSERT INTO ACCOUNT VALUES (7,'Konto 5',NULL)");   
		/*
		$this->db->beginTransaction();
		for($i=0;$i<10000;$i++){
			$this->db->exec("INSERT INTO BOOKING VALUES (NULL,1,'Test $i',".(time()+rand(-100000000,100000000)).",".(rand(10,10000)).",".(rand(0,1)).",'')");   
		}
		$this->db->commit();
		*/
	}
	public function getYearStats(){
		$year=date("Y")-10;
		$result=[];
		for(;$year<=date("Y");$year++){
			//$stmt = $this->db->prepare('SELECT strftime("%Y",datetime(date,"unixepoch")) FROM BOOKING');
			//$stmt->execute();
			//print_r($stmt->fetchAll());
			$stmt = $this->db->prepare('SELECT type,SUM(amount) as value FROM BOOKING WHERE strftime("%Y",datetime(date,"unixepoch")) = :year GROUP BY type');
			$stmt->execute([":year"=>$year]);
			$content=false;
			foreach($stmt->fetchAll() as $r){
				$result[$year][$r["type"]]=$r["value"];
				$content=true;
			}
			if($content){
				if(!$result[$year][0]) $result[$year][0]=0;
				if(!$result[$year][1]) $result[$year][1]=0;
			}
		}
		return $result;
	}
	public function getTopBookingsYear(){
		$result=[];
		for($type=0;$type<2;$type++){
			$stmt = $this->db->prepare('SELECT label,amount as amount FROM BOOKING WHERE 
				strftime("%Y",datetime(date,"unixepoch")) = :year
				AND type = :type
				ORDER BY amount DESC LIMIT 5');
			$stmt->execute([":year"=>date("Y"),":type"=>$type]);
			$result[$type]=$stmt->fetchAll();
		}
		return $result;
	}
	public function getMonthStats(){
		$labels[1]="Jan";
		$labels[2]="Feb";
		$labels[3]="März";
		$labels[4]="April";
		$labels[5]="Mai";
		$labels[6]="Jun";
		$labels[7]="Jul";
		$labels[8]="Aug";
		$labels[9]="Sep";
		$labels[10]="Okt";
		$labels[11]="Nov";
		$labels[12]="Dez";
		for($month=1;$month<=12;$month++){
			$stmt = $this->db->prepare('SELECT type,SUM(amount) as value FROM BOOKING WHERE 
			strftime("%Y",datetime(date,"unixepoch")) = :year AND 
			strftime("%m",datetime(date,"unixepoch")) = :month
			GROUP BY type');
			$stmt->execute([":year"=>date("Y"),":month"=>$month<10 ? "0".$month : $month]);
			$result[$month]=["label"=>$labels[$month]];
			foreach($stmt->fetchAll() as $r){
				$result[$month][$r["type"]]=$r["value"]/100;
			}
			if(!@$result[$month][0]) $result[$month][0]=0;
			if(!@$result[$month][1]) $result[$month][1]=0;
		}
		return $result;
	}
	public function deleteBooking($id){
		$stmt = $this->db->prepare('DELETE FROM BOOKING WHERE id = :id');
		$stmt->execute([":id"=>$id]);
	}
	public function deleteDocument($id){
		$stmt = $this->db->prepare('DELETE FROM DOCUMENT WHERE id = :id');
		$stmt->execute([":id"=>$id]);
		unlink("../documents/".$id*1);
	}
	public function setBooking($data,$id=null){
		print_r($data);
		$data["date"]=strtotime($data["date"]);
		$data["amount"]*=100;		
		if($id!=null){
			$this->deleteBooking($id);
		}
		$data["id"]=$id;
		$data["account"]=$_SESSION["account"];
		$stmt = $this->db->prepare('INSERT INTO BOOKING VALUES (:id,:account,:label,:date,:amount,:type,:notes)');
		$stmt->execute($data);
		if($id)
			return $id;
		return $this->db->lastInsertId();
	}
	public function getBooking($id){
		$stmt = $this->db->prepare('SELECT * FROM BOOKING WHERE id = :id');
		$stmt->execute([':id'=>$id]);
		$booking=$stmt->fetchAll()[0];
		$booking["date"]=explode("T",date("c",$booking["date"]))[0];
		$booking["amount"]/=100;
		$booking["documents"]=$this->getDocuments($id);
		return $booking;
	}
	public function getAccount(){
		$stmt = $this->db->prepare('SELECT * FROM ACCOUNT WHERE id = :id');
		$stmt->execute([":id"=>$_SESSION["account"]]);
		return $stmt->fetchAll(PDO::FETCH_ASSOC)[0];
	}
	public function getAccounts(){
		$stmt = $this->db->prepare('SELECT * FROM ACCOUNT ORDER BY id');
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	public function addDocument($booking,$file){
		$stmt = $this->db->prepare('INSERT INTO DOCUMENT VALUES (NULL,:booking,:name)');
		$stmt->execute([":booking"=>$booking,":name"=>$file->getClientFilename()]);
		$id=$this->db->lastInsertId();
		copy($file->file,"../documents/".$id);
	}
	public function getDocuments($booking){
		$stmt = $this->db->prepare('SELECT * FROM DOCUMENT WHERE booking = :booking');
		$stmt->execute([":booking"=>$booking]);
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	public function getBookings($filter=true){
		$number=0;
		$saldo=0;
		$stmt = $this->db->prepare('SELECT * FROM BOOKING WHERE account = :account ORDER BY date');
		$stmt->execute([":account"=>$_SESSION["account"]]);
		$data=$stmt->fetchAll(PDO::FETCH_ASSOC);
		$i=0;
		$result=[];
		foreach($data as $d){
			if($d["type"]==0)
				$saldo+=$d["amount"];
			else
				$saldo-=$d["amount"];
			$number++;
			if($filter){
				if(date("Y",$d["date"])!=$_SESSION["filter"]["year"])
					continue;
				if($_SESSION["filter"]["month"]!=0 && date("m",$d["date"])!=$_SESSION["filter"]["month"])
					continue;
			}
			$result[$i]=$d;
			$result[$i]["number"]=$number;			
			$result[$i]["saldo"]=$saldo;
			$i++;
		}
		return $result;
	}
}
?>