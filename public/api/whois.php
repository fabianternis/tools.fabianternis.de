<?php

// Prevent any error output from being sent as HTML
ini_set('display_errors', 0);
error_reporting(E_ALL);

header('Content-Type: application/json');

try {
    require_once __DIR__ . '/../../bootstrap.php';

    use App\WhoisProxy;

    $domain = $_GET['domain'] ?? '';

    if (empty($domain)) {
        throw new Exception('Domain parameter is required');
    }

    $proxy = new WhoisProxy();
    $result = $proxy->lookup($domain);

    echo json_encode($result);
} catch (Throwable $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
