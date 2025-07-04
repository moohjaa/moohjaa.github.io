# 💕 Sistema de Login/Register Romántico 💕

Un hermoso sistema de autenticación con temática romántica y amorosa, perfecto para aplicaciones de citas, aniversarios o cualquier proyecto que necesite un toque de amor.

## ✨ Características

- 🌹 **Diseño Romántico**: Interfaz hermosa con temática de amor
- 💖 **Login/Register**: Sistema completo de autenticación
- 🎨 **Animaciones**: Corazones flotantes y efectos visuales
- 📱 **Responsive**: Funciona perfectamente en móviles y desktop
- 🔐 **Seguridad**: Hash de contraseñas y sesiones seguras
- 💝 **Dashboard**: Panel de usuario con funciones románticas
- 🗄️ **Base de Datos**: Sistema completo con MySQL

## 🚀 Instalación

### Requisitos
- Servidor web (Apache/Nginx)
- PHP 7.4 o superior
- MySQL 5.7 o superior
- Navegador moderno

### Pasos de Instalación

1. **Clonar/Descargar los archivos**
   ```bash
   # Coloca todos los archivos en tu directorio web
   ```

2. **Configurar la Base de Datos**
   - Abre phpMyAdmin o tu cliente MySQL
   - Importa el archivo `database.sql`
   - O ejecuta el script manualmente

3. **Configurar Conexión a BD**
   - Abre `auth.php`
   - Modifica las credenciales de base de datos:
   ```php
   private $host = 'localhost';        // Tu host
   private $dbname = 'love_database';  // Nombre de tu BD
   private $username = 'tu_usuario';   // Tu usuario
   private $password = 'tu_contraseña'; // Tu contraseña
   ```

4. **Subir Archivos**
   - Sube todos los archivos a tu servidor web
   - Asegúrate de que PHP tenga permisos de lectura/escritura

5. **Acceder a la Aplicación**
   - Navega a `tu-dominio.com/index.html`
   - ¡Disfruta del amor digital! 💕

## 📁 Estructura de Archivos

```
📦 Sistema Romántico
├── 🌐 index.html          # Página principal (Login/Register)
├── 🎨 styles.css          # Estilos románticos principales
├── ⚡ script.js           # JavaScript del frontend
├── 🔐 auth.php            # Backend de autenticación
├── 🏠 dashboard.php       # Panel de usuario
├── 🎨 dashboard.css       # Estilos del dashboard
├── ⚡ dashboard.js        # JavaScript del dashboard
├── 🗄️ database.sql        # Script de base de datos
└── 📖 README.md           # Este archivo
```

## 🎯 Funcionalidades

### 🌟 Página Principal
- **Login romántico** con validación
- **Registro completo** con validación
- **Recordar usuario** con cookies seguras
- **Animaciones de corazones** flotantes
- **Efectos visuales** románticos

### 💖 Dashboard de Usuario
- **Frases románticas** diarias
- **Calculadora del amor** divertida
- **Mensajes de amor** personalizados
- **Temporizador romántico** para tiempo juntos
- **Calendario de fechas especiales**
- **Estadísticas del amor**
- **Fechas personalizadas**

### 🔒 Seguridad
- Contraseñas hasheadas con `password_hash()`
- Validación tanto frontend como backend
- Protección contra inyección SQL con PDO
- Sesiones seguras
- Tokens de "recordar usuario"

## 🗄️ Base de Datos

### Tablas Principales
- **users**: Información de usuarios
- **love_messages**: Mensajes guardados
- **custom_dates**: Fechas especiales
- **user_stats**: Estadísticas de actividad
- **user_sessions**: Registro de sesiones

### Usuario de Ejemplo
- **Email**: `maria@ejemplo.com`
- **Contraseña**: `password123`

## 🎨 Personalización

### Colores Románticos
```css
/* Colores principales */
--primary-pink: #ff6b9d;
--secondary-pink: #ff8fab;
--light-pink: #ffc1cc;
--gradient: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
```

### Fuentes
- **Títulos**: Dancing Script (cursiva romántica)
- **Texto**: Poppins (moderna y legible)

## 📱 Responsive Design

El sistema está completamente optimizado para:
- 📱 **Móviles** (320px+)
- 📱 **Tablets** (768px+)
- 💻 **Desktop** (1024px+)
- 🖥️ **Large screens** (1200px+)

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6
- **Backend**: PHP 7.4+
- **Base de Datos**: MySQL 5.7+
- **Estilos**: CSS Grid, Flexbox, Animations
- **Iconos**: Font Awesome 6
- **Fuentes**: Google Fonts

## 🔧 Configuración Avanzada

### Personalizar Mensajes
Edita el array `romanticMessages` en `dashboard.js`:
```javascript
const romanticMessages = [
    "Tu mensaje romántico personalizado 💕",
    // Agregar más mensajes...
];
```

### Agregar Frases
Modifica el array `romanticQuotes` en `dashboard.js`:
```javascript
const romanticQuotes = [
    {
        text: "Tu frase romántica",
        author: "Autor"
    }
];
```

## 🐛 Solución de Problemas

### Error de Conexión a BD
1. Verifica credenciales en `auth.php`
2. Asegúrate de que MySQL esté ejecutándose
3. Confirma que la base de datos existe

### Problemas de Sesión
1. Verifica que `session_start()` funcione
2. Checa permisos de archivo
3. Asegúrate de que cookies estén habilitadas

### Estilos no Cargan
1. Verifica rutas de archivos CSS
2. Checa permisos de archivos
3. Confirma que el servidor sirva archivos CSS

## 📈 Futuras Mejoras

- 🔄 **Integración con redes sociales**
- 📧 **Sistema de emails románticos**
- 🎵 **Reproductor de música romántica**
- 📸 **Galería de fotos de pareja**
- 🎮 **Juegos románticos**
- 🌍 **Múltiples idiomas**

## 💝 Contribuir

¡Las contribuciones son bienvenidas! Si tienes ideas románticas:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📜 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para detalles.

## 💕 Créditos

Creado con mucho amor para hacer del mundo digital un lugar más romántico.

### Iconos y Fuentes
- [Font Awesome](https://fontawesome.com/) - Iconos
- [Google Fonts](https://fonts.google.com/) - Tipografías

---

**¡Que el amor digital florezca! 💖✨**

*Para soporte o preguntas, no dudes en contactar. ¡Hagamos del mundo un lugar más amoroso, un código a la vez!* 🌹
