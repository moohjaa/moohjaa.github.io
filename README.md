# 💕 Sistema de Login/Register Romántico 💕

Un sistema completo de autenticación con temática romántica que funciona 100% en el frontend usando HTML, CSS y JavaScript puro. Perfecto para ser desplegado en GitHub Pages.

## ✨ Características

### 🔐 Sistema de Autenticación
- **Registro** con nombre de usuario, email, contraseña y género
- **Login** con recordar usuario
- **Logout** seguro
- **Validación** completa de formularios
- **Almacenamiento local** usando localStorage y sessionStorage

### 💖 Dashboard Romántico
- **Bienvenida personalizada** con datos del usuario
- **Calculadora del amor** con algoritmo de compatibilidad
- **Frases románticas diarias** con colección rotativa
- **Mensajes de amor** para guardar y compartir
- **Temporizador romántico** para medir tiempo juntos
- **Calendario de fechas especiales** con countdowns
- **Estadísticas del amor** personalizadas
- **Fechas personalizadas** para aniversarios

### 🎨 Diseño
- **Tema romántico** con gradientes y colores suaves
- **Animaciones fluidas** con corazones flotantes
- **Responsive design** para móviles y desktop
- **Iconos FontAwesome** para mejor experiencia
- **Tipografía romántica** con Google Fonts

## 🚀 Instalación y Uso

### Para GitHub Pages (Recomendado)

1. **Subir archivos** a tu repositorio de GitHub
2. **Activar GitHub Pages** en Settings → Pages
3. **Acceder** a tu sitio en `https://tuusuario.github.io/tu-repositorio`

### Para servidor local

1. **Descargar** todos los archivos
2. **Abrir** `index.html` en tu navegador
3. ¡Listo! El sistema funciona sin servidor

## � Estructura de Archivos

```
├── index.html              # Página principal (login/register)
├── dashboard.html           # Dashboard después del login
├── styles.css              # Estilos de la página principal
├── dashboard.css           # Estilos del dashboard
├── script.js               # Lógica de la página principal
├── dashboard_local.js      # Lógica del dashboard
├── auth_local.js           # Sistema de autenticación local
└── README.md               # Este archivo
```

## 🔧 Funcionalidades Detalladas

### Sistema de Autenticación
- **Sin backend**: Todo funciona en el navegador
- **Seguridad básica**: Hash simple de contraseñas
- **Persistencia**: Los datos se guardan en localStorage
- **Sesiones**: Manejo con sessionStorage

### Dashboard
- **Usuario de prueba**: maria@ejemplo.com / password123
- **Calculadora del amor**: Algoritmo basado en nombres
- **15 frases románticas** en rotación
- **15 mensajes predefinidos** para inspiración
- **Temporizador**: Cronómetro para tiempo juntos
- **Fechas especiales**: San Valentín, Día de la Madre, etc.

### Datos que se Almacenan
- **Usuarios**: username, email, password (hasheado), género
- **Sesiones**: datos del usuario logueado
- **Estadísticas**: mensajes guardados, frases leídas, tiempo gastado
- **Mensajes**: hasta 10 mensajes guardados por usuario
- **Fechas personalizadas**: eventos importantes del usuario

## 💝 Campos del Registro

El sistema pide únicamente estos campos:
- ✅ **Nombre de usuario** (mínimo 3 caracteres)
- ✅ **Email** (validación de formato)
- ✅ **Contraseña** (mínimo 6 caracteres)
- ✅ **Género** (Femenino, Masculino, Otro, Prefiero no decir)

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos, animaciones y responsive design
- **JavaScript ES6+**: Lógica de aplicación y manejo de datos
- **LocalStorage**: Persistencia de datos sin servidor
- **SessionStorage**: Manejo de sesiones
- **Google Fonts**: Tipografía (Dancing Script, Poppins)
- **FontAwesome**: Iconografía completa

## 🎯 Uso en GitHub Pages

Este sistema está específicamente optimizado para GitHub Pages:

1. **No requiere servidor** backend
2. **No usa bases de datos** externas
3. **Todos los datos** se almacenan localmente
4. **Funciona inmediatamente** al subir los archivos

## 🗄️ Uso con Base de Datos MySQL (Opcional)

Para usar con servidor y base de datos real:

### Configuración Rápida:
1. **XAMPP Local:** Ejecutar `setup_local_database.php`
2. **Servidor:** Configurar `db_config.php` y subir archivos PHP
3. **Verificación:** Usar `test_connection_new.php` para diagnóstico

### Archivos adicionales para servidor:
- `auth.php` - Backend de autenticación
- `db_config.php` - Configuración de base de datos
- `database_simple.sql` - Script de base de datos
- `setup_local_database.php` - Configuración automática
- `test_connection_new.php` - Diagnóstico de conexión
- `DATABASE_SETUP.md` - Guía completa de configuración

El sistema **detecta automáticamente** si PHP está disponible y alterna entre modo local y servidor.

### ⚠️ Consideraciones

- Los datos solo existen en el navegador del usuario
- Al limpiar cache/datos del navegador se pierden los datos
- Para uso en producción, considera implementar un backend real
- La seguridad es básica, apropiada para demos y prototipos

## 🔄 Flujo de Usuario

1. **Llegada** → `index.html` (login/register)
2. **Registro** → Crear cuenta con los 4 campos requeridos
3. **Login** → Acceder con email y contraseña
4. **Dashboard** → `dashboard.html` con todas las funcionalidades
5. **Navegación** → Usar las funciones del dashboard
6. **Logout** → Volver a `index.html`

## 💡 Personalización

### Cambiar Colores
Edita las variables CSS en `styles.css` y `dashboard.css`:
```css
:root {
  --primary-color: #ff6b9d;
  --secondary-color: #ff8fab;
  --accent-color: #ffa5ba;
}
```

### Agregar Frases
En `dashboard_local.js`, edita el array `this.quotes`:
```javascript
this.quotes = [
    "Tu nueva frase romántica aquí - Autor",
    // ... más frases
];
```

### Modificar Mensajes
En `dashboard_local.js`, edita el array `this.romanticMessages`:
```javascript
this.romanticMessages = [
    "Tu nuevo mensaje romántico aquí 💕",
    // ... más mensajes
];
```

## 🆘 Solución de Problemas

### El dashboard no carga
- Verifica que `auth_local.js` se carga antes que `dashboard_local.js`
- Revisa la consola del navegador para errores

### Los datos no se guardan
- Verifica que el navegador permite localStorage
- No uses modo incógnito/privado
- Revisa la configuración de cookies/almacenamiento

### Errores de CSS/JS
- Verifica que todos los archivos estén en la misma carpeta
- Revisa que las rutas en el HTML sean correctas
- Asegúrate de tener conexión para FontAwesome y Google Fonts

## 📱 Compatibilidad

- ✅ **Chrome** 60+
- ✅ **Firefox** 55+
- ✅ **Safari** 11+
- ✅ **Edge** 79+
- ✅ **Mobile** iOS Safari, Android Chrome

## 🎉 ¡Disfruta tu Sistema de Amor!

Este proyecto está diseñado para ser simple, funcional y romántico. Perfect para prototipos, demos o como base para un proyecto más grande.

**¡Que el amor esté contigo!** 💕✨
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
