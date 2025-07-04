# 🗄️ Configuración de Base de Datos MySQL

## 📋 Opciones Disponibles

Tu sistema tiene **dos modos de funcionamiento**:

### 🌐 Modo GitHub Pages (Sin Base de Datos)
- ✅ **Funciona inmediatamente** al subir a GitHub Pages
- ✅ **No requiere configuración** de base de datos
- ✅ **Datos almacenados localmente** en el navegador del usuario
- ❌ Los datos se pierden si se limpia el caché del navegador

### 🖥️ Modo Servidor (Con Base de Datos MySQL)
- ✅ **Datos persistentes** en base de datos real
- ✅ **Múltiples usuarios** centralizados
- ✅ **Backup y recuperación** de datos
- ❌ Requiere servidor con PHP y MySQL

---

## 🚀 Configuración Rápida para Desarrollo Local

### Paso 1: Instalar XAMPP
1. Descargar [XAMPP](https://www.apachefriends.org/)
2. Instalar y ejecutar
3. Iniciar **Apache** y **MySQL**

### Paso 2: Configurar Base de Datos
**Opción A: Automática (Recomendada)**
1. Ve a `http://localhost/tu-carpeta/setup_local_database.php`
2. El script configurará todo automáticamente

**Opción B: Manual**
1. Ir a `http://localhost/phpmyadmin`
2. Crear base de datos llamada `love_database`
3. Importar el archivo `database_simple.sql`

### Paso 3: Verificar Configuración
1. Editar `db_config.php` si es necesario:
   ```php
   define('DB_HOST_LOCAL', 'localhost');
   define('DB_NAME_LOCAL', 'love_database');
   define('DB_USER_LOCAL', 'root');
   define('DB_PASS_LOCAL', '');
   ```

2. Probar en `http://localhost/tu-carpeta/index.html`

---

## 🌍 Configuración para Servidor en Producción

### 1. Preparar Base de Datos
- Crear base de datos MySQL en tu hosting
- Importar `database_simple.sql`
- Anotar credenciales de conexión

### 2. Configurar Conexión
Editar `db_config.php`:
```php
define('DB_HOST_PROD', 'tu-servidor-mysql.com');
define('DB_NAME_PROD', 'tu_base_de_datos');
define('DB_USER_PROD', 'tu_usuario_mysql');
define('DB_PASS_PROD', 'tu_contraseña_mysql');
```

### 3. Subir Archivos
Subir todos los archivos PHP a tu servidor web.

---

## 🧪 Pruebas y Verificación

### Usuario de Prueba Incluido
- **Email:** maria@ejemplo.com
- **Contraseña:** password123

### Archivos para Diagnóstico
- `test_connection.php` - Probar conexión a base de datos
- `setup_local_database.php` - Configuración automática
- `test.html` - Pruebas del sistema frontend

---

## 🔧 Solución de Problemas Comunes

### "Access denied for user"
- Verificar usuario y contraseña en `db_config.php`
- Para XAMPP local, usuario: `root`, contraseña: (vacía)

### "Unknown database"
- Crear la base de datos `love_database`
- Ejecutar el script `database_simple.sql`

### "Connection refused"
- Verificar que MySQL esté ejecutándose
- Para XAMPP: iniciar MySQL desde el panel de control
- Verificar puerto (3306 por defecto, 8889 en MAMP)

### "Table doesn't exist"
- Importar `database_simple.sql` en phpMyAdmin
- O ejecutar `setup_local_database.php`

---

## 📊 Estructura de la Base de Datos

### Tabla `users`
```sql
- id (INT, AUTO_INCREMENT, PRIMARY KEY)
- username (VARCHAR(100), UNIQUE)
- email (VARCHAR(255), UNIQUE) 
- password (VARCHAR(255), HASHED)
- gender (ENUM: masculino, femenino, otro, prefiero_no_decir)
- created_at (TIMESTAMP)
- last_login (TIMESTAMP)
- is_active (BOOLEAN)
- remember_token (VARCHAR(255))
```

### Otras Tablas Incluidas
- `love_messages` - Mensajes guardados por usuarios
- `custom_dates` - Fechas especiales personalizadas
- `user_stats` - Estadísticas de actividad

---

## 🎯 Recomendaciones

### Para Desarrollo/Pruebas
- Usar **modo local** con XAMPP
- Configurar con `setup_local_database.php`

### Para Demo/Portfolio
- Usar **modo GitHub Pages** (sin base de datos)
- Subir solo archivos HTML/CSS/JS

### Para Producción Real
- Usar **servidor con PHP/MySQL**
- Configurar SSL y seguridad adicional
- Hacer backups regulares

---

## 🆘 Obtener Ayuda

1. **Verificar logs de error** en tu servidor
2. **Consultar documentación** de tu hosting
3. **Probar con archivos de diagnóstico** incluidos
4. **Verificar versiones** PHP 7.4+ y MySQL 5.7+

¡Tu sistema funcionará perfectamente una vez configurado! 💕
