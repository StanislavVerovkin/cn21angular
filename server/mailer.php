<?php

switch ($_SERVER['REQUEST_METHOD']) {
    case("OPTIONS"):
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case("POST"):
        header("Access-Control-Allow-Origin: *");

        $json = file_get_contents('php://input');

        $params = json_decode($json);

        $email = $params->email;
        $name = $params->name;
        $message = $params->message;

        $recipient = 'sverevkin25@gmail.com';
        $subject = 'Message from user';
        $headers = "From: $name <$email>";

        mail($recipient, $subject, $message, $headers);
        break;
    default:
        header("Allow: POST", true, 405);
        exit;
}

