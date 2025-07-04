<?php
// Archivo de prueba de conexión a la base de datos
// test_connection.php

error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h2>🔧 Prueba de Conexión a Base de Datos 🔧</h2>";

// Configuración de la base de datos
$host = 'bmqv7xjigycwryut4zca-mysql.services.clever-cloud.com';
$dbname = 'bmqv7xjigycwryut4zca';
$username = 'usos5vc8fqdjocre';
$password = '6Rspbz0HEeA5eXAaErFF';
$port = 3306;

echo "<p><strong>Configuración actual:</strong></p>";
echo "<ul>";
echo "<li>Host: {$host}</li>";
echo "<li>Puerto: {$port}</li>";
echo "<li>Base de datos: {$dbname}</li>";
echo "<li>Usuario: {$username}</li>";
echo "<li>Contraseña: " . str_repeat('*', strlen($password)) . "</li>";
echo "</ul>";

echo "<hr>";

// Paso 1: Verificar si la extensión PDO está instalada
echo "<h3>📋 Paso 1: Verificando extensiones PHP</h3>";
if (extension_loaded('pdo')) {
    echo "✅ PDO está instalado<br>";
} else {
    echo "❌ PDO NO está instalado<br>";
    die("Error: PDO no está disponible. Contacta a tu proveedor de hosting.");
}

if (extension_loaded('pdo_mysql')) {
    echo "✅ PDO MySQL está instalado<br>";
} else {
    echo "❌ PDO MySQL NO está instalado<br>";
    die("Error: PDO MySQL no está disponible. Contacta a tu proveedor de hosting.");
}

// Paso 2: Verificar si podemos resolver el DNS
echo "<h3>🌐 Paso 2: Verificando DNS</h3>";
$ip = gethostbyname($host);
if ($ip === $host) {
    echo "⚠️ No se pudo resolver el DNS para {$host}<br>";
} else {
    echo "✅ DNS resuelto: {$host} → {$ip}<br>";
}

// Paso 3: Intentar conexión básica
echo "<h3>🔌 Paso 3: Intentando conexión...</h3>";

try {
    $dsn = "mysql:host={$host};port={$port};charset=utf8mb4";
    
    echo "Intentando conectar solo al servidor...<br>";
    
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_TIMEOUT => 10,
        PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false,
    ];
    
    $pdo = new PDO($dsn, $username, $password, $options);
    echo "✅ Conexión al servidor MySQL exitosa<br>";
    
    // Paso 4: Verificar base de datos
    echo "<h3>🗄️ Paso 4: Verificando base de datos</h3>";
    
    try {
        $pdo->exec("USE {$dbname}");
        echo "✅ Base de datos '{$dbname}' encontrada y accesible<br>";
        
        // Paso 5: Verificar tablas
        echo "<h3>📊 Paso 5: Verificando estructura</h3>";
        
        $stmt = $pdo->query("SHOW TABLES");
        $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        if (empty($tables)) {
            echo "⚠️ No hay tablas en la base de datos. Necesitas ejecutar el script SQL.<br>";
            echo "<p><strong>💡 Solución:</strong> Ejecuta el archivo <code>database_simple.sql</code> en phpMyAdmin o tu cliente MySQL.</p>";
        } else {
            echo "✅ Tablas encontradas: " . implode(', ', $tables) . "<br>";
            
            // Verificar tabla users específicamente
            if (in_array('users', $tables)) {
                echo "✅ Tabla 'users' existe<br>";
                
                $stmt = $pdo->query("SELECT COUNT(*) FROM users");
                $count = $stmt->fetchColumn();
                echo "📊 Usuarios en la base de datos: {$count}<br>";
            } else {
                echo "❌ Tabla 'users' no encontrada<br>";
                echo "<p><strong>💡 Solución:</strong> Ejecuta el archivo <code>database_simple.sql</code></p>";
            }
        }
        
    } catch (PDOException $e) {
        echo "❌ Error al acceder a la base de datos '{$dbname}': " . $e->getMessage() . "<br>";
        echo "<p><strong>💡 Posibles soluciones:</strong></p>";
        echo "<ul>";
        echo "<li>Verifica que el nombre de la base de datos sea correcto</li>";
        echo "<li>Asegúrate de que la base de datos exista</li>";
        echo "<li>Verifica los permisos del usuario</li>";
        echo "</ul>";
    }
    
} catch (PDOException $e) {
    echo "❌ Error de conexión: " . $e->getMessage() . "<br>";
    
    $errorMsg = $e->getMessage();
    
    echo "<h3>🔍 Diagnóstico del Error:</h3>";
    
    if (strpos($errorMsg, 'Access denied') !== false) {
        echo "<p>❌ <strong>Error de autenticación</strong></p>";
        echo "<ul>";
        echo "<li>Usuario o contraseña incorrectos</li>";
        echo "<li>Verifica las credenciales en Clever Cloud</li>";
        echo "<li>El usuario podría no tener permisos</li>";
        echo "</ul>";
    } elseif (strpos($errorMsg, 'Unknown database') !== false) {
        echo "<p>❌ <strong>Base de datos no encontrada</strong></p>";
        echo "<ul>";
        echo "<li>El nombre de la base de datos es incorrecto</li>";
        echo "<li>La base de datos no ha sido creada</li>";
        echo "</ul>";
    } elseif (strpos($errorMsg, 'Connection refused') !== false || strpos($errorMsg, 'timed out') !== false) {
        echo "<p>❌ <strong>Error de conectividad</strong></p>";
        echo "<ul>";
        echo "<li>El servidor no está disponible</li>";
        echo "<li>Problemas de red o firewall</li>";
        echo "<li>Host o puerto incorrectos</li>";
        echo "<li>Clever Cloud podría estar en mantenimiento</li>";
        echo "</ul>";
    } else {
        echo "<p>❌ <strong>Error desconocido</strong></p>";
        echo "<p>Mensaje completo: {$errorMsg}</p>";
    }
}

echo "<hr>";
echo "<h3>📋 Próximos pasos recomendados:</h3>";
echo "<ol>";
echo "<li><strong>Si la conexión falla:</strong> Verifica las credenciales en tu panel de Clever Cloud</li>";
echo "<li><strong>Si no hay tablas:</strong> Ejecuta el archivo <code>database_simple.sql</code></li>";
echo "<li><strong>Si todo está bien:</strong> Puedes eliminar este archivo y usar tu aplicación</li>";
echo "</ol>";

echo "<p><em>💕 Una vez que todo funcione, elimina este archivo por seguridad.</em></p>";
?>
