<?php

class DB{
	public static $FILE="../storage.sqlite";
	public static $DOCUMENTS="../documents/";
	public function __construct(){
		@mkdir(self::$DOCUMENTS);
		$this->db = new PDO('sqlite:'.self::$FILE);
		$this->db->exec("CREATE TABLE IF NOT EXISTS BOOKING (id INTEGER PRIMARY KEY AUTOINCREMENT,account INT, label TEXT, date NUMERIC,amount INT,type INT,notes TEXT)");   
		$this->db->exec("CREATE TABLE IF NOT EXISTS ACCOUNT (id INTEGER PRIMARY KEY AUTOINCREMENT,label TEXT,comment TEXT)");   
		$this->db->exec("CREATE TABLE IF NOT EXISTS DOCUMENT (id INTEGER PRIMARY KEY AUTOINCREMENT,booking INTEGER,filename TEXT)");   
		$this->db->exec("CREATE TABLE IF NOT EXISTS CATEGORY (id INTEGER PRIMARY KEY AUTOINCREMENT,label TEXT UNIQUE)");   
		$this->db->exec("CREATE TABLE IF NOT EXISTS BOOKING_CATEGORY (booking INTEGER,category INTEGER)");   
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
	public function export(){
		@mkdir("../exports");
		$zip = new ZipArchive();
		$path='../exports/'.date('Y-m-d').'.zip';
		$zip->open($path, ZipArchive::CREATE | ZipArchive::OVERWRITE);		
		$zip->addFile(self::$FILE,'storage.sqlite');
		foreach(@scandir(self::$DOCUMENTS) as $file){
			if($file=="." || $file=="..")
				continue;
			$zip->addFile(self::$DOCUMENTS.$file,"documents/".$file);
		}
		foreach($this->getAccounts() as $account){
			$csv=$this->getCSV($account['id']);
			if($csv){
				$zip->addFromString($account['label'].".csv",$csv);
			}
		}
		$zip->close();
		return $path;
	}
	public function getCSV($account){
		$bookings=$this->getBookingsForAccount(false,$account);
		if(count($bookings)==0)
			return null;
		
		$csv="Datum;Laufende Nr.;Vorgang;Betrag;Saldo";
		foreach($bookings as $booking){
			$date=date("Y-m-d",$booking['date']);
			$number=$booking['number'];
			$label=$booking['label'];
			$amount=number_format($booking['amount']/100,2,",",".");
			$saldo=number_format($booking['saldo']/100,2,",",".");
			$csv.="\n$date;$number;$label;$amount;$saldo";
		}
		return $csv;
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
	public function getTopBookingsCategories(){
		$result=[];
		for($type=0;$type<2;$type++){
			$stmt = $this->db->prepare('SELECT CATEGORY.label,SUM(amount) as amount FROM CATEGORY LEFT JOIN BOOKING_CATEGORY ON (category=CATEGORY.id) LEFT JOIN BOOKING ON (booking=booking.id) WHERE
					strftime("%Y",datetime(date,"unixepoch")) = :year
					AND type = :type
					GROUP BY category
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
				$result[$month][$r["type"]]=$r["value"];
			}
			if(!@$result[$month][0]) $result[$month][0]=0;
			if(!@$result[$month][1]) $result[$month][1]=0;
		}
		return $result;
	}
	public function deleteCategory($id){
		$stmt = $this->db->prepare('DELETE FROM CATEGORY WHERE id = :id');
		$stmt->execute([":id"=>$id]);
		$stmt = $this->db->prepare('DELETE FROM BOOKING_CATEGORY WHERE category = :id');
		$stmt->execute([":id"=>$id]);		
	}
	public function deleteBooking($id){
		$stmt = $this->db->prepare('DELETE FROM BOOKING WHERE id = :id');
		$stmt->execute([":id"=>$id]);
		$stmt = $this->db->prepare('DELETE FROM BOOKING_CATEGORY WHERE booking = :id');
		$stmt->execute([":id"=>$id]);		
	}
	public function deleteDocument($id){
		$stmt = $this->db->prepare('DELETE FROM DOCUMENT WHERE id = :id');
		$stmt->execute([":id"=>$id]);
		unlink(self::$DOCUMENTS.$id*1);
	}
	public function setBooking($post,$id=null){
		if($id!=null){
			$this->deleteBooking($id);
		}
		$data["id"]=$id;
		$data["label"]=$post["label"];
		$data["date"]=strtotime($post["date"]);
		$data["amount"]=$post["amount"]*100;		
		$data["type"]=$post["type"];
		$data["notes"]=$post["notes"];
		$data["account"]=$_SESSION["account"];
		$categories=$post["categories"];
		
		$stmt = $this->db->prepare('INSERT INTO BOOKING VALUES (:id,:account,:label,:date,:amount,:type,:notes)');
		$stmt->execute($data);
		if(!$id)
			$id=$this->db->lastInsertId();
		$stmt = $this->db->prepare('DELETE FROM BOOKING_CATEGORY WHERE booking = :booking');
		$stmt->execute([':booking'=>$id]);
		foreach($categories as $cat){
			$stmt = $this->db->prepare('INSERT INTO BOOKING_CATEGORY VALUES (:booking,:category)');
			$stmt->execute([':booking'=>$id,':category'=>$cat]);
		}
		return $id;
	}
	public function addCategory($label){
		$data=[];
		$data["label"]=$label;
		$stmt = $this->db->prepare('INSERT INTO CATEGORY VALUES (NULL,:label)');
		$stmt->execute($data);
		return $this->db->lastInsertId();
	}
	public function getBooking($id){
		$stmt = $this->db->prepare('SELECT * FROM BOOKING WHERE id = :id');
		$stmt->execute([':id'=>$id]);
		$booking=$stmt->fetchAll()[0];
		$booking["date"]=explode("T",date("c",$booking["date"]))[0];
		$booking["amount"]/=100;
		$booking["documents"]=$this->getDocuments($id);
		$booking["categories"]=$this->getCategories($id);
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
		copy($file->file,self::$DOCUMENTS.$id);
	}
	public function getDocuments($booking){
		$stmt = $this->db->prepare('SELECT * FROM DOCUMENT WHERE booking = :booking');
		$stmt->execute([":booking"=>$booking]);
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	public function getCategories($booking=null){
		$stmt = $this->db->prepare('SELECT id,label,(category>0) as active FROM CATEGORY LEFT JOIN BOOKING_CATEGORY ON (booking = :booking AND category=id) ORDER BY upper(label)');
		$stmt->execute([":booking"=>$booking]);
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	public function getAllCategories(){
		$stmt = $this->db->prepare('SELECT id,label,COUNT(booking) as count FROM CATEGORY LEFT JOIN BOOKING_CATEGORY ON (category=id) GROUP BY id ORDER BY upper(label)');
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	public function getCategory($id){
		$stmt = $this->db->prepare('SELECT id,label,COUNT(booking) as count FROM CATEGORY LEFT JOIN BOOKING_CATEGORY ON (category=id) WHERE id = :id GROUP BY id ORDER BY upper(label)');
		$stmt->execute([":id"=>$id]);
		return $stmt->fetchAll(PDO::FETCH_ASSOC)[0];
	}
	public function getBookings($filter=true){
		return $this->getBookingsForAccount($filter,$_SESSION["account"]);
	}
	public function getBookingsForAccount($filter=true,$account){
		$number=0;
		$saldo=0;
		$stmt = $this->db->prepare('SELECT * FROM BOOKING WHERE account = :account ORDER BY date');
		$stmt->execute([":account"=>$account]);
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
				if(date("Y",$d["date"])!=@$_SESSION["filter"]["year"])
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