<?php
// setup_local_database.php - Script para configurar la base de datos local

echo "<h1>🗄️ Configuración de Base de Datos Local</h1>";
echo "<p>Este script configurará automáticamente tu base de datos MySQL local.</p>";

// Configuración para XAMPP/WAMP local
$host = 'localhost';
$port = 3306;
$username = 'root';
$password = '';
$dbname = 'love_database';

try {
    // Conectar a MySQL sin especificar base de datos
    $pdo = new PDO("mysql:host=$host;port=$port;charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    
    echo "<p style='color: green'>✅ Conexión a MySQL exitosa</p>";
    
    // Crear la base de datos si no existe
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    echo "<p style='color: green'>✅ Base de datos '$dbname' creada/verificada</p>";
    
    // Conectar a la base de datos específica
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    
    // Leer y ejecutar el script SQL
    $sqlFile = 'database_simple.sql';
    if (file_exists($sqlFile)) {
        $sql = file_get_contents($sqlFile);
        
        // Dividir en declaraciones individuales
        $statements = explode(';', $sql);
        
        foreach ($statements as $statement) {
            $statement = trim($statement);
            if (!empty($statement) && !str_starts_with($statement, '--')) {
                try {
                    $pdo->exec($statement);
                } catch (PDOException $e) {
                    // Ignorar errores de "tabla ya existe"
                    if (strpos($e->getMessage(), 'already exists') === false) {
                        echo "<p style='color: orange'>⚠️ Error en statement: " . $e->getMessage() . "</p>";
                    }
                }
            }
        }
        
        echo "<p style='color: green'>✅ Script SQL ejecutado exitosamente</p>";
    } else {
        echo "<p style='color: red'>❌ Archivo database_simple.sql no encontrado</p>";
    }
    
    // Verificar que las tablas se crearon
    $result = $pdo->query("SHOW TABLES");
    $tables = $result->fetchAll(PDO::FETCH_COLUMN);
    
    echo "<h3>📊 Tablas creadas:</h3>";
    echo "<ul>";
    foreach ($tables as $table) {
        echo "<li>$table</li>";
    }
    echo "</ul>";
    
    // Verificar usuario de ejemplo
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM users");
    $userCount = $stmt->fetch()['count'];
    
    echo "<p><strong>👥 Usuarios en la base de datos: $userCount</strong></p>";
    
    if ($userCount > 0) {
        $stmt = $pdo->query("SELECT username, email, gender FROM users LIMIT 5");
        $users = $stmt->fetchAll();
        
        echo "<h3>👤 Usuarios de ejemplo:</h3>";
        echo "<ul>";
        foreach ($users as $user) {
            echo "<li>{$user['username']} ({$user['email']}) - {$user['gender']}</li>";
        }
        echo "</ul>";
    }
    
    echo "<hr>";
    echo "<h2>🎉 ¡Configuración Completa!</h2>";
    echo "<p>Tu base de datos está lista. Ahora puedes:</p>";
    echo "<ol>";
    echo "<li>Ir a <a href='index.html'>index.html</a> para probar el sistema</li>";
    echo "<li>Usar el usuario de ejemplo: <strong>maria@ejemplo.com</strong> / <strong>password123</strong></li>";
    echo "<li>O registrar un nuevo usuario</li>";
    echo "</ol>";
    
    echo "<h3>📝 Configuración de Conexión:</h3>";
    echo "<ul>";
    echo "<li><strong>Host:</strong> $host</li>";
    echo "<li><strong>Puerto:</strong> $port</li>";
    echo "<li><strong>Base de datos:</strong> $dbname</li>";
    echo "<li><strong>Usuario:</strong> $username</li>";
    echo "<li><strong>Contraseña:</strong> " . (empty($password) ? '(vacía)' : '[configurada]') . "</li>";
    echo "</ul>";
    
} catch (PDOException $e) {
    echo "<p style='color: red'>❌ Error de conexión: " . $e->getMessage() . "</p>";
    echo "<h3>🔧 Posibles soluciones:</h3>";
    echo "<ul>";
    echo "<li>Asegúrate de que XAMPP/WAMP esté ejecutándose</li>";
    echo "<li>Verifica que MySQL esté iniciado</li>";
    echo "<li>Comprueba que el puerto 3306 esté disponible</li>";
    echo "<li>Si usas MAMP, el puerto podría ser 8889</li>";
    echo "</ul>";
}
?>

<style>
body {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
    min-height: 100vh;
}

h1, h2, h3 {
    color: #333;
}

p, li {
    line-height: 1.6;
}

ul {
    background: rgba(255,255,255,0.9);
    padding: 15px;
    border-radius: 10px;
    margin: 10px 0;
}

hr {
    border: none;
    height: 2px;
    background: linear-gradient(to right, #ff6b9d, #ff8fab);
    margin: 30px 0;
}
</style>
