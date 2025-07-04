// auth_local.js - Sistema de autenticación usando localStorage (sin PHP)

class LocalAuth {
    constructor() {
        this.users = this.getUsers();
        this.currentUser = this.getCurrentUser();
    }

    // Obtener usuarios del localStorage
    getUsers() {
        const users = localStorage.getItem('romantic_users');
        if (!users) {
            // Crear usuario de ejemplo si no existe
            const defaultUsers = [{
                id: 1,
                username: 'maria_amor',
                email: 'maria@ejemplo.com',
                password: this.hashPassword('password123'),
                gender: 'femenino',
                createdAt: new Date().toISOString(),
                isActive: true
            }];
            localStorage.setItem('romantic_users', JSON.stringify(defaultUsers));
            return defaultUsers;
        }
        return JSON.parse(users);
    }

    // Guardar usuarios en localStorage
    saveUsers() {
        localStorage.setItem('romantic_users', JSON.stringify(this.users));
    }

    // Hash simple para contraseñas (en producción usar algo más seguro)
    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convertir a entero de 32 bits
        }
        return hash.toString();
    }

    // Verificar contraseña
    verifyPassword(password, hashedPassword) {
        return this.hashPassword(password) === hashedPassword;
    }

    // Registrar nuevo usuario
    register(username, email, password, gender) {
        // Validaciones
        if (!username || !email || !password || !gender) {
            return { success: false, message: 'Todos los campos son obligatorios' };
        }

        if (username.length < 3) {
            return { success: false, message: 'El nombre de usuario debe tener al menos 3 caracteres' };
        }

        if (password.length < 6) {
            return { success: false, message: 'La contraseña debe tener al menos 6 caracteres' };
        }

        if (!this.validateEmail(email)) {
            return { success: false, message: 'Email inválido' };
        }

        // Verificar si el email ya existe
        if (this.users.find(user => user.email === email)) {
            return { success: false, message: 'Este email ya está registrado. ¿Ya tienes cuenta?' };
        }

        // Verificar si el username ya existe
        if (this.users.find(user => user.username === username)) {
            return { success: false, message: 'Este nombre de usuario ya está en uso. Prueba con otro.' };
        }

        // Crear nuevo usuario
        const newUser = {
            id: this.users.length + 1,
            username: username.trim(),
            email: email.trim().toLowerCase(),
            password: this.hashPassword(password),
            gender: gender,
            createdAt: new Date().toISOString(),
            isActive: true
        };

        this.users.push(newUser);
        this.saveUsers();

        // Crear estadísticas iniciales
        this.createUserStats(newUser.id);

        return { success: true, message: 'Usuario registrado exitosamente' };
    }

    // Iniciar sesión
    login(email, password, remember = false) {
        if (!email || !password) {
            return { success: false, message: 'Email y contraseña son obligatorios' };
        }

        const user = this.users.find(u => u.email === email.toLowerCase() && u.isActive);
        
        if (!user) {
            return { success: false, message: 'Email no encontrado' };
        }

        if (!this.verifyPassword(password, user.password)) {
            return { success: false, message: 'Contraseña incorrecta' };
        }

        // Actualizar último login
        user.lastLogin = new Date().toISOString();
        this.saveUsers();

        // Crear sesión
        const sessionData = {
            user_id: user.id,
            user_name: user.username,
            user_email: user.email,
            user_gender: user.gender,
            logged_in: true,
            loginTime: new Date().toISOString()
        };

        // Guardar sesión
        sessionStorage.setItem('romantic_session', JSON.stringify(sessionData));
        
        if (remember) {
            localStorage.setItem('romantic_remember', JSON.stringify({
                userId: user.id,
                token: this.generateToken()
            }));
        }

        return { success: true, message: 'Login exitoso', user: sessionData };
    }

    // Cerrar sesión
    logout() {
        sessionStorage.removeItem('romantic_session');
        localStorage.removeItem('romantic_remember');
        return { success: true, message: 'Logout exitoso' };
    }

    // Obtener usuario actual
    getCurrentUser() {
        const session = sessionStorage.getItem('romantic_session');
        if (session) {
            return JSON.parse(session);
        }

        // Verificar remember me
        const remember = localStorage.getItem('romantic_remember');
        if (remember) {
            const { userId } = JSON.parse(remember);
            const user = this.users.find(u => u.id === userId && u.isActive);
            if (user) {
                const sessionData = {
                    user_id: user.id,
                    user_name: user.username,
                    user_email: user.email,
                    user_gender: user.gender,
                    logged_in: true
                };
                sessionStorage.setItem('romantic_session', JSON.stringify(sessionData));
                return sessionData;
            }
        }

        return null;
    }

    // Verificar si está logueado
    isLoggedIn() {
        return this.getCurrentUser() !== null;
    }

    // Generar token simple
    generateToken() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }

    // Validar email
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Crear estadísticas de usuario
    createUserStats(userId) {
        const stats = this.getUserStats();
        stats[userId] = {
            quotesRead: 0,
            messagesSaved: 0,
            timeSpentMinutes: 0,
            loveCalculations: 0,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('romantic_stats', JSON.stringify(stats));
    }

    // Obtener estadísticas de usuarios
    getUserStats() {
        const stats = localStorage.getItem('romantic_stats');
        return stats ? JSON.parse(stats) : {};
    }

    // Actualizar estadísticas
    updateStats(userId, updates) {
        const stats = this.getUserStats();
        if (!stats[userId]) {
            this.createUserStats(userId);
        }
        
        Object.assign(stats[userId], updates, {
            lastUpdated: new Date().toISOString()
        });
        
        localStorage.setItem('romantic_stats', JSON.stringify(stats));
    }

    // Obtener mensajes guardados
    getSavedMessages(userId) {
        const messages = localStorage.getItem('romantic_messages');
        if (!messages) return [];
        
        const allMessages = JSON.parse(messages);
        return allMessages.filter(msg => msg.userId === userId);
    }

    // Guardar mensaje
    saveMessage(userId, message) {
        const messages = localStorage.getItem('romantic_messages');
        const allMessages = messages ? JSON.parse(messages) : [];
        
        const newMessage = {
            id: Date.now(),
            userId: userId,
            message: message,
            timestamp: new Date().toISOString()
        };
        
        allMessages.unshift(newMessage);
        
        // Mantener solo los últimos 10 mensajes por usuario
        const userMessages = allMessages.filter(msg => msg.userId === userId);
        if (userMessages.length > 10) {
            const messagesToKeep = allMessages.filter(msg => msg.userId !== userId);
            messagesToKeep.push(...userMessages.slice(0, 10));
            localStorage.setItem('romantic_messages', JSON.stringify(messagesToKeep));
        } else {
            localStorage.setItem('romantic_messages', JSON.stringify(allMessages));
        }
        
        return newMessage;
    }

    // Obtener fechas personalizadas
    getCustomDates(userId) {
        const dates = localStorage.getItem('romantic_dates');
        if (!dates) return [];
        
        const allDates = JSON.parse(dates);
        return allDates.filter(date => date.userId === userId);
    }

    // Agregar fecha personalizada
    addCustomDate(userId, name, date, icon = '💕') {
        const dates = localStorage.getItem('romantic_dates');
        const allDates = dates ? JSON.parse(dates) : [];
        
        const newDate = {
            id: Date.now(),
            userId: userId,
            name: name,
            date: date,
            icon: icon,
            createdAt: new Date().toISOString()
        };
        
        allDates.push(newDate);
        localStorage.setItem('romantic_dates', JSON.stringify(allDates));
        
        return newDate;
    }
}

// Crear instancia global
window.romanticAuth = new LocalAuth();
