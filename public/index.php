<?php
if (PHP_SAPI == 'cli-server') {
    $url  = parse_url($_SERVER['REQUEST_URI']);
    $file = __DIR__ . $url['path'];
    if (is_file($file)) {
        return false;
    }
}

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../src/db.php';
require __DIR__ . '/../src/csv.php';

session_start();
if(!isset($_SESSION["account"]))
    $_SESSION["account"]=1;

$settings = require __DIR__ . '/../src/settings.php';
$app = new \Slim\App($settings);

require __DIR__ . '/../src/api_routes.php';
require __DIR__ . '/../src/middleware.php';

$app->run();
