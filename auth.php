<?php
session_start();

// Database configuration - Clever Cloud MySQL
class Database {
    private $host = 'bmqv7xjigycwryut4zca-mysql.services.clever-cloud.com';
    private $dbname = 'bmqv7xjigycwryut4zca';
    private $username = 'usos5vc8fqdjocre';
    private $password = '6Rspbz0HEeA5eXAaErFF';
    private $port = 3306; // Puerto por defecto de MySQL
    private $pdo;
    
    public function __construct() {
        try {
            // Configuración más robusta para Clever Cloud
            $dsn = "mysql:host={$this->host};port={$this->port};dbname={$this->dbname};charset=utf8mb4";
            
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_TIMEOUT => 30, // Timeout de 30 segundos
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4",
                PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false, // Para conexiones SSL
            ];
            
            $this->pdo = new PDO($dsn, $this->username, $this->password, $options);
            
            // Verificar conexión
            $this->pdo->query('SELECT 1');
            
        } catch (PDOException $e) {
            // Log detallado del error
            error_log("Database connection error: " . $e->getMessage());
            
            // Mostrar mensaje más amigable según el tipo de error
            if (strpos($e->getMessage(), 'Access denied') !== false) {
                die("Error de conexión: Credenciales incorrectas. Verifica usuario y contraseña.");
            } elseif (strpos($e->getMessage(), 'Unknown database') !== false) {
                die("Error de conexión: Base de datos no encontrada. Verifica el nombre de la base de datos.");
            } elseif (strpos($e->getMessage(), 'Connection refused') !== false || strpos($e->getMessage(), 'timed out') !== false) {
                die("Error de conexión: No se puede conectar al servidor. Verifica el host y puerto, o revisa tu conexión a internet.");
            } else {
                die("Error de conexión a la base de datos: " . $e->getMessage());
            }
        }
    }
    
    public function getConnection() {
        return $this->pdo;
    }
}

// User authentication class
class Auth {
    private $db;
    
    public function __construct() {
        $this->db = (new Database())->getConnection();
    }
    
    public function register($username, $email, $password, $gender) {
        try {
            // Check if email already exists
            $stmt = $this->db->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            
            if ($stmt->fetch()) {
                return ['success' => false, 'message' => 'Este email ya está registrado. ¿Ya tienes cuenta?'];
            }
            
            // Check if username already exists
            $stmt = $this->db->prepare("SELECT id FROM users WHERE username = ?");
            $stmt->execute([$username]);
            
            if ($stmt->fetch()) {
                return ['success' => false, 'message' => 'Este nombre de usuario ya está en uso. Prueba con otro.'];
            }
            
            // Hash password
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            
            // Insert new user
            $stmt = $this->db->prepare("
                INSERT INTO users (username, email, password, gender, created_at) 
                VALUES (?, ?, ?, ?, NOW())
            ");
            
            $stmt->execute([
                $username, 
                $email, 
                $hashedPassword,
                $gender
            ]);
            
            return ['success' => true, 'message' => 'Usuario registrado exitosamente'];
            
        } catch (PDOException $e) {
            return ['success' => false, 'message' => 'Error al registrar usuario: ' . $e->getMessage()];
        }
    }
    
    public function login($email, $password, $remember = false) {
        try {
            $stmt = $this->db->prepare("SELECT id, username, email, password, gender, is_active FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch();
            
            if (!$user) {
                return ['success' => false, 'message' => 'Email no encontrado'];
            }
            
            if (!$user['is_active']) {
                return ['success' => false, 'message' => 'Cuenta desactivada. Contacta soporte.'];
            }
            
            if (password_verify($password, $user['password'])) {
                // Set session variables
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['username'];
                $_SESSION['user_email'] = $user['email'];
                $_SESSION['user_gender'] = $user['gender'];
                $_SESSION['logged_in'] = true;
                
                // Update last login
                $updateStmt = $this->db->prepare("UPDATE users SET last_login = NOW() WHERE id = ?");
                $updateStmt->execute([$user['id']]);
                
                // Set remember me cookie if requested
                if ($remember) {
                    $token = bin2hex(random_bytes(32));
                    setcookie('remember_token', $token, time() + (86400 * 30), '/', '', false, true); // 30 days
                    
                    // Store token in database
                    $tokenStmt = $this->db->prepare("UPDATE users SET remember_token = ? WHERE id = ?");
                    $tokenStmt->execute([$token, $user['id']]);
                }
                
                return ['success' => true, 'message' => 'Login exitoso'];
            } else {
                return ['success' => false, 'message' => 'Contraseña incorrecta'];
            }
            
        } catch (PDOException $e) {
            return ['success' => false, 'message' => 'Error en el login: ' . $e->getMessage()];
        }
    }
    
    public function logout() {
        // Clear session
        session_destroy();
        
        // Clear remember me cookie
        if (isset($_COOKIE['remember_token'])) {
            setcookie('remember_token', '', time() - 3600, '/');
        }
        
        return ['success' => true, 'message' => 'Logout exitoso'];
    }
    
    public function checkRememberMe() {
        if (isset($_COOKIE['remember_token']) && !isset($_SESSION['logged_in'])) {
            $token = $_COOKIE['remember_token'];
            
            $stmt = $this->db->prepare("SELECT id, username, email, gender FROM users WHERE remember_token = ? AND is_active = 1");
            $stmt->execute([$token]);
            $user = $stmt->fetch();
            
            if ($user) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['username'];
                $_SESSION['user_email'] = $user['email'];
                $_SESSION['user_gender'] = $user['gender'];
                $_SESSION['logged_in'] = true;
                
                return true;
            } else {
                // Invalid token, clear cookie
                setcookie('remember_token', '', time() - 3600, '/');
            }
        }
        
        return false;
    }
}

// Handle AJAX requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
        exit;
    }
    
    $auth = new Auth();
    
    switch ($input['action']) {
        case 'register':
            $username = trim($input['username'] ?? '');
            $email = trim($input['email'] ?? '');
            $password = $input['password'] ?? '';
            $gender = $input['gender'] ?? '';
            
            // Server-side validation
            if (empty($username) || empty($email) || empty($password) || empty($gender)) {
                echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios']);
                exit;
            }
            
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                echo json_encode(['success' => false, 'message' => 'Email inválido']);
                exit;
            }
            
            if (strlen($password) < 6) {
                echo json_encode(['success' => false, 'message' => 'La contraseña debe tener al menos 6 caracteres']);
                exit;
            }
            
            if (strlen($username) < 3) {
                echo json_encode(['success' => false, 'message' => 'El nombre de usuario debe tener al menos 3 caracteres']);
                exit;
            }
            
            $validGenders = ['masculino', 'femenino', 'otro', 'prefiero_no_decir'];
            if (!in_array($gender, $validGenders)) {
                echo json_encode(['success' => false, 'message' => 'Género no válido']);
                exit;
            }
            
            $result = $auth->register($username, $email, $password, $gender);
            echo json_encode($result);
            break;
            
        case 'login':
            $email = trim($input['email'] ?? '');
            $password = $input['password'] ?? '';
            $remember = $input['remember'] ?? false;
            
            if (empty($email) || empty($password)) {
                echo json_encode(['success' => false, 'message' => 'Email y contraseña son obligatorios']);
                exit;
            }
            
            $result = $auth->login($email, $password, $remember);
            echo json_encode($result);
            break;
            
        case 'logout':
            $result = $auth->logout();
            echo json_encode($result);
            break;
            
        default:
            echo json_encode(['success' => false, 'message' => 'Acción no válida']);
            break;
    }
    exit;
}

// Check for remember me cookie on page load
$auth = new Auth();
$auth->checkRememberMe();

// Redirect if already logged in
if (isset($_SESSION['logged_in']) && $_SESSION['logged_in']) {
    header('Location: dashboard.php');
    exit;
}
?>
