-- Base de datos simplificada para el sistema de login/register romántico
-- Ejecuta este script en tu MySQL/phpMyAdmin

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS love_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos
USE love_database;

-- Eliminar tablas si existen (para empezar limpio)
DROP TABLE IF EXISTS user_sessions;
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

-- Insertar usuario de ejemplo (opcional)
-- Usuario: maria_amor, Email: maria@ejemplo.com, Contraseña: password123
INSERT INTO users (username, email, password, gender) VALUES 
(
    'maria_amor', 
    'maria@ejemplo.com', 
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'femenino'
);

-- Estadísticas iniciales para el usuario de ejemplo
INSERT INTO user_stats (user_id) VALUES (1);

-- Trigger para crear estadísticas automáticamente cuando se registra un usuario
DELIMITER //
CREATE TRIGGER after_user_insert
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    INSERT INTO user_stats (user_id) VALUES (NEW.id);
END //
DELIMITER ;

-- Comentarios de documentación
ALTER TABLE users COMMENT = 'Tabla principal de usuarios del sistema romántico';
ALTER TABLE love_messages COMMENT = 'Mensajes de amor guardados por los usuarios';
ALTER TABLE custom_dates COMMENT = 'Fechas especiales personalizadas de cada usuario';
ALTER TABLE user_stats COMMENT = 'Estadísticas de actividad de cada usuario';

-- Verificar que todo se creó correctamente
SELECT 'Base de datos love_database creada exitosamente!' as Status;
SELECT COUNT(*) as 'Usuarios creados' FROM users;

-- Mostrar estructura de la tabla principal
DESCRIBE users;
