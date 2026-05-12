<?php
/**
 * Application Bootstrap
 */

// Define project root
define('PROJECT_ROOT', __DIR__);

// Simple autoloader for classes in src/
spl_autoload_register(function ($class) {
    $file = PROJECT_ROOT . '/src/' . str_replace('\\', '/', $class) . '.php';
    if (file_exists($file)) {
        require_once $file;
    }
});

// Load configuration or other initialization if needed
