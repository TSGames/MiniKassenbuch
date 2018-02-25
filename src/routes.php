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
$app->get('/reports', function ($request, $response, $args) {
	$db=new DB();
	$years=$db->getYearStats();
	$months=$db->getMonthStats();
	$tops=$db->getTopBookingsYear();
	$categories=$db->getTopBookingsCategories();
	return $this->view->render($response, 'reports.html', [
		'years' => $years,
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
$app->post('/delete_category', function ($request, $response, $args) {
	$post = $request->getParsedBody();
	$db=new DB();
	$db->deleteCategory($post["id"]);
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