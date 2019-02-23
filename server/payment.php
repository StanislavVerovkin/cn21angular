<?php

include 'LiqPay.php';

if (isset($_GET['price'])) {

    $public_key = 'i44526618396';
    $private_key = 'E0P10QvwdQ7aYMAQqJaBRf6CfQh0yAua6O1eD4lI';
    $price = $_GET['price'];

    $liqpay = new LiqPay($public_key, $private_key);
    $html = $liqpay->cnb_form(array(
        'action' => 'pay',
        'version' => '3',
        'amount' => $price,
        'currency' => 'EUR',
        'description' => "test",
        'language' => 'en'
    ));

    echo json_encode($html);
}


