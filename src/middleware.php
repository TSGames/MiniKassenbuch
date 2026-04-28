<?php

function isApiRequest($request) {
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

    if (isset($_SESSION["user"])) {
        return $next($request, $response);
    }
    $firstTime = !file_exists(__DIR__ . '/../data/authentication.json');
    $post = $request->getParsedBody();
    $valid = null;
    $validReadOnly = false;
    if ($post && $post["user"] && $post["password"]) {
        if ($firstTime) {
            file_put_contents(__DIR__ . '/../data/authentication.json', json_encode([
                "user" => strtolower($post["user"]),
                "password" => password_hash($post["password"], PASSWORD_BCRYPT)
            ]));
            $valid = true;
        } else {
            $data = json_decode(file_get_contents(__DIR__ . '/../data/authentication.json'));
            $valid = (strtolower($post['user']) === strtolower($data->user) && password_verify($post['password'], $data->password));
            if (!$valid) {
                $db = new DB();
                $settings = $db->getSettings();
                if ($settings['readOnlyEnabled']) {
                    $validReadOnly = (strtolower($post['user']) === strtolower($settings['readOnlyUsername']) && password_verify($post['password'], $settings['readOnlyPassword']));
                }
            }
        }
        if ($valid || $validReadOnly) {
            $_SESSION['user'] = strtolower($post['user']);
            $_SESSION['readonly'] = $validReadOnly;
            return $response->withRedirect($request->getUri()->getBaseUrl());
        }
    }
    return $this->view->render($response, 'login.html', [
        'firstTime' => $firstTime,
        'valid' => $valid,
    ]);
});