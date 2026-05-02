<?php
$url = $_SERVER['REQUEST_URI'];
$path = parse_url($url, PHP_URL_PATH);

// API requests go through index.php
if (strpos($path, '/api') === 0) {
    include __DIR__ . '/public/index.php';
    return;
}

$file = __DIR__ . '/public' . $path;

// If it's a real file/directory, serve it
if ($path !== '/' && (is_file($file) || is_dir($file))) {
    return false;
}

// For all other requests (including /), serve the Angular app's index.html
$_GET['_request'] = trim($path, '/');
include __DIR__ . '/public/browser/index.html';
