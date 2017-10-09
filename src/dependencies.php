<?php
// DIC configuration

$container = $app->getContainer();

// view renderer
$container['renderer'] = function ($c) {
    $settings = $c->get('settings')['renderer'];
    return new Slim\Views\PhpRenderer($settings['template_path']);
};

// Register component on container
$container['view'] = function ($container) {
    $view = new \Slim\Views\Twig('../templates', [
        //'cache' => 'cache'
    ]);
    
    // Instantiate and add Slim specific extension
    $basePath = rtrim(str_ireplace('index.php', '', $container['request']->getUri()->getBasePath()), '/');
    $view->addExtension(new Slim\Views\TwigExtension($container['router'], $basePath));
	
	$db=new DB();
	$view->offsetSet('activeAccount', $db->getAccount());
	$view->offsetSet('accounts', $db->getAccounts());
	$view->offsetSet('currency', "€");
	$view->offsetSet('year', date("Y"));
	$view->offsetSet('month', date("m"));
	if(!$_SESSION["filter"]){
		$_SESSION["filter"]["month"]=0;
		$_SESSION["filter"]["year"]=date("Y");
	}
	$view->offsetSet('filter', $_SESSION["filter"]);
    return $view;
};