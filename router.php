<?php
error_log("REQUEST_URI: " . $_SERVER['REQUEST_URI']);
$url = $_SERVER['REQUEST_URI'];
$path = parse_url($url, PHP_URL_PATH);
error_log("PATH: " . $path);
error_log("strpos check: " . var_export(strpos($path, '/api'), true));

// API requests go through index.php
if (strpos($path, '/api') === 0) {
    error_log("Routing to API");
    include __DIR__ . '/public/index.php';
    return;
}

$file = __DIR__ . '/public' . $path;

error_log("FILE: " . $file);
error_log("is_file: " . var_export(is_file($file), true));
error_log("is_dir: " . var_export(is_dir($file), true));

// If it's a real file/directory, serve it
if ($path !== '/' && (is_file($file) || is_dir($file))) {
    error_log("Serving static file");
    return false;
}

// For all other requests (including /), serve the Angular app's index.html
error_log("Serving Angular app");
$_GET['_request'] = trim($path, '/');
include __DIR__ . '/public/browser/index.html';
