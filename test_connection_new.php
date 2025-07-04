<?php
// test_connection.php - Prueba completa de conexión a la base de datos

echo "<h1>🔍 Prueba de Conexión a Base de Datos</h1>";

// Configuración de conexión
$configs = [
    'local' => [
        'host' => 'localhost',
        'dbname' => 'love_database',
        'username' => 'root',
        'password' => '',
        'port' => 3306
    ],
    'production' => [
        'host' => 'bmqv7xjigycwryut4zca-mysql.services.clever-cloud.com',
        'dbname' => 'bmqv7xjigycwryut4zca',
        'username' => 'usos5vc8fqdjocre',
        'password' => '6Rspbz0HEeA5eXAaErFF',
        'port' => 3306
    ]
];

// Detectar entorno
$isLocal = ($_SERVER['HTTP_HOST'] === 'localhost' || $_SERVER['HTTP_HOST'] === '127.0.0.1');
$config = $isLocal ? $configs['local'] : $configs['production'];
$environment = $isLocal ? 'Local (XAMPP/WAMP)' : 'Producción';

echo "<p><strong>🌍 Entorno detectado:</strong> $environment</p>";
echo "<p><strong>🖥️ Servidor:</strong> {$config['host']}:{$config['port']}</p>";
echo "<p><strong>🗄️ Base de datos:</strong> {$config['dbname']}</p>";
echo "<p><strong>👤 Usuario:</strong> {$config['username']}</p>";

try {
    $dsn = "mysql:host={$config['host']};port={$config['port']};dbname={$config['dbname']};charset=utf8mb4";
    
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_TIMEOUT => 10
    ];
    
    $pdo = new PDO($dsn, $config['username'], $config['password'], $options);
    
    echo "<p style='color: green; font-size: 18px;'>✅ <strong>Conexión exitosa!</strong></p>";
    
    // Verificar tablas
    $result = $pdo->query("SHOW TABLES");
    $tables = $result->fetchAll(PDO::FETCH_COLUMN);
    
    echo "<h3>📊 Tablas encontradas:</h3>";
    if (empty($tables)) {
        echo "<p style='color: orange;'>⚠️ No hay tablas. Ejecuta database_simple.sql</p>";
        echo "<p><a href='setup_local_database.php' style='background: #ff6b9d; color: white; padding: 10px; text-decoration: none; border-radius: 5px;'>🔧 Configurar Base de Datos</a></p>";
    } else {
        echo "<ul>";
        foreach ($tables as $table) {
            echo "<li>$table";
            
            // Contar registros en cada tabla
            try {
                $count = $pdo->query("SELECT COUNT(*) FROM `$table`")->fetchColumn();
                echo " ($count registros)";
            } catch (PDOException $e) {
                echo " (error al contar)";
            }
            
            echo "</li>";
        }
        echo "</ul>";
    }
    
    // Verificar usuarios
    if (in_array('users', $tables)) {
        $stmt = $pdo->query("SELECT COUNT(*) as total FROM users");
        $userCount = $stmt->fetch()['total'];
        
        echo "<h3>👥 Usuarios registrados: $userCount</h3>";
        
        if ($userCount > 0) {
            $stmt = $pdo->query("SELECT username, email, gender, created_at FROM users ORDER BY created_at DESC LIMIT 5");
            $users = $stmt->fetchAll();
            
            echo "<table border='1' cellpadding='10' style='border-collapse: collapse; width: 100%;'>";
            echo "<tr><th>Usuario</th><th>Email</th><th>Género</th><th>Registrado</th></tr>";
            foreach ($users as $user) {
                echo "<tr>";
                echo "<td>{$user['username']}</td>";
                echo "<td>{$user['email']}</td>";
                echo "<td>{$user['gender']}</td>";
                echo "<td>" . date('d/m/Y H:i', strtotime($user['created_at'])) . "</td>";
                echo "</tr>";
            }
            echo "</table>";
        } else {
            echo "<p>🔗 <strong>Usuario de prueba incluido:</strong> maria@ejemplo.com / password123</p>";
        }
    }
    
    echo "<hr>";
    echo "<h3>🎉 ¡Todo funciona correctamente!</h3>";
    echo "<p>Puedes proceder a usar el sistema:</p>";
    echo "<ul>";
    echo "<li><a href='index.html'>🏠 Ir al Sistema Principal</a></li>";
    echo "<li><a href='test.html'>🧪 Página de Pruebas</a></li>";
    echo "</ul>";
    
} catch (PDOException $e) {
    echo "<p style='color: red; font-size: 18px;'>❌ <strong>Error de conexión</strong></p>";
    echo "<p><strong>Error:</strong> " . $e->getMessage() . "</p>";
    
    echo "<h3>🔧 Posibles soluciones:</h3>";
    echo "<ul>";
    
    if (strpos($e->getMessage(), 'Access denied') !== false) {
        echo "<li><strong>Credenciales incorrectas:</strong>";
        echo "<ul>";
        echo "<li>Para XAMPP local: usuario='root', contraseña=''</li>";
        echo "<li>Verificar configuración en db_config.php</li>";
        echo "</ul></li>";
    }
    
    if (strpos($e->getMessage(), 'Unknown database') !== false) {
        echo "<li><strong>Base de datos no existe:</strong>";
        echo "<ul>";
        echo "<li>Crear base de datos 'love_database' en phpMyAdmin</li>";
        echo "<li>O ejecutar <a href='setup_local_database.php'>setup_local_database.php</a></li>";
        echo "</ul></li>";
    }
    
    if (strpos($e->getMessage(), 'Connection refused') !== false) {
        echo "<li><strong>MySQL no está ejecutándose:</strong>";
        echo "<ul>";
        echo "<li>Iniciar MySQL desde XAMPP/WAMP</li>";
        echo "<li>Verificar puerto 3306 (o 8889 en MAMP)</li>";
        echo "</ul></li>";
    }
    
    echo "<li><strong>Verificar:</strong>";
    echo "<ul>";
    echo "<li>XAMPP/WAMP está ejecutándose</li>";
    echo "<li>Apache y MySQL están iniciados</li>";
    echo "<li>Puerto 3306 disponible</li>";
    echo "<li>Configuración en db_config.php</li>";
    echo "</ul></li>";
    echo "</ul>";
    
    if ($isLocal) {
        echo "<h3>📥 Para Desarrollo Local:</h3>";
        echo "<ol>";
        echo "<li>Asegurar que XAMPP/WAMP esté ejecutándose</li>";
        echo "<li>Ir a <a href='http://localhost/phpmyadmin' target='_blank'>phpMyAdmin</a></li>";
        echo "<li>Crear base de datos 'love_database'</li>";
        echo "<li>Importar database_simple.sql</li>";
        echo "<li>O usar <a href='setup_local_database.php'>configuración automática</a></li>";
        echo "</ol>";
    }
}
?>

<style>
body {
    font-family: Arial, sans-serif;
    max-width: 900px;
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

ul, ol {
    background: rgba(255,255,255,0.9);
    padding: 15px;
    border-radius: 10px;
    margin: 10px 0;
}

table {
    background: rgba(255,255,255,0.95);
    border-radius: 10px;
    margin: 15px 0;
}

th {
    background: #ff6b9d;
    color: white;
}

a {
    color: #ff6b9d;
    text-decoration: none;
    font-weight: bold;
}

a:hover {
    text-decoration: underline;
}

hr {
    border: none;
    height: 2px;
    background: linear-gradient(to right, #ff6b9d, #ff8fab);
    margin: 30px 0;
}
</style>
