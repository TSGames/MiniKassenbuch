<?php

class DB{
	public static $FILE=__DIR__."/../data/storage.sqlite";
	public static $DOCUMENTS=__DIR__."/../data/documents/";
	private \PDO $db;

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
		try {
			$this->db->exec("ALTER TABLE CATEGORY ADD COLUMN amount NUMERIC default NULL");
		} catch(Exception $ignored) {}
		try {
			$this->db->exec("ALTER TABLE BOOKING ADD COLUMN source NUMERIC default 0");
		} catch(Exception $ignored) {}
		try {
			$this->db->exec("ALTER TABLE CATEGORY ADD COLUMN keywords TEXT default NULL");
		} catch(Exception $ignored) {}
		try {
			$this->db->exec("ALTER TABLE BOOKING ADD COLUMN color TEXT default NULL");
		} catch(Exception $ignored) {}

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
		
		$this->db->beginTransaction();
		/*
		for($i=0;$i<20000;$i++){
			$this->db->exec("INSERT INTO BOOKING VALUES (NULL,1,'Test $i',".(time()+rand(-100000000,100000000)).",".(rand(10,10000)).",".(rand(0,1)).",'',0)");
		}
		*/
		$this->db->commit();
		
	}
	/**
	 * @return (mixed|string)[]
	 *
	 * @psalm-return array{currency: '€'|mixed,...}
	 */
	public function getSettings(): array{
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
	/**
	 * @return (false|int|mixed)[]
	 *
	 * @psalm-return array{bookings: mixed, documents: mixed, documentsSize: int<min, max>, databaseSize: false|int}
	 */
	public function getStats(): array{
	    $stmt = $this->db->prepare('SELECT COUNT(*) FROM BOOKING');
		$stmt->execute();
		$bookings=$stmt->fetchAll()[0][0];
		$stmt = $this->db->prepare('SELECT COUNT(*) FROM DOCUMENT');
		$stmt->execute();
		$documents=$stmt->fetchAll()[0][0];
		$documentsSize = 0;
		$docs = @scandir(DB::$DOCUMENTS);
		if ($docs !== false) {
			foreach($docs as $doc){
				if($doc == '.' ||$doc === '..') {
					continue;
				}
				$size = filesize(DB::$DOCUMENTS . DIRECTORY_SEPARATOR . $doc);
				if ($size !== false) {
					$documentsSize += $size;
				}
			}
		}
	    return [
			'bookings' => $bookings,
			'documents' => $documents,
			'documentsSize' => $documentsSize,
			'databaseSize' => filesize(DB::$FILE)
		];
	    
	}
	public function updateSettings($settings): void{
	    foreach($settings as $name=>$value){
            $stmt = $this->db->prepare('INSERT OR REPLACE INTO SETTINGS VALUES (:name,:value)');
			if($name == 'readOnlyPassword') {
				if(!$value) {
					continue;
				}
				$value = password_hash($value, PASSWORD_BCRYPT);
			}
            $stmt->execute([':name'=>$name,':value'=>$value]);
	    }
	}
	public function export(): string{
		@mkdir("../exports");
		$zip = new ZipArchive();
		$path='../exports/'.date('Y-m-d').'.zip';
		$zip->open($path, ZipArchive::CREATE | ZipArchive::OVERWRITE);
		foreach($this->getAccounts() as $account){
			$csv=$this->getCSV($account['id'], true);
			if($csv) {
				$zip->addFromString($account['label'].".csv",$csv);
			}
			$xlsx=$this->getXLSX($account['id'], true);
			if($xlsx) {
				$zip->addFromString($account['label'].".xlsx",$xlsx);
			}
			$pdf=$this->getPDF($account['id'], true, $account['label']);
			if($pdf) {
				$zip->addFromString($account['label'].".pdf",$pdf);
			}
			$bookings=$this->getBookingsForAccount(true, $account['id']);
			foreach($bookings as $b) {
				$docs = $this->getDocuments($b['id']);
				foreach($docs as $doc) {
					$zip->addFile(self::$DOCUMENTS.$doc['id'],"documents/".$b['number'] . ' - ' . $doc['filename']);
				}
			}

		}
		$zip->close();
		return $path;
	}
	public function backup(): string{
		@mkdir("../backups");
		$zip = new ZipArchive();
		$path='../backups/'.date('Y-m-d').'.zip';
		$zip->open($path, ZipArchive::CREATE | ZipArchive::OVERWRITE);		
		$zip->addFile(self::$FILE,'storage.sqlite');
		$files = @scandir(self::$DOCUMENTS);
		if ($files !== false) {
			foreach($files as $file){
				if($file=="." || $file=="..")
					continue;
				$zip->addFile(self::$DOCUMENTS.$file,"documents/".$file);
			}
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
	public function getCSV($account, $filter = false): string|null{
		$bookings=$this->getBookingsForAccount($filter,$account);
		if(count($bookings)==0)
			return null;
		
		$data = [];
		$data[] = ["Datum","Laufende Nr.","Vorgang","Kategorie","Bemerkungen","Betrag","Saldo","Belege"];
		foreach($bookings as $booking){
			$date=date("Y-m-d",$booking['date']);
			$number=$booking['number'];
			$label=$booking['label'];
			$category=$booking['category'];
			$notes=$booking['notes'];
			$amount=number_format($booking['amount']/100 * ($booking["type"]==0 ? 1 : -1),2,",",".");
			$saldo=number_format($booking['saldo']/100,2,",",".");
			$docs = $this->getDocuments($booking['id']);
			$documents = '';
			foreach($docs as $doc) {
				$documents .= $booking['number'] . ' - ' . $doc['filename'] . "\n";
			}
			$documents = trim($documents);
			$data[] = [
				$date,$number,$label,$category,$notes,$amount,$saldo,$documents
			];
		}
		$file = tmpfile();
		if ($file === false) {
			return null;
		}
		foreach ($data as $fields) {
			fputcsv($file, $fields);
		}
		$meta = stream_get_meta_data($file);
		$csv = file_get_contents($meta['uri']);
		if ($csv === false) {
			return null;
		}
		$csv = preg_replace('~\R~u', "\r\n", $csv);
		return $csv;
	}
	public function getXLSX($account, $filter = false): string|null{
		$bookings=$this->getBookingsForAccount($filter,$account);
		if(count($bookings)==0)
			return null;
		
		$spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
		$sheet = $spreadsheet->getActiveSheet();

		$header = ["Datum","Laufende Nr.","Vorgang","Kategorie","Bemerkungen","Betrag","Saldo","Belege"];
		$sheet->fromArray($header, NULL, 'A1');     
		$sheet->getStyle('A:A')->getNumberFormat()->setFormatCode(\PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_DATE_DDMMYYYY);
		$sheet->getStyle('F:G')->getNumberFormat()->setFormatCode("#,##0.00_-" . $this->getSettings()['currency']);
		$sheet->getColumnDimension('A')->setWidth(12);
		$sheet->getColumnDimension('B')->setWidth(12);
		$sheet->getColumnDimension('C')->setWidth(24);
		$sheet->getColumnDimension('D')->setWidth(16);
		$sheet->getColumnDimension('E')->setWidth(32);
		$sheet->getColumnDimension('F')->setWidth(12);
		$sheet->getColumnDimension('G')->setWidth(12);
		$sheet->getColumnDimension('H')->setWidth(20);
		$i = 2;	
		foreach($bookings as $booking){
			$date=date("Y-m-d",$booking['date']);
			$number=$booking['number'];
			$label=$booking['label'];
			$category=$booking['category'];
			$notes=$booking['notes'];
			$amount=$booking['amount'] / 100 * ($booking["type"]==0 ? 1 : -1);
			$saldo=$booking['saldo'] / 100;
			$docs = $this->getDocuments($booking['id']);
			$documents = '';
			foreach($docs as $doc) {
				$documents .= $booking['number'] . ' - ' . $doc['filename'] . "\n";
			}
			$documents = trim($documents);
			$data = [
				\PhpOffice\PhpSpreadsheet\Shared\Date::PHPToExcel($date),
				$number,$label,$category,$notes,$amount,$saldo,$documents
			];
			$sheet->fromArray($data, NULL, 'A' . $i++);     	

		}
		$file = tmpfile();
		if ($file === false) {
			return null;
		}
		$writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, "Xlsx");
		$writer->save($file);
		$meta = stream_get_meta_data($file);
		$contents = file_get_contents($meta['uri']);
		return $contents !== false ? $contents : null;
	}
	public function getPDF($account, $filter = false, $accountLabel = ''): string|null{
		$bookings = $this->getBookingsForAccount($filter, $account);
		if(count($bookings) == 0)
			return null;

		$mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);

		$year = isset($_SESSION["filter"]["year"]) ? $_SESSION["filter"]["year"] : date("Y");
		$month = isset($_SESSION["filter"]["month"]) ? $_SESSION["filter"]["month"] : 0;

		$periodStr = $year;
		if($month != 0) {
			$monthNames = ["", "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
			$periodStr = $monthNames[$month] . " " . $year;
		}

		$html = '<h1>' . htmlspecialchars($accountLabel) . ' - ' . $periodStr . '</h1>';
		$html .= '<table border="1" cellpadding="5" style="width: 100%; font-size: 10pt;">';
		$html .= '<thead><tr style="background-color: #f5f5f5;">';
		$html .= '<th>Datum</th><th>Nr.</th><th>Vorgang</th><th>Kategorie</th><th>Bemerkungen</th><th style="text-align: right;">Betrag</th><th style="text-align: right;">Saldo</th><th>Belege</th>';
		$html .= '</tr></thead><tbody>';

		foreach($bookings as $booking) {
			$date = date("Y-m-d", $booking['date']);
			$number = $booking['number'];
			$label = htmlspecialchars($booking['label']);
			$category = htmlspecialchars($booking['category'] ?? '');
			$notes = htmlspecialchars($booking['notes']);
			$amount = number_format($booking['amount']/100 * ($booking["type"]==0 ? 1 : -1), 2, ",", ".");
			$saldo = number_format($booking['saldo']/100, 2, ",", ".");
			$docs = $this->getDocuments($booking['id']);
			$documentCount = count($docs);

			$html .= '<tr>';
			$html .= '<td>' . $date . '</td>';
			$html .= '<td>' . $number . '</td>';
			$html .= '<td>' . $label . '</td>';
			$html .= '<td>' . $category . '</td>';
			$html .= '<td>' . $notes . '</td>';
			$html .= '<td style="text-align: right;">' . $amount . '</td>';
			$html .= '<td style="text-align: right;">' . $saldo . '</td>';
			$html .= '<td>' . ($documentCount > 0 ? $documentCount . ' Datei(en)' : '') . '</td>';
			$html .= '</tr>';
		}

		$html .= '</tbody></table>';
		$mpdf->WriteHTML($html);

		foreach($bookings as $booking) {
			$docs = $this->getDocuments($booking['id']);
			foreach($docs as $doc) {
				$docPath = self::$DOCUMENTS . $doc['id'];
				$fileExt = strtolower(pathinfo($doc['filename'], PATHINFO_EXTENSION));
				$bookingNum = $booking['number'];
				$docFilename = htmlspecialchars($doc['filename']);

				if(in_array($fileExt, ['jpg', 'jpeg', 'png', 'gif'])) {
					$mpdf->AddPage();
					$mpdf->WriteHTML(
						'<div style="background-color: #f0f0f0; padding: 8px 12px; margin-bottom: 15px; border-left: 4px solid #1976d2; font-size: 11pt;">' .
						'<strong style="color: #1976d2;">📎 Booking #' . $bookingNum . '</strong> - ' . $docFilename .
						'</div>'
					);
					if(file_exists($docPath)) {
						$mpdf->Image($docPath, 10, 50, 190);
					}
				} elseif($fileExt === 'pdf') {
					try {
						$pageCount = $mpdf->setSourceFile($docPath);
						for($i = 1; $i <= $pageCount; $i++) {
							$mpdf->AddPage();
							if($i == 1) {
								$mpdf->WriteHTML(
									'<div style="background-color: #f0f0f0; padding: 8px 12px; margin-bottom: 15px; border-left: 4px solid #1976d2; font-size: 11pt;">' .
									'<strong style="color: #1976d2;">📎 Booking #' . $bookingNum . '</strong> - ' . $docFilename .
									'</div>'
								);
								$mpdf->SetMargins(10, 15, 10);
							}
							$tpl = $mpdf->importPage($i);
							$mpdf->useTemplate($tpl);
						}
					} catch(Exception $e) {
					}
				}
			}
		}

		return $mpdf->Output('', 'S');
	}
	/**
	 * @return (array|mixed)[]
	 *
	 * @psalm-return array<array|mixed>
	 */
	public function getYearStats($account=null,$yearsBack=10,$targetYear=NULL): array{
	    if(!$targetYear) $targetYear=date("Y");
	    $year=$targetYear-$yearsBack;
		$result=[];
		for(;$year<=$targetYear;$year++){
			//$stmt = $this->db->prepare('SELECT strftime("%Y",datetime(date,"unixepoch")) FROM BOOKING');
			//$stmt->execute();
			//print_r($stmt->fetchAll());
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
	/**
	 * @return array[]
	 *
	 * @psalm-return array<int<0, 1>, array>
	 */
	public function getTopBookingsYear(): array{
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
	/**
	 * @return array[]
	 *
	 * @psalm-return array<int<0, 1>, array>
	 */
	public function getTopBookingsCategories(): array{
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
		$labels = [];
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
		$result = [];
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
	public function editCategory($id,$label,$amount): void{
		$stmt = $this->db->prepare('UPDATE CATEGORY SET label = :label, amount = :amount WHERE id = :id');
		$stmt->execute([":id"=>$id,":label"=>$label, ":amount"=>$amount*100]);
	}
	public function deleteCategory($id): void{
		$stmt = $this->db->prepare('DELETE FROM CATEGORY WHERE id = :id');
		$stmt->execute([":id"=>$id]);
		$stmt = $this->db->prepare('DELETE FROM BOOKING_CATEGORY WHERE category = :id');
		$stmt->execute([":id"=>$id]);		
	}
	public function deleteBooking($id): void{
		$stmt = $this->db->prepare('DELETE FROM BOOKING WHERE id = :id');
		$stmt->execute([":id"=>$id]);
		$stmt = $this->db->prepare('DELETE FROM BOOKING_CATEGORY WHERE booking = :id');
		$stmt->execute([":id"=>$id]);		
	}
	public function deleteDocument($id): void{
		$stmt = $this->db->prepare('DELETE FROM DOCUMENT WHERE id = :id');
		$stmt->execute([":id"=>$id]);
		unlink(self::$DOCUMENTS.$id*1);
	}
	public function setBooking($post,$id=null){
		if($id!=null){
			$this->deleteBooking($id);
		}
		$data = [];
		$data["id"]=$id;
		$data["label"]=$post["label"];
		$data["date"]=$post["date"];
		$data["amount"]=$post["amount"]*100;
		$data["type"]=$post["type"];
		$data["notes"]=$post["notes"];
		$data["source"]=$post["source"];
		$data["color"]=@$post["color"] ?: null;
		$data["account"]=$_SESSION["account"];
		$category=@$post["category"];
		$stmt = $this->db->prepare('INSERT INTO BOOKING (id,account,label,date,amount,type,notes,source,color) VALUES (:id,:account,:label,:date,:amount,:type,:notes,:source,:color)');
		$stmt->execute($data);
		if(!$id)
			$id=$this->db->lastInsertId();
		$stmt = $this->db->prepare('DELETE FROM BOOKING_CATEGORY WHERE booking = :booking');
		$stmt->execute([':booking'=>$id]);

		if($category){
			$stmt = $this->db->prepare('INSERT INTO BOOKING_CATEGORY VALUES (:booking,:category)');
			$stmt->execute([':booking'=>$id,':category'=>$category]);
		}
		return $id;
	}
	public function addCategory($label): string{
		$data=[];
		$data["label"]=$label;
		$stmt = $this->db->prepare('INSERT INTO CATEGORY (id,label) VALUES (NULL,:label)');
		$stmt->execute($data);
		return $this->db->lastInsertId();
	}
	public function hasBooking($booking): bool{
		$stmt = $this->db->prepare('SELECT * FROM BOOKING WHERE label = :label AND strftime("%Y%m%d",datetime(date,"unixepoch")) = :date AND amount = :amount AND type = :type');
		$stmt->execute([
			':label'=>$booking['label'],
			':date'=>date('Ymd', $booking['date']),
			':amount'=>$booking['amount'] * 100,
			':type'=>$booking['type'],
		]);
		return count($stmt->fetchAll()) > 0;
	}
	public function getBooking($id){
		$stmt = $this->db->prepare('SELECT *,
		(SELECT id FROM BOOKING WHERE date < b.date AND account=b.account ORDER BY date DESC) as previousId,
		(SELECT id FROM BOOKING WHERE date > b.date AND account=b.account ORDER BY date ASC) as nextId
			 FROM BOOKING b WHERE id = :id');
		$stmt->execute([':id'=>$id]);
		$booking=$stmt->fetchAll()[0];
		if (is_numeric($booking["date"])) {
			$booking["date"] = explode("T", date("c", $booking["date"]))[0];
		} else {
			$booking["date"] = explode("T", $booking["date"])[0];
		}
		$booking["amount"]/=100;
		$booking["documents"]=$this->getDocuments($id);
		$booking["categories"]=$this->getCategories($id);
		return $booking;
	}
	public function getAccount(){
		return $this->getAccountById($_SESSION["account"]);
	}

	public function getAccountById($id){
		$stmt = $this->db->prepare('SELECT * FROM ACCOUNT WHERE id = :id');
		$stmt->execute([":id"=>$id]);
		return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
	}
	public function getAccounts(): array{
		$stmt = $this->db->prepare('SELECT * FROM ACCOUNT ORDER BY id');
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	public function addDocument($booking,$file): void{
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
	public function getDocuments($booking): array{
		$stmt = $this->db->prepare('SELECT * FROM DOCUMENT WHERE booking = :booking');
		$stmt->execute([":booking"=>$booking]);
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	public function getCategories($booking=null): array{
		$stmt = $this->db->prepare('SELECT id,label,amount,keywords,(category>0) as active FROM CATEGORY LEFT JOIN BOOKING_CATEGORY ON (booking = :booking AND category=id) ORDER BY upper(label)');
		$stmt->execute([":booking"=>$booking]);

		$categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
		for($i=0;$i<count($categories);$i++){
			$categories[$i]["amount"] /= 100;
		}
		return $categories;
	}
	public function getCategoriesForAutoDetect(): array{
		$stmt = $this->db->prepare('SELECT id,label,keywords,amount FROM CATEGORY');
		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
	public function getAllCategories(): array{
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
	/**
	 * @psalm-return array<int<0, max>, mixed>
	 */
	public function getBookingsForAccount($filter=true,$account): array{
		$number=0;
		$saldo=0;
		$stmt = $this->db->prepare('SELECT B.*, (SELECT label FROM CATEGORY C WHERE C.id=(SELECT category FROM BOOKING_CATEGORY BC WHERE BC.booking=B.id)) as category, (SELECT COUNT(*) FROM DOCUMENT D WHERE B.id = D.booking) AS documents FROM BOOKING B WHERE account = :account ORDER BY date');
		$stmt->execute([":account"=>$account]);
		$data=$stmt->fetchAll(PDO::FETCH_ASSOC);
		$i=0;
		$result=[];
		$oldDate = null;
		foreach($data as $d){
			if($d["type"]==0)
				$saldo+=$d["amount"];
			else
				$saldo-=$d["amount"];
			$number++;
			if(@date("Y",$d["date"])!=@$oldDate){
				$number=1;
			}
			$oldDate=@date("Y",$d["date"]);
			if($filter){
				if(@date("Y",$d["date"])!=@$_SESSION["filter"]["year"])
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
