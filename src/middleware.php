<?php
$app->add(function ($request, $response, $next) {
    if(@$_SESSION["readonly"] === true) {
        $isAllowed = false;
        if($request->getMethod() === 'GET' || $isAllowed) {
            return $response->withStatus(403);
        } else {
            return $response->withRedirect($request->getUri()->getBaseUrl());
        }
    } else {
        return $next($request, $response);
    }
});
$app->add(function ($request, $response, $next) {
    if(isset($_SESSION["user"])) {
        return $next($request, $response);
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
            $validReadOnly = (strtolower($post['user']) === strtolower($data->readonly->user) && password_verify($post['password'], $data->readonly->password));
        }
        if($valid || $validReadOnly) {
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