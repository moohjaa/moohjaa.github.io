# 🔧 Solución de Problemas de Conexión

## ❌ Error: "No se puede conectar al servidor"

### 🚀 Pasos para Solucionar:

#### **Paso 1: Diagnosticar el Problema**
1. Abre en tu navegador: `tu-dominio.com/test_connection.php`
2. Este archivo te dirá exactamente cuál es el problema

#### **Paso 2: Verificar Credenciales**
Revisa en tu panel de **Clever Cloud**:
- Host MySQL
- Nombre de base de datos  
- Usuario
- Contraseña
- Puerto (usualmente 3306)

#### **Paso 3: Actualizar Credenciales**
Si las credenciales son diferentes, edita el archivo `auth.php` líneas 6-9:
```php
private $host = 'tu-host-clever-cloud';
private $dbname = 'tu-nombre-bd';
private $username = 'tu-usuario';
private $password = 'tu-contraseña';
```

#### **Paso 4: Crear/Configurar Base de Datos**

**Opción A - Automática (Recomendada):**
1. Abre: `tu-dominio.com/setup_database.php`
2. Esto creará todas las tablas automáticamente
3. **¡Elimina el archivo después!**

**Opción B - Manual:**
1. Abre phpMyAdmin en Clever Cloud
2. Importa el archivo `database_simple.sql`

---

## 🔍 Errores Comunes y Soluciones

### 1. **"Access denied for user"**
- ❌ **Problema:** Usuario o contraseña incorrectos
- ✅ **Solución:** Verifica credenciales en Clever Cloud

### 2. **"Unknown database"**  
- ❌ **Problema:** Base de datos no existe
- ✅ **Solución:** Ejecuta `setup_database.php` o crea la BD manualmente

### 3. **"Connection timed out"**
- ❌ **Problema:** Servidor no responde
- ✅ **Solución:** 
  - Verifica el host
  - Clever Cloud podría estar en mantenimiento
  - Revisa tu conexión a internet

### 4. **"Can't connect to MySQL server"**
- ❌ **Problema:** Host o puerto incorrectos  
- ✅ **Solución:** Verifica el host y puerto en Clever Cloud

---

## 📋 Lista de Verificación

- [ ] ✅ Credenciales correctas en `auth.php`
- [ ] ✅ Base de datos existe en Clever Cloud
- [ ] ✅ Tablas creadas (usa `setup_database.php`)
- [ ] ✅ Usuario de prueba funciona
- [ ] ✅ Archivos de diagnóstico eliminados

---

## 🆘 Si Nada Funciona

1. **Contacta a Clever Cloud** - Podría haber un problema del lado del servidor
2. **Verifica el estado** - Revisa si hay mantenimientos programados
3. **Revisa logs** - En el panel de Clever Cloud busca logs de errores

---

## 🔐 Credenciales de Prueba

Una vez que funcione, puedes probar con:
- **Usuario:** `maria_amor`
- **Email:** `maria@ejemplo.com`  
- **Contraseña:** `password123`

---

## ⚠️ Importante

**Después de que todo funcione:**
1. Elimina `test_connection.php`
2. Elimina `setup_database.php`  
3. Elimina este archivo `TROUBLESHOOTING.md`

**¡Estos archivos contienen información sensible!**

---

💕 **¿Necesitas ayuda adicional?** Comparte el resultado de `test_connection.php` para un diagnóstico más específico.
