// config.js - Configuración del sistema para alternar entre local y servidor

class SystemConfig {
    constructor() {
        // Detectar si estamos en un entorno con PHP disponible
        this.hasServerSupport = this.detectServerSupport();
        this.useLocalAuth = !this.hasServerSupport;
        
        console.log(`Sistema iniciado en modo: ${this.useLocalAuth ? 'LOCAL (localStorage)' : 'SERVIDOR (PHP/MySQL)'}`);
    }

    // Detectar si PHP está disponible
    async detectServerSupport() {
        try {
            // Intentar hacer una petición a auth.php
            const response = await fetch('auth.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'test' })
            });
            
            // Si la respuesta es exitosa, PHP está disponible
            return response.ok;
        } catch (error) {
            // Si hay error, probablemente estamos en GitHub Pages o sin servidor
            return false;
        }
    }

    // Obtener el sistema de autenticación apropiado
    getAuthSystem() {
        if (this.useLocalAuth) {
            // Usar sistema local (localStorage)
            return window.romanticAuth;
        } else {
            // Usar sistema servidor (PHP)
            return new ServerAuth();
        }
    }
}

// Clase para manear autenticación con servidor PHP
class ServerAuth {
    async register(username, email, password, gender) {
        try {
            const response = await fetch('auth.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'register',
                    username: username,
                    email: email,
                    password: password,
                    gender: gender
                })
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error en registro:', error);
            return { success: false, message: 'Error de conexión al servidor' };
        }
    }

    async login(email, password, remember = false) {
        try {
            const response = await fetch('auth.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'login',
                    email: email,
                    password: password,
                    remember: remember
                })
            });

            const result = await response.json();
            
            if (result.success) {
                // Crear sesión local para compatibilidad con el dashboard
                const sessionData = {
                    user_id: 1, // Se actualizará con datos reales del servidor
                    user_name: email.split('@')[0], // Placeholder
                    user_email: email,
                    user_gender: 'otro', // Placeholder
                    logged_in: true,
                    loginTime: new Date().toISOString()
                };
                
                sessionStorage.setItem('romantic_session', JSON.stringify(sessionData));
            }
            
            return result;
        } catch (error) {
            console.error('Error en login:', error);
            return { success: false, message: 'Error de conexión al servidor' };
        }
    }

    async logout() {
        try {
            const response = await fetch('auth.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'logout'
                })
            });

            const result = await response.json();
            
            // Limpiar sesión local también
            sessionStorage.removeItem('romantic_session');
            
            return result;
        } catch (error) {
            console.error('Error en logout:', error);
            return { success: false, message: 'Error de conexión al servidor' };
        }
    }

    // Verificar si está logueado (compatible con sistema local)
    isLoggedIn() {
        return this.getCurrentUser() !== null;
    }

    // Obtener usuario actual (compatible con sistema local)
    getCurrentUser() {
        const session = sessionStorage.getItem('romantic_session');
        if (session) {
            return JSON.parse(session);
        }
        return null;
    }
}

// Inicializar configuración global
window.systemConfig = new SystemConfig();
