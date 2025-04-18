<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["error" => "Csak POST kérés engedélyezett!"]);
    exit;
}

$fields = [];
foreach(["op", "code", "name", "height", "weight", "id"] as $f) {
    if (isset($_POST[$f])) {
        $fields[$f] = $_POST[$f];
    }
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://gamf.nhely.hu/ajax2/");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT'] ?? "PHP-cURL");

$response = curl_exec($ch);

if ($response === false) {
    http_response_code(500);
    echo json_encode(["error" => "cURL hiba: " . curl_error($ch)]);
} else {
    $json_test = json_decode($response, true);
    if (json_last_error() === JSON_ERROR_NONE) {
        echo $response;
    } else {
        http_response_code(502);
        echo json_encode([
            "error" => "Nem JSON válasz érkezett a GAMF API-tól.",
            "raw" => $response
        ]);
    }
}

curl_close($ch);
?>
