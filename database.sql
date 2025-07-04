-- Base de datos para el sistema de login/register romántico
-- Ejecuta este script en tu MySQL/phpMyAdmin

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS love_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos
USE love_database;

-- Tabla de usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    birthdate DATE,
    password VARCHAR(255) NOT NULL,
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

-- Tabla de sesiones de usuario
CREATE TABLE user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    session_end TIMESTAMP NULL,
    duration_minutes INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active);
CREATE INDEX idx_love_messages_user ON love_messages(user_id);
CREATE INDEX idx_custom_dates_user ON custom_dates(user_id);
CREATE INDEX idx_user_stats_user ON user_stats(user_id);
CREATE INDEX idx_user_sessions_user ON user_sessions(user_id);

-- Insertar algunos datos de ejemplo (opcional)
-- Usuario de ejemplo (contraseña: password123)
INSERT INTO users (name, lastname, email, phone, birthdate, password) VALUES 
(
    'María', 
    'González', 
    'maria@ejemplo.com', 
    '+1234567890', 
    '1990-05-15', 
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
);

-- Estadísticas iniciales para el usuario de ejemplo
INSERT INTO user_stats (user_id) VALUES (1);

-- Fechas especiales de ejemplo
INSERT INTO custom_dates (user_id, name, date, icon) VALUES 
(1, 'Nuestro Aniversario', '2024-12-25', '💍'),
(1, 'Primera Cita', '2024-06-14', '💕'),
(1, 'Cumpleaños de mi Amor', '2024-08-20', '🎂');

-- Mensajes de amor de ejemplo
INSERT INTO love_messages (user_id, message) VALUES 
(1, 'Eres la luz que ilumina mis días más oscuros 💕'),
(1, 'Cada momento contigo es un regalo del cielo ✨'),
(1, 'Tu sonrisa es mi lugar favorito en el mundo 😊💖');

-- Crear vista para obtener información completa del usuario
CREATE VIEW user_complete_info AS
SELECT 
    u.id,
    u.name,
    u.lastname,
    u.email,
    u.phone,
    u.birthdate,
    u.is_active,
    u.created_at,
    u.last_login,
    s.quotes_read,
    s.messages_saved,
    s.time_spent_minutes,
    s.love_calculations
FROM users u
LEFT JOIN user_stats s ON u.id = s.user_id
WHERE u.is_active = TRUE;

-- Procedimiento almacenado para actualizar estadísticas
DELIMITER //
CREATE PROCEDURE UpdateUserStats(
    IN p_user_id INT,
    IN p_quotes_read INT DEFAULT 0,
    IN p_messages_saved INT DEFAULT 0,
    IN p_time_spent_minutes INT DEFAULT 0,
    IN p_love_calculations INT DEFAULT 0
)
BEGIN
    INSERT INTO user_stats (user_id, quotes_read, messages_saved, time_spent_minutes, love_calculations)
    VALUES (p_user_id, p_quotes_read, p_messages_saved, p_time_spent_minutes, p_love_calculations)
    ON DUPLICATE KEY UPDATE
        quotes_read = quotes_read + p_quotes_read,
        messages_saved = messages_saved + p_messages_saved,
        time_spent_minutes = time_spent_minutes + p_time_spent_minutes,
        love_calculations = love_calculations + p_love_calculations,
        last_updated = CURRENT_TIMESTAMP;
END //
DELIMITER ;

-- Trigger para crear estadísticas automáticamente cuando se registra un usuario
DELIMITER //
CREATE TRIGGER after_user_insert
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    INSERT INTO user_stats (user_id) VALUES (NEW.id);
END //
DELIMITER ;

-- Función para calcular la edad
DELIMITER //
CREATE FUNCTION CalculateAge(birth_date DATE) 
RETURNS INT
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE age INT;
    SET age = YEAR(CURDATE()) - YEAR(birth_date);
    IF (MONTH(CURDATE()) < MONTH(birth_date)) OR 
       (MONTH(CURDATE()) = MONTH(birth_date) AND DAY(CURDATE()) < DAY(birth_date)) THEN
        SET age = age - 1;
    END IF;
    RETURN age;
END //
DELIMITER ;

-- Vista para obtener usuarios con edad calculada
CREATE VIEW users_with_age AS
SELECT 
    *,
    CalculateAge(birthdate) as age
FROM users
WHERE is_active = TRUE;

-- Configuración adicional para la base de datos
SET time_zone = '+00:00';
SET sql_mode = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';

-- Comentarios de documentación
ALTER TABLE users COMMENT = 'Tabla principal de usuarios del sistema romántico';
ALTER TABLE love_messages COMMENT = 'Mensajes de amor guardados por los usuarios';
ALTER TABLE custom_dates COMMENT = 'Fechas especiales personalizadas de cada usuario';
ALTER TABLE user_stats COMMENT = 'Estadísticas de actividad de cada usuario';
ALTER TABLE user_sessions COMMENT = 'Registro de sesiones de usuario';

-- Mostrar información de las tablas creadas
SHOW TABLES;
DESCRIBE users;

-- Verificar que todo se creó correctamente
SELECT 'Base de datos love_database creada exitosamente!' as Status;
