<?php

class DB{
	public static $FILE="../storage.sqlite";
	public static $DOCUMENTS="../documents/";
	public function __construct(){
		@mkdir(self::$DOCUMENTS);
		$db_already_existed = file_exists(self::$FILE);
		$this->db = new PDO('sqlite:'.self::$FILE);
		$this->db->exec("CREATE TABLE IF NOT EXISTS BOOKING (id INTEGER PRIMARY KEY AUTOINCREMENT,account INT, label TEXT, date NUMERIC,amount INT,type INT,notes TEXT)");
		$this->db->exec("CREATE TABLE IF NOT EXISTS ACCOUNT (id INTEGER PRIMARY KEY AUTOINCREMENT,label TEXT,comment TEXT)");
		$this->db->exec("CREATE TABLE IF NOT EXISTS DOCUMENT (id INTEGER PRIMARY KEY AUTOINCREMENT,booking INTEGER,filename TEXT)");
		$this->db->exec("CREATE TABLE IF NOT EXISTS CATEGORY (id INTEGER PRIMARY KEY AUTOINCREMENT,label TEXT UNIQUE)");
		$this->db->exec("CREATE TABLE IF NOT EXISTS BOOKING_CATEGORY (booking INTEGER,category INTEGER)");
		$this->db->exec("CREATE TABLE IF NOT EXISTS SETTINGS (name TEXT PRIMARY KEY,value TEXT)");

		// update tables
		$this->db->exec("ALTER TABLE CATEGORY ADD COLUMN amount NUMERIC default NULL");

		if (!$db_already_existed) {
			$this->db->exec("INSERT INTO ACCOUNT VALUES (1,'Kasse',NULL)");
			$this->db->exec("INSERT INTO ACCOUNT VALUES (2,'Bank',NULL)");
			$this->db->exec("INSERT INTO ACCOUNT VALUES (3,'Konto 1',NULL)");
			$this->db->exec("INSERT INTO ACCOUNT VALUES (4,'Konto 2',NULL)");
			$this->db->exec("INSERT INTO ACCOUNT VALUES (5,'Konto 3',NULL)");
			$this->db->exec("INSERT INTO ACCOUNT VALUES (6,'Konto 4',NULL)");
			$this->db->exec("INSERT INTO ACCOUNT VALUES (7,'Konto 5',NULL)");
		}

		if(!isset($_SESSION["filter"])){
			$_SESSION["filter"]["month"]=0;
			$_SESSION["filter"]["year"]=date("Y");
		}
		/*
		$this->db->beginTransaction();
		for($i=0;$i<10000;$i++){
			$this->db->exec("INSERT INTO BOOKING VALUES (NULL,1,'Test $i',".(time()+rand(-100000000,100000000)).",".(rand(10,10000)).",".(rand(0,1)).",'')");
		}
		$this->db->commit();
		*/
	}
	public function getSettings(){
	    $stmt = $this->db->prepare('SELECT * FROM SETTINGS');
	    $stmt->execute();	 
	    $result=$stmt->fetchAll();
	    $settings=[];
	    foreach($result as $r){
	        $settings[$r['name']]=$r['value'];
	    }
	    if(!isset($settings['currency'])) $settings['currency']="€";
	    return $settings;
	}
	public function updateSettings($settings){
	    foreach($settings as $name=>$value){
            $stmt = $this->db->prepare('INSERT OR REPLACE INTO SETTINGS VALUES (:name,:value)');
            $stmt->execute([':name'=>$name,':value'=>$value]);
	    }
	}
	public function export(){
		@mkdir("../exports");
		$zip = new ZipArchive();
		$path='../exports/'.date('Y-m-d').'.zip';
		$zip->open($path, ZipArchive::CREATE | ZipArchive::OVERWRITE);		
		foreach($this->getAccounts() as $account){
			$csv=$this->getCSV($account['id'], true);
			if($csv){
				$zip->addFromString($account['label'].".csv",$csv);
			}
			
			$bookings=$this->getBookingsForAccount(true, $account['id']);
			foreach($bookings as $b) {
				$docs = $this->getDocuments($b['id']);
				foreach($docs as $doc) {
					$zip->addFile(self::$DOCUMENTS.$doc['id'],"documents/".$doc['filename']);
				}
			}
			
		}
		$zip->close();
		return $path;
	}
	public function backup(){
		@mkdir("../backups");
		$zip = new ZipArchive();
		$path='../backups/'.date('Y-m-d').'.zip';
		$zip->open($path, ZipArchive::CREATE | ZipArchive::OVERWRITE);		
		$zip->addFile(self::$FILE,'storage.sqlite');
		foreach(@scandir(self::$DOCUMENTS) as $file){
			if($file=="." || $file=="..")
				continue;
			$zip->addFile(self::$DOCUMENTS.$file,"documents/".$file);
		}
		foreach($this->getAccounts() as $account){
			$csv=$this->getCSV($account['id'], false);
			if($csv){
				$zip->addFromString($account['label'].".csv",$csv);
			}
		}
		$zip->close();
		return $path;
	}
	public function getCSV($account, $filter = false){
		$bookings=$this->getBookingsForAccount($filter,$account);
		if(count($bookings)==0)
			return null;
		
		$csv="Datum;Laufende Nr.;Vorgang;Betrag;Saldo;Belege";
		foreach($bookings as $booking){
			$date=date("Y-m-d",$booking['date']);
			$number=$booking['number'];
			$label=$booking['label'];
			$amount=number_format($booking['amount']/100,2,",",".");
			$saldo=number_format($booking['saldo']/100,2,",",".");
			$docs = $this->getDocuments($booking['id']);
			$documents = '';
			foreach($docs as $doc) {
				$documents .= $doc['filename'] . "\n";
			}
			$documents = trim($documents);
			$csv.="\n$date;$number;$label;$amount;$saldo;\"$documents\"";
		}
		return $csv;
	}
	public function getYearStats($account=null,$yearsBack=10,$targetYear=NULL){
	    if(!$targetYear) $targetYear=date("Y");
	    $year=$targetYear-$yearsBack;
		$result=[];
		for(;$year<=$targetYear;$year++){
			//$stmt = $this->db->prepare('SELECT strftime("%Y",datetime(date,"unixepoch")) FROM BOOKING');
			//$stmt->execute();
			//print_r($stmt->fetchAll());
			$stmt=null;
			if($account){
				$stmt = $this->db->prepare('SELECT type,SUM(amount) as value FROM BOOKING WHERE strftime("%Y",datetime(date,"unixepoch")) = :year AND account = :account GROUP BY type');
				$stmt->execute([":year"=>$year,":account"=>$account]);
			}
			else{
				$stmt = $this->db->prepare('SELECT type,SUM(amount) as value FROM BOOKING WHERE strftime("%Y",datetime(date,"unixepoch")) = :year GROUP BY type');
				$stmt->execute([":year"=>$year]);
			}
			$content=false;
			foreach($stmt->fetchAll() as $r){
				$result[$year][$r["type"]]=$r["value"];
				$stmt=null;
				if($account){
				    $stmt = $this->db->prepare('SELECT SUM(case when type = 0 then amount else -amount end) as value FROM BOOKING WHERE strftime("%Y",datetime(date,"unixepoch")) < :year AND account = :account');
				    $stmt->execute([":year"=>$year,":account"=>$account]);
				}
				else{
				    $stmt = $this->db->prepare('SELECT SUM(case when type = 0 then amount else -amount end) as value FROM BOOKING WHERE strftime("%Y",datetime(date,"unixepoch")) < :year');
				    $stmt->execute([":year"=>$year]);
				}
				$result[$year]["saldo"]=$stmt->fetchAll()[0]["value"];
				$content=true;
			}
			if($content){
				if(!@$result[$year][0]) $result[$year][0]=0;
				if(!@$result[$year][1]) $result[$year][1]=0;
			}
		}
		if($yearsBack==0)
		    return @$result[$year-1];
		return $result;
	}
	public function getTopBookingsYear(){
		$result=[];
		for($type=0;$type<2;$type++){
			$stmt = $this->db->prepare('SELECT label,amount as amount FROM BOOKING WHERE
				strftime("%Y",datetime(date,"unixepoch")) = :year
				AND type = :type
				ORDER BY amount DESC LIMIT 5');
			$stmt->execute([":year"=>$_SESSION["filter"]["year"],":type"=>$type]);
			$result[$type]=$stmt->fetchAll();
		}
		return $result;
	}
	public function getTopBookingsCategories(){
		$result=[];
		for($type=0;$type<2;$type++){
			$stmt = $this->db->prepare('SELECT c.label,SUM(b.amount) as amount FROM CATEGORY c LEFT JOIN BOOKING_CATEGORY ON (category=c.id) LEFT JOIN BOOKING b ON (booking=b.id) WHERE
					strftime("%Y",datetime(date,"unixepoch")) = :year
					AND type = :type
					GROUP BY category
					ORDER BY amount DESC');
			$stmt->execute([":year"=>$_SESSION["filter"]["year"],":type"=>$type]);
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
			$stmt->execute([":year"=>$_SESSION["filter"]["year"],":month"=>$month<10 ? "0".$month : $month]);
			$result[$month]=["label"=>$labels[$month]];
			foreach($stmt->fetchAll() as $r){
				$result[$month][$r["type"]]=$r["value"];
			}
			if(!@$result[$month][0]) $result[$month][0]=0;
			if(!@$result[$month][1]) $result[$month][1]=0;
		}
		return $result;
	}
	public function editCategory($id,$label,$amount){
		$stmt = $this->db->prepare('UPDATE CATEGORY SET label = :label, amount = :amount WHERE id = :id');
		$stmt->execute([":id"=>$id,":label"=>$label, ":amount"=>$amount*100]);
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
		$category=$post["category"];
		
		$stmt = $this->db->prepare('INSERT INTO BOOKING VALUES (:id,:account,:label,:date,:amount,:type,:notes)');
		$stmt->execute($data);
		if(!$id)
			$id=$this->db->lastInsertId();
		$stmt = $this->db->prepare('DELETE FROM BOOKING_CATEGORY WHERE booking = :booking');
		$stmt->execute([':booking'=>$id]);
		
		if($category){
			$stmt = $this->db->prepare('INSERT INTO BOOKING_CATEGORY VALUES (:booking,:category)');
			$stmt->execute([':booking'=>$id,':category'=>$category]);
		}
		/*foreach($categories as $cat){
			$stmt = $this->db->prepare('INSERT INTO BOOKING_CATEGORY VALUES (:booking,:category)');
			$stmt->execute([':booking'=>$id,':category'=>$cat]);
		}*/
		return $id;
	}
	public function addCategory($label){
		$data=[];
		$data["label"]=$label;
		$stmt = $this->db->prepare('INSERT INTO CATEGORY (id,label) VALUES (NULL,:label)');
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
	public function getDocument($id){
		$stmt = $this->db->prepare('SELECT * FROM DOCUMENT WHERE id = :id');
		$stmt->execute([":id"=>$id]);
		return $stmt->fetchAll(PDO::FETCH_ASSOC)[0];
	}
	public function getDocuments($booking){
		$stmt = $this->db->prepare('SELECT * FROM DOCUMENT WHERE booking = :booking');
		$stmt->execute([":booking"=>$booking]);
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	public function getCategories($booking=null){
		$stmt = $this->db->prepare('SELECT id,label,amount,(category>0) as active FROM CATEGORY LEFT JOIN BOOKING_CATEGORY ON (booking = :booking AND category=id) ORDER BY upper(label)');
		$stmt->execute([":booking"=>$booking]);

		$categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
		for($i=0;$i<count($categories);$i++){
			$categories[$i]["amount"] /= 100;
		}
		return $categories;
	}
	public function getAllCategories(){
		$stmt = $this->db->prepare('SELECT c.id,c.label,c.amount as amount,COUNT(booking) as count FROM CATEGORY c LEFT JOIN BOOKING_CATEGORY ON (category=id) GROUP BY id ORDER BY upper(label)');
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	public function getCategory($id){
		$stmt = $this->db->prepare('SELECT id,label,amount,COUNT(booking) as count FROM CATEGORY LEFT JOIN BOOKING_CATEGORY ON (category=id) WHERE id = :id GROUP BY id ORDER BY upper(label)');
		$stmt->execute([":id"=>$id]);
		$category=$stmt->fetchAll()[0];
		$category["amount"] /= 100;
		return $category;
	}
	public function getBookings($filter=true){
		return $this->getBookingsForAccount($filter,$_SESSION["account"]);
	}
	public function getBookingsForAccount($filter=true,$account){
		$number=0;
		$saldo=0;
		$stmt = $this->db->prepare('SELECT B.*, (SELECT label FROM CATEGORY C WHERE C.id=(SELECT category FROM BOOKING_CATEGORY BC WHERE BC.booking=B.id)) as category, (SELECT COUNT(*) FROM DOCUMENT D WHERE B.id = D.booking) AS documents FROM BOOKING B WHERE account = :account ORDER BY date');
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
			if(date("Y",$d["date"])!=@$oldDate){
				$number=1;
			}
			$oldDate=date("Y",$d["date"]);
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
