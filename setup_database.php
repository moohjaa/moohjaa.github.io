<?php
// setup_database.php - Configuración automática de la base de datos
// Ejecuta este archivo SOLO UNA VEZ para crear las tablas

error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h2>🗄️ Configuración de Base de Datos para Sistema Romántico 💕</h2>";

// Configuración de la base de datos
$host = 'bmqv7xjigycwryut4zca-mysql.services.clever-cloud.com';
$dbname = 'bmqv7xjigycwryut4zca';
$username = 'usos5vc8fqdjocre';
$password = '6Rspbz0HEeA5eXAaErFF';
$port = 3306;

try {
    // Conectar sin especificar base de datos primero
    $dsn = "mysql:host={$host};port={$port};charset=utf8mb4";
    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_TIMEOUT => 30,
        PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false,
    ]);
    
    echo "<p>✅ Conectado al servidor MySQL</p>";
    
    // Seleccionar la base de datos
    $pdo->exec("USE {$dbname}");
    echo "<p>✅ Base de datos '{$dbname}' seleccionada</p>";
    
    // Script SQL para crear las tablas
    $sql = "
    -- Eliminar tablas si existen (para empezar limpio)
    DROP TABLE IF EXISTS user_stats;
    DROP TABLE IF EXISTS custom_dates;
    DROP TABLE IF EXISTS love_messages;
    DROP TABLE IF EXISTS users;
    
    -- Tabla de usuarios simplificada
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        gender ENUM('masculino', 'femenino', 'otro', 'prefiero_no_decir') NOT NULL,
        remember_token VARCHAR(255) NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    
    -- Tabla de mensajes de amor guardados
    CREATE TABLE love_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    
    -- Tabla de fechas especiales personalizadas
    CREATE TABLE custom_dates (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        icon VARCHAR(10) DEFAULT '💕',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    
    -- Tabla de estadísticas de usuario
    CREATE TABLE user_stats (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        quotes_read INT DEFAULT 0,
        messages_saved INT DEFAULT 0,
        time_spent_minutes INT DEFAULT 0,
        love_calculations INT DEFAULT 0,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    
    -- Crear índices para mejorar el rendimiento
    CREATE INDEX idx_users_email ON users(email);
    CREATE INDEX idx_users_username ON users(username);
    CREATE INDEX idx_users_active ON users(is_active);
    CREATE INDEX idx_users_gender ON users(gender);
    ";
    
    // Ejecutar cada comando SQL por separado
    $commands = explode(';', $sql);
    
    foreach ($commands as $command) {
        $command = trim($command);
        if (!empty($command) && !str_starts_with($command, '--')) {
            try {
                $pdo->exec($command);
            } catch (PDOException $e) {
                // Ignorar errores de DROP TABLE si las tablas no existen
                if (strpos($e->getMessage(), "doesn't exist") === false) {
                    throw $e;
                }
            }
        }
    }
    
    echo "<p>✅ Tablas creadas exitosamente</p>";
    
    // Crear trigger para estadísticas automáticas
    try {
        $pdo->exec("
        CREATE TRIGGER after_user_insert
        AFTER INSERT ON users
        FOR EACH ROW
        INSERT INTO user_stats (user_id) VALUES (NEW.id)
        ");
        echo "<p>✅ Trigger creado para estadísticas automáticas</p>";
    } catch (PDOException $e) {
        echo "<p>⚠️ Error al crear trigger (no es crítico): " . $e->getMessage() . "</p>";
    }
    
    // Insertar usuario de ejemplo
    $hashedPassword = password_hash('password123', PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("
        INSERT INTO users (username, email, password, gender) 
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE username = username
    ");
    
    $stmt->execute(['maria_amor', 'maria@ejemplo.com', $hashedPassword, 'femenino']);
    echo "<p>✅ Usuario de ejemplo creado</p>";
    
    // Insertar estadísticas iniciales
    $pdo->exec("INSERT IGNORE INTO user_stats (user_id) VALUES (1)");
    echo "<p>✅ Estadísticas iniciales creadas</p>";
    
    // Verificar que todo esté correcto
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    echo "<h3>📊 Resumen de la instalación:</h3>";
    echo "<ul>";
    echo "<li>Tablas creadas: " . implode(', ', $tables) . "</li>";
    
    $stmt = $pdo->query("SELECT COUNT(*) FROM users");
    $userCount = $stmt->fetchColumn();
    echo "<li>Usuarios en la base de datos: {$userCount}</li>";
    echo "</ul>";
    
    echo "<div style='background: #d4edda; padding: 15px; border-radius: 8px; margin: 20px 0;'>";
    echo "<h3>🎉 ¡Instalación Completada!</h3>";
    echo "<p><strong>Credenciales de prueba:</strong></p>";
    echo "<ul>";
    echo "<li><strong>Usuario:</strong> maria_amor</li>";
    echo "<li><strong>Email:</strong> maria@ejemplo.com</li>";
    echo "<li><strong>Contraseña:</strong> password123</li>";
    echo "</ul>";
    echo "<p>Ya puedes usar tu sistema de login romántico. <strong>¡Elimina este archivo por seguridad!</strong></p>";
    echo "</div>";
    
} catch (PDOException $e) {
    echo "<div style='background: #f8d7da; padding: 15px; border-radius: 8px; margin: 20px 0;'>";
    echo "<h3>❌ Error en la instalación</h3>";
    echo "<p><strong>Error:</strong> " . $e->getMessage() . "</p>";
    echo "<p><strong>Soluciones posibles:</strong></p>";
    echo "<ul>";
    echo "<li>Verifica las credenciales de la base de datos</li>";
    echo "<li>Asegúrate de tener permisos para crear tablas</li>";
    echo "<li>Contacta a Clever Cloud si el problema persiste</li>";
    echo "</ul>";
    echo "</div>";
}

echo "<hr>";
echo "<p><em>💕 Una vez que todo funcione correctamente, elimina tanto este archivo como test_connection.php por seguridad.</em></p>";
?>
