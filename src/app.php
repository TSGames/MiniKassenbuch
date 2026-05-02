<?php
$config = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];
require 'vendor/autoload.php';

$app = new \Slim\App($config);

$app->run();
