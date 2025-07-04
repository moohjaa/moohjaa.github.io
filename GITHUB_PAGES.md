# 🚀 Guía de Despliegue en GitHub Pages

## ✅ Pasos para subir tu sistema a GitHub Pages

### 1. Preparar tu repositorio de GitHub

1. **Crear nuevo repositorio** en GitHub
   - Ve a https://github.com y haz clic en "New repository"
   - Nombre sugerido: `sistema-amor` o `romantic-login`
   - Marca como **Public** (necesario para GitHub Pages gratuito)
   - No inicialices con README (ya tienes uno)

### 2. Subir los archivos

**Opción A: Arrastrar y soltar (Fácil)**
1. Ve a tu repositorio en GitHub
2. Haz clic en "uploading an existing file"
3. Arrastra TODOS estos archivos a la vez:
   - `index.html`
   - `dashboard.html`
   - `styles.css`
   - `dashboard.css`
   - `script.js`
   - `dashboard_local.js`
   - `auth_local.js`
   - `README.md`
   - `test.html` (opcional)

**Opción B: Git (Avanzado)**
```bash
git init
git add .
git commit -m "Sistema de amor completo"
git branch -M main
git remote add origin https://github.com/TUUSUARIO/TUREPOSITORIO.git
git push -u origin main
```

### 3. Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (configuración)
3. Baja hasta la sección **Pages**
4. En "Source" selecciona **Deploy from a branch**
5. En "Branch" selecciona **main**
6. En "Folder" deja **/ (root)**
7. Haz clic en **Save**

### 4. ¡Acceder a tu sitio!

Después de 1-5 minutos, tu sitio estará disponible en:
```
https://TUUSUARIO.github.io/TUREPOSITORIO/
```

Por ejemplo: `https://maria123.github.io/sistema-amor/`

## 🧪 Probar el sistema

### Usuario de prueba incluido:
- **Email:** maria@ejemplo.com
- **Contraseña:** password123

### O crear tu propio usuario:
1. Ve a la página principal
2. Haz clic en "Registrarse"
3. Completa: nombre, email, contraseña, género
4. ¡Listo para usar!

## 📱 Funcionalidades que funcionan

✅ **Sistema de autenticación completo**
✅ **Registro de nuevos usuarios**
✅ **Login y logout**
✅ **Dashboard con todas las funciones**
✅ **Calculadora del amor**
✅ **Frases románticas**
✅ **Mensajes guardados**
✅ **Temporizador romántico**
✅ **Fechas especiales**
✅ **Estadísticas personales**
✅ **Responsive design**

## ⚠️ Consideraciones importantes

### ✅ Lo que funciona en GitHub Pages:
- Todo el sistema de login/register
- Almacenamiento de datos en el navegador
- Todas las funcionalidades del dashboard
- Responsive design completo

### ❌ Limitaciones de GitHub Pages:
- Los datos solo se guardan en el navegador del usuario
- No hay base de datos centralizada
- Si el usuario borra caché, pierde sus datos
- No hay backup automático de datos

### 🔒 Seguridad básica:
- Las contraseñas se guardan hasheadas
- Sesiones manejadas localmente
- Apropiado para demos y prototipos
- Para producción real, considera un backend

## 🎨 Personalización

### Cambiar el título:
En `index.html` línea 6:
```html
<title>💕 TU TÍTULO AQUÍ 💕</title>
```

### Cambiar colores:
En `styles.css` y `dashboard.css`, busca y cambia:
```css
#ff6b9d  /* Rosa principal */
#ff8fab  /* Rosa secundario */
#ffa5ba  /* Rosa claro */
```

### Agregar más frases:
En `dashboard_local.js`, edita el array `this.quotes`

## 🆘 Solución de problemas

### "Mi sitio no carga"
- Espera 5-10 minutos después de activar Pages
- Verifica que todos los archivos estén subidos
- Revisa que el repositorio sea público

### "Los estilos no se ven"
- Verifica que `styles.css` y `dashboard.css` estén subidos
- Asegúrate de tener conexión a internet (para FontAwesome)

### "El dashboard no funciona"
- Verifica que `auth_local.js` esté subido
- Verifica que `dashboard_local.js` esté subido
- Abre las herramientas de desarrollador (F12) para ver errores

### "Los datos no se guardan"
- Verifica que no estés en modo incógnito
- Algunos navegadores bloquean localStorage en `file://`
- Usa la URL de GitHub Pages, no abras archivos localmente

## 🎉 ¡Listo!

Tu sistema de amor ya está en línea y funcionando. Comparte la URL con quien quieras:

**Tu sitio:** `https://TUUSUARIO.github.io/TUREPOSITORIO/`

### Para testing rápido:
1. Ve a tu sitio
2. Haz clic en "Registrarse"
3. Crea una cuenta
4. Explora el dashboard
5. ¡Disfruta tu sistema romántico!

---

**💕 ¡Que el amor digital te acompañe siempre! ✨**
