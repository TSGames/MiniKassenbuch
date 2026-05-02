<?php

/**
 * @return false|int
 *
 * @psalm-return 0|1|false
 */
function isApiRequest($request): int|false {
    $path = '/' . trim($request->getUri()->getPath(), '/');
    return preg_match('#^/api(/|$)#', $path);
}

$app->add(function ($request, $response, $next) {
    if (isApiRequest($request)) {
        return $next($request, $response);
    }

    if (@$_SESSION["readonly"] === true) {
        $isAllowed = false;
        if (trim($request->getUri()->getPath(), '/') == 'account') {
            $isAllowed = true;
        }
        if (!($request->getMethod() === 'GET' || $isAllowed)) {
            throw new \Exception('Keine Schreibrechte zum Durchführen des Vorgangs: ' . $request->getUri()->getPath());
        }
    }

    return $next($request, $response);
});

$app->add(function ($request, $response, $next) {
    if (isApiRequest($request)) {
        return $next($request, $response);
    }

    // Check if this is a static file request (JS, CSS, images, etc.)
    $path = trim($request->getUri()->getPath(), '/');
    $staticExtensions = ['js', 'css', 'png', 'jpg', 'jpeg', 'gif', 'ico', 'svg', 'woff', 'woff2', 'ttf', 'eot', 'json'];
    $pathExt = strtolower(pathinfo($path, PATHINFO_EXTENSION));
    if (in_array($pathExt, $staticExtensions)) {
        // Let static files be served by the web server
        return $next($request, $response);
    }

    if (isset($_SESSION["user"])) {
        // User is authenticated, serve the Angular frontend
        $indexPath = __DIR__ . '/../public/browser/index.html';
        if (file_exists($indexPath)) {
            $html = file_get_contents($indexPath);
            if ($html !== false) {
                $response->getBody()->write($html);
                return $response->withHeader('Content-Type', 'text/html');
            }
        }
        return $response->withStatus(500)->withJson(['error' => 'Frontend not found']);
    }

    // User is not authenticated
    $firstTime = !file_exists(__DIR__ . '/../data/authentication.json');
    $post = $request->getParsedBody();
    $valid = false;
    $validReadOnly = false;
    if ($post && $post["user"] && $post["password"]) {
        if ($firstTime) {
            $authData = json_encode([
                "user" => strtolower($post["user"]),
                "password" => password_hash($post["password"], PASSWORD_BCRYPT)
            ]);
            if ($authData !== false) {
                file_put_contents(__DIR__ . '/../data/authentication.json', $authData);
                $valid = true;
            }
        } else {
            $authContent = file_get_contents(__DIR__ . '/../data/authentication.json');
            if ($authContent !== false) {
                $data = json_decode($authContent);
                if ($data) {
                    $valid = (strtolower($post['user']) === strtolower($data->user) && password_verify($post['password'], $data->password));
                    if (!$valid) {
                        $db = new DB();
                        $settings = $db->getSettings();
                        if ($settings['readOnlyEnabled']) {
                            $validReadOnly = (strtolower($post['user']) === strtolower($settings['readOnlyUsername']) && password_verify($post['password'], $settings['readOnlyPassword']));
                        }
                    }
                }
            }
        }
        if ($valid || $validReadOnly) {
            $_SESSION['user'] = strtolower($post['user']);
            $_SESSION['readonly'] = $validReadOnly;
            return $response->withRedirect($request->getUri()->getBaseUrl());
        }
    }

    // Serve login page
    $indexPath = __DIR__ . '/../public/browser/index.html';
    if (file_exists($indexPath)) {
        $html = file_get_contents($indexPath);
        if ($html !== false) {
            $response->getBody()->write($html);
            return $response->withHeader('Content-Type', 'text/html');
        }
    }
    return $response->withStatus(500)->withJson(['error' => 'Frontend not found']);

});