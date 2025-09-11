<?php
// Simple contador de usuarios activos por IP+UserAgent (TTL = 2 minutos)
// Guarda estado en un JSON en el mismo directorio

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

// CORS opcional: permite tu dominio (útil si sirves desde www y sin www)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin && preg_match('~^https?://(www\.)?sigmagames\.ct\.ws$~', $origin)) {
    header("Access-Control-Allow-Origin: $origin");
}
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$storePath = __DIR__ . DIRECTORY_SEPARATOR . 'active_users.json';
$ttlSeconds = 120; // 2 minutos
$now = time();
$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$ua = $_SERVER['HTTP_USER_AGENT'] ?? '';
$token = hash('sha256', $ip . '|' . $ua);

// Carga estado actual
$data = [];
if (is_file($storePath)) {
    $raw = @file_get_contents($storePath);
    if ($raw !== false) {
        $parsed = json_decode($raw, true);
        if (is_array($parsed)) { $data = $parsed; }
    }
}

// Limpia registros vencidos
$minTs = $now - $ttlSeconds;
foreach ($data as $t => $ts) {
    if (!is_int($ts) || $ts < $minTs) {
        unset($data[$t]);
    }
}

// Actualiza el usuario actual
$data[$token] = $now;

// Guarda con lock
$encoded = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
@file_put_contents($storePath, $encoded, LOCK_EX);

// Respuesta
$count = is_array($data) ? count($data) : 0;
echo json_encode(['activeUsers' => $count], JSON_UNESCAPED_UNICODE);