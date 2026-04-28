<?php

use Slim\Http\Request;
use Slim\Http\Response;

// API Routes
$db = new DB();

// Authentication middleware for API endpoints
$authMiddleware = function ($request, $response, $next) {
    session_start();
    if (!isset($_SESSION['user'])) {
        return $response->withJson(['error' => 'Authentication required'], 401);
    }
    return $next($request, $response);
};

// Apply authentication to protected routes

// Get all bookings
$app->get('/api/bookings', $authMiddleware, function ($request, $response, $args) {
    $db = new DB();
    $list = $db->getBookings();
    return $response->withJson($list);
});

// Get a specific booking
$app->get('/api/bookings/{id}', $authMiddleware, function ($request, $response, $args) {
    $db = new DB();
    $data = $db->getBooking($args['id']);
    return $response->withJson($data);
});

// Create a new booking
$app->post('/api/bookings', $authMiddleware, function ($request, $response, $args) {
    $post = $request->getParsedBody();
    $db = new DB();
    
    // Set source to manually created
    $post['source'] = 0;
    $id = $db->setBooking($post, null);
    
    return $response->withJson(['id' => $id]);
});

// Update a booking
$app->put('/api/bookings/{id}', $authMiddleware, function ($request, $response, $args) {
    $post = $request->getParsedBody();
    $db = new DB();
    
    // Set source to manually created
    $post['source'] = 0;
    $db->setBooking($post, $args['id']);
    
    return $response->withJson(['success' => true]);
});

// Delete a booking
$app->delete('/api/bookings/{id}', $authMiddleware, function ($request, $response, $args) {
    $db = new DB();
    $db->deleteBooking($args['id']);
    
    return $response->withJson(['success' => true]);
});

// Get all categories
$app->get('/api/categories', $authMiddleware, function ($request, $response, $args) {
    $db = new DB();
    $categories = $db->getCategories();
    return $response->withJson($categories);
});

// Get all categories (all levels)
$app->get('/api/categories/all', $authMiddleware, function ($request, $response, $args) {
    $db = new DB();
    $categories = $db->getAllCategories();
    return $response->withJson($categories);
});

// Add a new category
$app->post('/api/categories', $authMiddleware, function ($request, $response, $args) {
    $post = $request->getParsedBody();
    $db = new DB();
    
    $cat = trim($post['category']);
    if ($cat) {
        $db->addCategory($cat);
    }
    
    return $response->withJson(['success' => true]);
});

// Update a category
$app->put('/api/categories/{id}', $authMiddleware, function ($request, $response, $args) {
    $post = $request->getParsedBody();
    $db = new DB();
    
    $db->editCategory($post["id"], $post["label"], $post["amount"] * ($post["type"] == 0 ? 1 : -1));
    
    return $response->withJson(['success' => true]);
});

// Delete a category
$app->delete('/api/categories/{id}', $authMiddleware, function ($request, $response, $args) {
    $db = new DB();
    $db->deleteCategory($args['id']);
    
    return $response->withJson(['success' => true]);
});

// Get settings
$app->get('/api/settings', $authMiddleware, function ($request, $response, $args) {
    $db = new DB();
    $settings = $db->getSettings();
    return $response->withJson($settings);
});

// Update settings
$app->put('/api/settings', $authMiddleware, function ($request, $response, $args) {
    $data = json_decode($request->getBody()->getContents(), true);
    $db = new DB();
    $db->updateSettings($data);
    
    return $response->withJson(['success' => true]);
});

// Get reports data
$app->get('/api/reports', $authMiddleware, function ($request, $response, $args) {
    $db = new DB();
    
    // Get year stats
    $yearStats = $db->getYearStats(null, 0, $_SESSION["filter"]["year"]);
    $years = $db->getYearStats();
    $yearsAccount = [];
    
    foreach ($db->getAccounts() as $a) {
        // get stats for account, only current year
        $stats = $db->getYearStats($a["id"], 0, $_SESSION["filter"]["year"]);
        if ($stats && count($stats))
            $yearsAccount[] = ["account" => $a, "stats" => $stats];
    }
    
    $bookings = $db->getBookings(false);
    $categoriesMissing = 0;
    foreach ($bookings as $b) {
        if (!$b['category']) {
            $categoriesMissing++;
        }
    }
    
    $months = $db->getMonthStats();
    $tops = $db->getTopBookingsYear();
    $categories = $db->getTopBookingsCategories();
    $year = $_SESSION["filter"]["year"];
    
    return $response->withJson([
        'currentYear' => $year,
        'yearStats' => $yearStats,
        'years' => $years,
        'yearsAccount' => $yearsAccount,
        'months' => $months,
        'tops' => $tops,
        'categories' => $categories,
        'categoriesMissing' => $categoriesMissing
    ]);
});

// Get accounts
$app->get('/api/accounts', $authMiddleware, function ($request, $response, $args) {
    $db = new DB();
    $accounts = $db->getAccounts();
    return $response->withJson($accounts);
});

// Get documents for a booking
$app->get('/api/bookings/{id}/documents', $authMiddleware, function ($request, $response, $args) {
    $db = new DB();
    $documents = $db->getDocuments($args['id']);
    return $response->withJson($documents);
});

// Add document to booking
$app->post('/api/bookings/{id}/documents', $authMiddleware, function ($request, $response, $args) {
    $files = $request->getUploadedFiles();
    $db = new DB();
    
    foreach ($files as $file) {
        if ($file->file) {
            $db->addDocument($args['id'], $file);
        }
    }
    
    return $response->withJson(['success' => true]);
});

// Delete document
$app->delete('/api/documents/{id}', $authMiddleware, function ($request, $response, $args) {
    $db = new DB();
    $db->deleteDocument($args['id']);
    
    return $response->withJson(['success' => true]);
});

// Import preview
$app->post('/api/import/preview', $authMiddleware, function ($request, $response, $args) {
    $data = json_decode($request->getBody()->getContents());
    $csv = new CSV($data->config);
    $response = $response->withHeader('Content-Type', 'application/json');
    
    return $response->withJson($csv->parse($data->csv, false));
});

// Import start
$app->post('/api/import/start', $authMiddleware, function ($request, $response, $args) {
    $data = json_decode($request->getBody()->getContents());
    $csv = new CSV($data->config);
    $response = $response->withHeader('Content-Type', 'application/json');
    
    return $response->withJson($csv->parse($data->csv, true));
});

// Export data
$app->get('/api/export', $authMiddleware, function ($request, $response, $args) {
    $db = new DB();
    $exportFile = $db->export();
    
    $response = $response->withHeader('Content-Type', 'application/zip')
                       ->withHeader('Content-Disposition', 'attachment; filename=export-' . $_SESSION["filter"]["year"] . '.zip');
    
    return $response->write(file_get_contents($exportFile));
});

// Backup data
$app->get('/api/backup', $authMiddleware, function ($request, $response, $args) {
    $db = new DB();
    $backupFile = $db->backup();
    
    $response = $response->withHeader('Content-Type', 'application/zip')
                       ->withHeader('Content-Disposition', 'attachment; filename=backup-' . date('Y-m-d') . '.zip');
    
    return $response->write(file_get_contents($backupFile));
});

// Get stats
$app->get('/api/stats', $authMiddleware, function ($request, $response, $args) {
    $db = new DB();
    $stats = $db->getStats();
    return $response->withJson($stats);
});

// Login endpoint
$app->post('/api/login', function ($request, $response, $args) {
    $post = $request->getParsedBody();
    
    // Check if user and password are provided
    if (!$post || !$post["user"] || !$post["password"]) {
        return $response->withJson(['error' => 'User and password required'], 400);
    }
    
    $firstTime = !file_exists(__DIR__ . '/../data/authentication.json');
    $valid = null;
    $validReadOnly = false;
    
    if ($firstTime) {
        // First time setup - create user account
        file_put_contents(__DIR__ . '/../data/authentication.json', json_encode([
            "user" => strtolower($post["user"]),
            "password" => password_hash($post["password"], PASSWORD_BCRYPT)
        ]));
        $valid = true;
    } else {
        // Check existing credentials
        $data = json_decode(file_get_contents(__DIR__ . '/../data/authentication.json'));
        $valid = (strtolower($post['user']) === strtolower($data->user) && password_verify($post['password'], $data->password));
        
        if (!$valid) {
            // Check read-only settings if available
            $db = new DB();
            $settings = $db->getSettings();
            if ($settings['readOnlyEnabled']) {
                $validReadOnly = (strtolower($post['user']) === strtolower($settings['readOnlyUsername']) && password_verify($post['password'], $settings['readOnlyPassword']));
            }
        }
    }
    
    if ($valid || $validReadOnly) {
        // Set session data (this is for API session management)
        session_start();
        $_SESSION['user'] = strtolower($post['user']);
        $_SESSION['readonly'] = $validReadOnly;
        
        // Return success response
        return $response->withJson([
            'success' => true,
            'user' => $post['user'],
            'readonly' => $validReadOnly
        ]);
    } else {
        // Return error response
        return $response->withJson(['error' => 'Invalid credentials'], 401);
    }
});

// Logout endpoint
$app->post('/api/logout', function ($request, $response, $args) {
    session_start();
    unset($_SESSION['user']);
    unset($_SESSION['readonly']);
    
    return $response->withJson(['success' => true]);
});
