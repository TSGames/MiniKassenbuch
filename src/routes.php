<?php

use Slim\Http\Request;
use Slim\Http\Response;


// Routes
$db = new DB();

$app->get('/', function ($request, $response, $args) {
	$get=$request->getQueryParams();
	if(isset($get["month"]) && isset($get["year"])){
		$_SESSION["filter"]["month"]=$get["month"];
		$_SESSION["filter"]["year"]=$get["year"];
		return $response->withRedirect($request->getUri()->getBaseUrl());
	}
	$db=new DB();
	$list=$db->getBookings();
	return $this->view->render($response, 'list.html', [
        'list' => $list		
    ]);
});
$app->get('/export', function ($request, $response, $args) {
	header('Content-Disposition: attachment; filename='.'export-'.date('Y-m-d').'.zip');
	$db=new DB();
	
	echo file_get_contents($db->export());
});
$app->get('/settings', function ($request, $response, $args) {
    $db=new DB();
    return $this->view->render($response, 'settings.html', 
        $db->getSettings()
    );
});
$app->post('/settings', function ($request, $response, $args) {
    $db=new DB();
    
    $db->updateSettings($request->getParsedBody());
    return $response->withRedirect($request->getUri()->getBaseUrl()."/settings");   
});
$app->get('/reports', function ($request, $response, $args) {
	$db=new DB();
	$yearStats=$db->getYearStats(null,0,$_SESSION["filter"]["year"]);
	$years=$db->getYearStats();
	$yearsAccount=[];
	foreach($db->getAccounts() as $a){
	    // get stats for account, only current year
	    $stats=$db->getYearStats($a["id"],0,$_SESSION["filter"]["year"]);
	    if(@count($stats))
	        $yearsAccount[]=["account"=>$a,"stats"=>$stats];
	}
    $months=$db->getMonthStats();
	$tops=$db->getTopBookingsYear();
	$categories=$db->getTopBookingsCategories();
	$year=$_SESSION["filter"]["year"];
	return $this->view->render($response, 'reports.html', [
		'currentYear' => $year,
	    'yearStats' => $yearStats,
	    'years' => $years,
	    'yearsAccount' => $yearsAccount,
	    'months' => $months,
		'tops' => $tops,
		'categories' => $categories
    ]);
});
$app->get('/add', function ($request, $response, $args) {
	$db=new DB();
	$data['categories']=$db->getCategories();
	return $this->view->render($response, 'booking.html', $data);
});
$app->get('/document/{id}', function ($request, $response, $args) {
	$db=new DB();
	$path=DB::$DOCUMENTS.$args["id"]*1;
	$response  = $response->withHeader('Content-Type', mime_content_type($path))->withHeader('Content-Disposition','inline; filename="'.$db->getDocument($args["id"])['filename'].'"');
	readfile($path);
	return $response;
});
$app->get('/categories', function ($request, $response, $args) {
	$db=new DB();
	$data=["categories" => $db->getAllCategories()];
	return $this->view->render($response, 'categories.html', $data);
});
$app->post('/account', function ($request, $response, $args) {
	$post = $request->getParsedBody();
	$_SESSION["account"]=$post["id"];
	return $response->withRedirect($request->getUri()->getBaseUrl());
});
$app->get('/edit', function ($request, $response, $args) {
	$db=new DB();
	$get=$request->getQueryParams();
	$data=$db->getBooking($get['id']);
	return $this->view->render($response, 'booking.html', $data);
});
$app->post('/delete', function ($request, $response, $args) {
	$post = $request->getParsedBody();
	$db=new DB();
	$db->deleteBooking($post["id"]);
	return $response->withRedirect($request->getUri()->getBaseUrl());
});
$app->get('/edit_category', function ($request, $response, $args) {
	$db=new DB();
	$get=$request->getQueryParams();
	return $this->view->render($response, 'edit_category.html', $db->getCategory($get['id']));
});
$app->post('/delete_category', function ($request, $response, $args) {
	$post = $request->getParsedBody();
	$db=new DB();
	$db->deleteCategory($post["id"]);
	return $response->withRedirect($request->getUri()->getBaseUrl()."/categories");
});
$app->post('/edit_category', function ($request, $response, $args) {
	$post = $request->getParsedBody();
	$db=new DB();
	$db->editCategory($post["id"],$post["label"],$post["amount"] * ($post["type"] == 0 ? 1 : -1));
	return $response->withRedirect($request->getUri()->getBaseUrl()."/categories");
});
$app->post('/delete_document', function ($request, $response, $args) {
	$get=$request->getQueryParams();
	$post = $request->getParsedBody();
	$db=new DB();
	$db->deleteDocument($post["id"]);
	return $response->withRedirect($request->getUri()->getBaseUrl()."/edit?id=".$get['booking']);
});
$app->get('/delete', function ($request, $response, $args) {
	$db=new DB();
	$get=$request->getQueryParams();
	return $this->view->render($response, 'delete.html', $db->getBooking($get['id']));
});
$app->get('/delete_category', function ($request, $response, $args) {
	$db=new DB();
	$get=$request->getQueryParams();
	return $this->view->render($response, 'delete_category.html', $db->getCategory($get['id']));
});
$app->post('/categories/add', function ($request, $response, $args) {
	$post = $request->getParsedBody();
	$db=new DB();
	$cat=trim($post['category']);
	if($cat){
		$db->addCategory($cat);
	}
	return $response->withRedirect($request->getUri()->getBaseUrl()."/categories");
});
$app->post('/save', function ($request, $response, $args) {
	$post = $request->getParsedBody();
	$get=$request->getQueryParams();
	$files = $request->getUploadedFiles();
	$error=null;
	//print_r($files);
	/*
	if(!trim($post["label"])){
		$error="Bitte Bezeichnung angeben";
	}
	else */if(!trim($post["date"])){
		$error="Bitte Datum angeben";
	}
	else if(!trim($post["amount"])){
		$error="Bitte Betrag angeben";
	}
	else if(!@$post["category"]){
		$error="Bitte eine Kategorie festlegen";
	}
	if($error){
		$db=new DB();
		$post["error"]=$error;
		$post["categories"]=$db->getCategories();
		return $this->view->render($response, 'booking.html', $post);
	}
	else{
		$db=new DB();
		$id=$db->setBooking($post,$get["id"]);
		foreach($files as $file){
			if($file->file)
				$db->addDocument($id,$file);
		}
		return $response->withRedirect($request->getUri()->getBaseUrl());
	}
});