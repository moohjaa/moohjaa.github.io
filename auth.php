<?php
session_start();

// Database configuration - AQUÍ NECESITARÁS PONER TUS DATOS DE BASE DE DATOS
class Database {
    private $host = 'bmqv7xjigycwryut4zca-mysql.services.clever-cloud.com';
    private $dbname = 'bmqv7xjigycwryut4zca'; // Nombre de tu base de datos
    private $username = 'usos5vc8fqdjocre'; // Tu usuario de base de datos
    private $password = '6Rspbz0HEeA5eXAaErFF'; // Tu contraseña de base de datos
    private $pdo;
    
    public function __construct() {
        try {
            $this->pdo = new PDO(
                "mysql:host={$this->host};dbname={$this->dbname};charset=utf8mb4",
                $this->username,
                $this->password,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false
                ]
            );
        } catch (PDOException $e) {
            die("Error de conexión: " . $e->getMessage());
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
    
    public function register($name, $lastname, $email, $phone, $birthdate, $password) {
        try {
            // Check if email already exists
            $stmt = $this->db->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            
            if ($stmt->fetch()) {
                return ['success' => false, 'message' => 'Este email ya está registrado. ¿Ya tienes cuenta?'];
            }
            
            // Hash password
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            
            // Insert new user
            $stmt = $this->db->prepare("
                INSERT INTO users (name, lastname, email, phone, birthdate, password, created_at) 
                VALUES (?, ?, ?, ?, ?, ?, NOW())
            ");
            
            $stmt->execute([
                $name, 
                $lastname, 
                $email, 
                $phone, 
                $birthdate, 
                $hashedPassword
            ]);
            
            return ['success' => true, 'message' => 'Usuario registrado exitosamente'];
            
        } catch (PDOException $e) {
            return ['success' => false, 'message' => 'Error al registrar usuario: ' . $e->getMessage()];
        }
    }
    
    public function login($email, $password, $remember = false) {
        try {
            $stmt = $this->db->prepare("SELECT id, name, lastname, email, password, is_active FROM users WHERE email = ?");
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
                $_SESSION['user_name'] = $user['name'];
                $_SESSION['user_lastname'] = $user['lastname'];
                $_SESSION['user_email'] = $user['email'];
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
            
            $stmt = $this->db->prepare("SELECT id, name, lastname, email FROM users WHERE remember_token = ? AND is_active = 1");
            $stmt->execute([$token]);
            $user = $stmt->fetch();
            
            if ($user) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['name'];
                $_SESSION['user_lastname'] = $user['lastname'];
                $_SESSION['user_email'] = $user['email'];
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
            $name = trim($input['name'] ?? '');
            $lastname = trim($input['lastname'] ?? '');
            $email = trim($input['email'] ?? '');
            $phone = trim($input['phone'] ?? '');
            $birthdate = $input['birthdate'] ?? '';
            $password = $input['password'] ?? '';
            
            // Server-side validation
            if (empty($name) || empty($lastname) || empty($email) || empty($password)) {
                echo json_encode(['success' => false, 'message' => 'Todos los campos son obligatorios']);
                exit;
            }
            
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                echo json_encode(['success' => false, 'message' => 'Email inválido']);
                exit;
            }
            
            if (strlen($password) < 8) {
                echo json_encode(['success' => false, 'message' => 'La contraseña debe tener al menos 8 caracteres']);
                exit;
            }
            
            $result = $auth->register($name, $lastname, $email, $phone, $birthdate, $password);
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
