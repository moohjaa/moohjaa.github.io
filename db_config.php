<?php
// db_config.php - Configuración de base de datos
// Edita estos valores según tu configuración

// Para desarrollo local (XAMPP, WAMP, MAMP)
define('DB_HOST_LOCAL', 'localhost');
define('DB_NAME_LOCAL', 'love_database');
define('DB_USER_LOCAL', 'root');
define('DB_PASS_LOCAL', '');
define('DB_PORT_LOCAL', 3306);

// Para producción (servidor en línea)
define('DB_HOST_PROD', 'tu-servidor.com');
define('DB_NAME_PROD', 'tu_base_de_datos');
define('DB_USER_PROD', 'tu_usuario');
define('DB_PASS_PROD', 'tu_contraseña');
define('DB_PORT_PROD', 3306);

// Detectar entorno automáticamente
function isLocalEnvironment() {
    $localHosts = ['localhost', '127.0.0.1', '::1'];
    return in_array($_SERVER['HTTP_HOST'], $localHosts) || 
           strpos($_SERVER['HTTP_HOST'], '.local') !== false ||
           strpos($_SERVER['HTTP_HOST'], 'localhost:') === 0;
}

// Obtener configuración según el entorno
function getDatabaseConfig() {
    if (isLocalEnvironment()) {
        return [
            'host' => DB_HOST_LOCAL,
            'dbname' => DB_NAME_LOCAL,
            'username' => DB_USER_LOCAL,
            'password' => DB_PASS_LOCAL,
            'port' => DB_PORT_LOCAL,
            'environment' => 'local'
        ];
    } else {
        return [
            'host' => DB_HOST_PROD,
            'dbname' => DB_NAME_PROD,
            'username' => DB_USER_PROD,
            'password' => DB_PASS_PROD,
            'port' => DB_PORT_PROD,
            'environment' => 'production'
        ];
    }
}
?>
