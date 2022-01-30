<?php

$app->add(function ($request, $response, $next) {
    if(isset($_SESSION["user"])) {
        $response = $next($request, $response);
        return $response;
    }
    $firstTime = !file_exists(__DIR__ . '/authentication.json');
    $post = $request->getParsedBody();
    $valid = null;
    if($post && $post["user"] && $post["password"]) {
        if($firstTime) {
            file_put_contents(__DIR__ . '/authentication.json', json_encode([
                "user" => strtolower($post["user"]),
                "password" => password_hash($post["password"], PASSWORD_BCRYPT)
            ]));
            $valid = true;
        } else {
            $data = json_decode(file_get_contents(__DIR__ . '/authentication.json'));
            $valid = (strtolower($post['user']) === strtolower($data->user) && password_verify($post['password'], $data->password));
        }
        if($valid) {
            $_SESSION['user'] = strtolower($post['user']);
            return $response->withRedirect($request->getUri()->getBaseUrl());
        }
    }
    return $this->view->render($response, 'login.html', [
        'firstTime' => $firstTime,
        'valid' => $valid,
    ]);
});