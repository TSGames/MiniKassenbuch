<?php

use Slim\Http\Request;
use Slim\Http\Response;

// API Routes
new DB();

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
$app->get('/api/bookings', function ($request, $response, $args) {
    $db = new DB();
    $list = $db->getBookings();
    return $response->withJson($list);
})->add($authMiddleware);

// Get a specific booking
$app->get('/api/bookings/{id}', function ($request, $response, $args) {
    $db = new DB();
    $data = $db->getBooking($args['id']);
    return $response->withJson($data);
})->add($authMiddleware);

// Create a new booking
$app->post('/api/bookings', function ($request, $response, $args) {
    $post = $request->getParsedBody();
    $db = new DB();
    
    // Set source to manually created
    $post['source'] = 0;
    $id = $db->setBooking($post, null);
    
    return $response->withJson(['id' => $id]);
})->add($authMiddleware);

// Update a booking
$app->put('/api/bookings/{id}', function ($request, $response, $args) {
    $post = $request->getParsedBody();
    $db = new DB();
    
    // Set source to manually created
    $post['source'] = 0;
    $db->setBooking($post, $args['id']);
    
    return $response->withJson(['success' => true]);
})->add($authMiddleware);

// Delete a booking
$app->delete('/api/bookings/{id}', function ($request, $response, $args) {
    $db = new DB();
    $db->deleteBooking($args['id']);
    
    return $response->withJson(['success' => true]);
})->add($authMiddleware);

// Get all categories
$app->get('/api/categories', function ($request, $response, $args) {
    $db = new DB();
    $categories = $db->getCategories();
    return $response->withJson($categories);
})->add($authMiddleware);

// Get all categories (all levels)
$app->get('/api/categories/all', function ($request, $response, $args) {
    $db = new DB();
    $categories = $db->getAllCategories();
    return $response->withJson($categories);
})->add($authMiddleware);

// Get a specific category
$app->get('/api/categories/{id}', function ($request, $response, $args) {
    $db = new DB();
    $category = $db->getCategory($args['id']);
    return $response->withJson($category);
})->add($authMiddleware);

// Add a new category
$app->post('/api/categories', function ($request, $response, $args) {
    $post = $request->getParsedBody();
    $db = new DB();

    $cat = trim($post['category']);
    if ($cat) {
        /** @psalm-suppress PossiblyUnusedReturnValue */
        $db->addCategory($cat);
    }

    return $response->withJson(['success' => true]);
})->add($authMiddleware);

// Update a category
$app->put('/api/categories/{id}', function ($request, $response, $args) {
    $post = $request->getParsedBody();
    $db = new DB();
    
    $db->editCategory($post["id"], $post["label"], $post["amount"] * ($post["type"] == 0 ? 1 : -1));
    
    return $response->withJson(['success' => true]);
})->add($authMiddleware);

// Delete a category
$app->delete('/api/categories/{id}', function ($request, $response, $args) {
    $db = new DB();
    $db->deleteCategory($args['id']);
    
    return $response->withJson(['success' => true]);
})->add($authMiddleware);

// Get settings
$app->get('/api/settings', function ($request, $response, $args) {
    $db = new DB();
    $settings = $db->getSettings();
    return $response->withJson($settings);
})->add($authMiddleware);

// Update settings
$app->put('/api/settings', function ($request, $response, $args) {
    $data = json_decode($request->getBody()->getContents(), true);
    $db = new DB();
    $db->updateSettings($data);
    
    return $response->withJson(['success' => true]);
})->add($authMiddleware);

// Get reports data
$app->get('/api/reports', function ($request, $response, $args) {
    $db = new DB();
    
    // Get year stats
    $yearStats = $db->getYearStats(null, 0, $_SESSION["filter"]["year"]);
    $years = $db->getYearStats();
    $yearsAccount = [];
    
    foreach ($db->getAccounts() as $a) {
        // get stats for account, only current year
        $stats = $db->getYearStats($a["id"], 0, $_SESSION["filter"]["year"]);
        if (count($stats) > 0) {
            $yearsAccount[] = ["account" => $a, "stats" => $stats];
        }
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
})->add($authMiddleware);

// Get accounts
$app->get('/api/accounts', function ($request, $response, $args) {
    $db = new DB();
    $accounts = $db->getAccounts();
    return $response->withJson($accounts);
})->add($authMiddleware);

// Get the active account (stored in session)
$app->get('/api/account', function ($request, $response, $args) {
    $db = new DB();
    $account = $db->getAccount();
    if (!$account) {
        return $response->withJson(['error' => 'Account not found'], 404);
    }
    return $response->withJson(['account' => $account]);
})->add($authMiddleware);

// Set the active account
$app->post('/api/account', function ($request, $response, $args) {
    $post = $request->getParsedBody();
    $id = isset($post['id']) ? (int) $post['id'] : null;
    if (!$id) {
        return $response->withJson(['error' => 'Account id required'], 400);
    }
    $db = new DB();
    $account = $db->getAccountById($id);
    if (!$account) {
        return $response->withJson(['error' => 'Account not found'], 404);
    }
    $_SESSION['account'] = $account['id'];
    return $response->withJson(['account' => $account]);
})->add($authMiddleware);

// Get documents for a booking
$app->get('/api/bookings/{id}/documents', function ($request, $response, $args) {
    $db = new DB();
    $documents = $db->getDocuments($args['id']);
    return $response->withJson($documents);
})->add($authMiddleware);

// Add document to booking
$app->post('/api/bookings/{id}/documents', function ($request, $response, $args) {
    $files = $request->getUploadedFiles();
    $db = new DB();
    
    foreach ($files as $file) {
        if ($file->file) {
            $db->addDocument($args['id'], $file);
        }
    }
    
    return $response->withJson(['success' => true]);
})->add($authMiddleware);

// Get document
$app->get('/api/documents/{id}', function ($request, $response, $args) {
    $db = new DB();
    $docId = intval($args['id']);

    if ($docId <= 0) {
        return $response->withStatus(400)->withJson(['error' => 'Invalid document ID']);
    }

    $document = $db->getDocument($docId);
    if ($document) {
        $filePath = DB::$DOCUMENTS . $document['id'];

        // Validate file path is within documents directory
        $realPath = realpath($filePath);
        $docsDir = realpath(DB::$DOCUMENTS);
        if ($realPath === false || $docsDir === false) {
            return $response->withStatus(403)->withJson(['error' => 'Access denied']);
        }
        if (strpos($realPath, $docsDir) !== 0) {
            return $response->withStatus(403)->withJson(['error' => 'Access denied']);
        }

        if (file_exists($filePath)) {
            $ext = strtolower(pathinfo($document['filename'], PATHINFO_EXTENSION));
            $contentType = 'application/octet-stream';

            // Determine content type for preview
            if ($ext === 'pdf') {
                $contentType = 'application/pdf';
            } elseif (in_array($ext, ['jpg', 'jpeg'])) {
                $contentType = 'image/jpeg';
            } elseif ($ext === 'png') {
                $contentType = 'image/png';
            } elseif ($ext === 'gif') {
                $contentType = 'image/gif';
            }

            $response = $response->withHeader('Content-Type', $contentType);
            return $response->write(file_get_contents($filePath));
        }
    }
    return $response->withStatus(404)->withJson(['error' => 'Document not found']);
})->add($authMiddleware);

// Delete document
$app->delete('/api/documents/{id}', function ($request, $response, $args) {
    $db = new DB();
    $db->deleteDocument($args['id']);

    return $response->withJson(['success' => true]);
})->add($authMiddleware);

// Import preview
$app->post('/api/import/preview', function ($request, $response, $args) {
    $data = json_decode($request->getBody()->getContents());
    $csv = new CSV($data->config);
    $response = $response->withHeader('Content-Type', 'application/json');
    
    return $response->withJson($csv->parse($data->csv, false));
})->add($authMiddleware);

// Import start
$app->post('/api/import/start', function ($request, $response, $args) {
    $data = json_decode($request->getBody()->getContents());
    $csv = new CSV($data->config);
    $response = $response->withHeader('Content-Type', 'application/json');
    
    return $response->withJson($csv->parse($data->csv, true));
})->add($authMiddleware);

// Export data
$app->get('/api/export', function ($request, $response, $args) {
    $db = new DB();
    $year = isset($_SESSION["filter"]["year"]) ? $_SESSION["filter"]["year"] : date("Y");

    // Validate year format to prevent injection
    if (!preg_match('/^\d{4}$/', $year)) {
        $year = date("Y");
    }

    $exportFile = $db->export();

    if (!file_exists($exportFile)) {
        return $response->withStatus(500)->withJson(['error' => 'Export failed']);
    }

    $response = $response->withHeader('Content-Type', 'application/zip')
                       ->withHeader('Content-Disposition', 'attachment; filename=export-' . $year . '.zip');

    $content = file_get_contents($exportFile);
    if ($content === false) {
        return $response->withStatus(500)->withJson(['error' => 'Failed to read export file']);
    }

    return $response->write($content);
})->add($authMiddleware);

// Backup data
$app->get('/api/backup', function ($request, $response, $args) {
    $db = new DB();
    $backupFile = $db->backup();
    
    $response = $response->withHeader('Content-Type', 'application/zip')
                       ->withHeader('Content-Disposition', 'attachment; filename=backup-' . date('Y-m-d') . '.zip');
    
    return $response->write(file_get_contents($backupFile));
})->add($authMiddleware);

// Get stats
$app->get('/api/stats', function ($request, $response, $args) {
    $db = new DB();
    $stats = $db->getStats();
    return $response->withJson($stats);
})->add($authMiddleware);

// Login endpoint
$app->get('/api/login', function ($request, $response, $args) {
    $firstTime = !file_exists(__DIR__ . '/../data/authentication.json');
    return $response->withJson([
        'firstTime' => $firstTime
    ]);
});

$app->post('/api/login', function ($request, $response, $args) {
    $post = $request->getParsedBody();
    
    // Check if user and password are provided
    if (!$post || !$post["user"] || !$post["password"]) {
        return $response->withJson(['error' => 'User and password required'], 400);
    }
    
    $firstTime = !file_exists(__DIR__ . '/../data/authentication.json');
    $validReadOnly = false;
    
    if ($firstTime) {
        // First time setup - create user account
        $authData = json_encode([
            "user" => strtolower($post["user"]),
            "password" => password_hash($post["password"], PASSWORD_BCRYPT)
        ]);
        if ($authData !== false) {
            file_put_contents(__DIR__ . '/../data/authentication.json', $authData);
            $valid = true;
        } else {
            return $response->withJson(['error' => 'Failed to encode authentication data'], 500);
        }
    } else {
        // Check existing credentials
        $authContent = file_get_contents(__DIR__ . '/../data/authentication.json');
        if ($authContent === false) {
            return $response->withJson(['error' => 'Failed to read authentication data'], 500);
        }
        $data = json_decode($authContent);
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
            'readonly' => $validReadOnly,
            'firstTime' => $firstTime
        ]);
    } else {
        // Return error response
        return $response->withJson(['error' => 'Invalid credentials'], 401);
    }
});

// Update filter settings
$app->post('/api/filter', function ($request, $response, $args) {
    session_start();
    $post = $request->getParsedBody();

    if (isset($post['year'])) {
        $_SESSION['filter']['year'] = intval($post['year']);
    }
    if (isset($post['month'])) {
        $_SESSION['filter']['month'] = intval($post['month']);
    }

    return $response->withJson(['success' => true]);
})->add($authMiddleware);

// Logout endpoint
$app->post('/api/logout', function ($request, $response, $args) {
    session_start();
    unset($_SESSION['user']);
    unset($_SESSION['readonly']);

    return $response->withJson(['success' => true]);
});

