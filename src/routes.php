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
		return $response->withRedirect($request->getUri()->getBasePath());
	}
	$db=new DB();
	$list=$db->getBookings();
	return $this->view->render($response, 'list.html', [
        'list' => $list		
    ]);
});
$app->get('/reports', function ($request, $response, $args) {
	$db=new DB();
	$years=$db->getYearStats();
	$months=$db->getMonthStats();
	$tops=$db->getTopBookingsYear();
	return $this->view->render($response, 'reports.html', [
		'years' => $years,
		'months' => $months,
		'tops' => $tops
    ]);
});
$app->get('/add', function ($request, $response, $args) {
	return $this->view->render($response, 'booking.html', [
    ]);
});
$app->get('/document/{id}', function ($request, $response, $args) {
	$path="../documents/".$args["id"]*1;
	$response   = $response->withHeader('Content-Type', mime_content_type($path));
	readfile($path);
	return $response;
});
$app->post('/account', function ($request, $response, $args) {
	$post = $request->getParsedBody();
	$_SESSION["account"]=$post["id"];
	return $response->withRedirect($request->getUri()->getBasePath());
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
	return $response->withRedirect($request->getUri()->getBasePath());
});
$app->post('/delete_document', function ($request, $response, $args) {
	$get=$request->getQueryParams();
	$post = $request->getParsedBody();
	$db=new DB();
	$db->deleteDocument($post["id"]);
	return $response->withRedirect($request->getUri()->getBasePath()."/edit?id=".$get['booking']);
});
$app->get('/delete', function ($request, $response, $args) {
	$db=new DB();
	$get=$request->getQueryParams();
	return $this->view->render($response, 'delete.html', $db->getBooking($get['id']));
});

$app->post('/save', function ($request, $response, $args) {
	$post = $request->getParsedBody();
	$get=$request->getQueryParams();
	$files = $request->getUploadedFiles();
	$error=null;
	print_r($files);
	if(!trim($post["label"])){
		$error="Bitte Bezeichnung angeben";
	}
	else if(!trim($post["date"])){
		$error="Bitte Datum angeben";
	}
	else if(!trim($post["amount"])){
		$error="Bitte Betrag angeben";
	}
	if($error){
		$post["error"]=$error;
		return $this->view->render($response, 'booking.html', $post);
	}
	else{
		$db=new DB();
		$id=$db->setBooking($post,$get["id"]);
		foreach($files as $file){
			if($file->file)
				$db->addDocument($id,$file);
		}
		return $response->withRedirect($request->getUri()->getBasePath());
	}
});