// dashboard_local.js - Lógica del dashboard usando localStorage (sin PHP)

class DashboardManager {
    constructor() {
        this.auth = window.romanticAuth;
        this.currentUser = null;
        this.timer = null;
        this.timerStartTime = null;
        this.timerElapsed = 0;
        this.quotes = [
            "El amor es la única fuerza capaz de transformar a un enemigo en un amigo. - Martin Luther King Jr.",
            "Donde hay amor, hay vida. - Mahatma Gandhi",
            "El amor verdadero nunca tiene fin. - Anónimo",
            "Eres mi persona favorita en todo el universo. - Anónimo",
            "El amor es el puente entre dos corazones. - Anónimo",
            "El mejor amor es aquel que despierta el alma. - Nicholas Sparks",
            "Amar y ser amado es sentir el sol desde ambos lados. - David Viscott",
            "El amor no es mirarse el uno al otro, sino mirar juntos en la misma dirección. - Antoine de Saint-Exupéry",
            "En el amor verdadero es el alma la que envuelve al cuerpo. - Friedrich Nietzsche",
            "El amor es una amistad prendida en fuego. - Jeremy Taylor",
            "El amor es la poesía de los sentidos. - Honoré de Balzac",
            "Amar es encontrar en la felicidad de otro tu propia felicidad. - Gottfried Leibniz",
            "El corazón que ama siempre es joven. - Proverbio griego",
            "El amor es la única realidad y no es un mero sentimiento. - Rabindranath Tagore",
            "Donde reina el amor, sobran las leyes. - Platón"
        ];
        
        this.romanticMessages = [
            "Eres la razón por la que creo en el amor verdadero 💕",
            "Cada día contigo es una nueva aventura llena de amor ❤️",
            "Tu sonrisa es mi lugar favorito en todo el mundo 😊",
            "Eres mi sueño hecho realidad 💭✨",
            "Contigo, el amor se siente como magia 🪄💖",
            "Eres mi persona favorita en este mundo y en cualquier otro 🌍💝",
            "Tu amor es la melodía más hermosa que he escuchado 🎵💕",
            "Eres mi sol en los días nublados ☀️🌈",
            "Contigo, cada momento es perfecto ⏰💞",
            "Eres la respuesta a todas mis oraciones 🙏💗",
            "Tu amor hace que mi corazón cante 🎶❤️",
            "Eres mi para siempre y mi siempre jamás 💫💖",
            "Contigo he encontrado mi hogar 🏠💕",
            "Eres mi razón de ser, mi todo 💯💝",
            "Tu amor es mi superpoder 💪💞"
        ];

        this.init();
    }

    // Inicializar dashboard
    init() {
        // Verificar autenticación
        this.currentUser = this.auth.getCurrentUser();
        
        if (!this.currentUser) {
            // Redirigir a login si no hay sesión
            window.location.href = 'index.html';
            return;
        }

        // Cargar datos del usuario
        this.loadUserData();
        
        // Inicializar componentes
        this.initializeQuote();
        this.loadSavedMessages();
        this.updateCountdowns();
        this.loadCustomDates();
        this.updateStats();
        
        // Inicializar eventos
        this.initializeEvents();
        
        // Actualizar tiempo gastado cada minuto
        setInterval(() => {
            this.updateTimeSpent();
        }, 60000);
        
        // Actualizar countdowns cada hora
        setInterval(() => {
            this.updateCountdowns();
        }, 3600000);
        
        console.log('Dashboard iniciado correctamente');
    }

    // Cargar datos del usuario en la interfaz
    loadUserData() {
        const userName = document.getElementById('userName');
        const userFullName = document.getElementById('userFullName');
        const userEmail = document.getElementById('userEmail');
        const userGender = document.getElementById('userGender');

        if (userName) userName.textContent = this.currentUser.user_name;
        if (userFullName) userFullName.textContent = this.currentUser.user_name;
        if (userEmail) userEmail.textContent = this.currentUser.user_email;
        
        if (userGender) {
            const genderEmoji = {
                'femenino': '♀️ Femenino',
                'masculino': '♂️ Masculino',
                'otro': '⚧️ Otro',
                'prefiero_no_decir': '🤐 Prefiero no decir'
            };
            userGender.textContent = genderEmoji[this.currentUser.user_gender] || '⚧️ Otro';
        }
    }

    // Inicializar frase del día
    initializeQuote() {
        const quoteElement = document.getElementById('dailyQuote');
        const authorElement = document.querySelector('.quote-author');
        
        if (quoteElement) {
            const randomQuote = this.getRandomQuote();
            const parts = randomQuote.split(' - ');
            quoteElement.textContent = `"${parts[0]}"`;
            if (authorElement && parts[1]) {
                authorElement.textContent = `- ${parts[1]}`;
            }
        }
    }

    // Obtener frase aleatoria
    getRandomQuote() {
        return this.quotes[Math.floor(Math.random() * this.quotes.length)];
    }

    // Generar nueva frase
    getNewQuote() {
        this.initializeQuote();
        
        // Actualizar estadísticas
        this.auth.updateStats(this.currentUser.user_id, {
            quotesRead: (this.getStatsForUser().quotesRead || 0) + 1
        });
        
        this.updateStats();
        
        // Animación
        const quoteCard = document.querySelector('.love-quotes');
        if (quoteCard) {
            quoteCard.style.transform = 'scale(1.05)';
            setTimeout(() => {
                quoteCard.style.transform = 'scale(1)';
            }, 200);
        }
    }

    // Calculadora del amor
    calculateLove() {
        const name1 = document.getElementById('name1').value.trim();
        const name2 = document.getElementById('name2').value.trim();
        const resultElement = document.getElementById('loveResult');

        if (!name1 || !name2) {
            resultElement.innerHTML = '<p style="color: #ff6b9d;">💔 Por favor ingresa ambos nombres</p>';
            return;
        }

        // Algoritmo simple de compatibilidad
        const combined = (name1 + name2).toLowerCase();
        let score = 0;
        
        for (let i = 0; i < combined.length; i++) {
            score += combined.charCodeAt(i);
        }
        
        // Normalizar a porcentaje entre 60-99 para que sea más romántico
        const compatibility = Math.max(60, (score % 40) + 60);
        
        let message, color, emoji;
        
        if (compatibility >= 90) {
            message = "¡Amor eterno! Son perfectos el uno para el otro";
            color = "#ff1744";
            emoji = "💞";
        } else if (compatibility >= 80) {
            message = "¡Excelente compatibilidad! El amor está en el aire";
            color = "#ff6b9d";
            emoji = "💕";
        } else if (compatibility >= 70) {
            message = "¡Buena química! Hay potencial para el amor";
            color = "#e91e63";
            emoji = "💖";
        } else {
            message = "Pueden construir un hermoso amor juntos";
            color = "#ad1457";
            emoji = "💗";
        }

        resultElement.innerHTML = `
            <div style="color: ${color}; text-align: center; padding: 15px;">
                <div style="font-size: 2em; margin-bottom: 10px;">${emoji}</div>
                <div style="font-size: 1.5em; font-weight: bold; margin-bottom: 5px;">${compatibility}%</div>
                <p style="margin: 0; font-size: 0.9em;">${message}</p>
            </div>
        `;

        // Actualizar estadísticas
        this.auth.updateStats(this.currentUser.user_id, {
            loveCalculations: (this.getStatsForUser().loveCalculations || 0) + 1
        });
        
        this.updateStats();
    }

    // Generar mensaje romántico aleatorio
    generateRandomMessage() {
        const messageTextarea = document.getElementById('loveMessage');
        if (messageTextarea) {
            const randomMessage = this.romanticMessages[Math.floor(Math.random() * this.romanticMessages.length)];
            messageTextarea.value = randomMessage;
        }
    }

    // Guardar mensaje de amor
    saveLoveMessage() {
        const messageTextarea = document.getElementById('loveMessage');
        const message = messageTextarea.value.trim();

        if (!message) {
            this.showNotification('Por favor escribe un mensaje primero 💔', 'error');
            return;
        }

        // Guardar mensaje
        this.auth.saveMessage(this.currentUser.user_id, message);
        
        // Actualizar estadísticas
        this.auth.updateStats(this.currentUser.user_id, {
            messagesSaved: (this.getStatsForUser().messagesSaved || 0) + 1
        });

        // Limpiar textarea
        messageTextarea.value = '';
        
        // Recargar mensajes guardados
        this.loadSavedMessages();
        
        // Actualizar estadísticas
        this.updateStats();
        
        this.showNotification('¡Mensaje guardado con amor! 💕', 'success');
    }

    // Cargar mensajes guardados
    loadSavedMessages() {
        const savedMessagesContainer = document.getElementById('savedMessages');
        if (!savedMessagesContainer) return;

        const messages = this.auth.getSavedMessages(this.currentUser.user_id);
        
        if (messages.length === 0) {
            savedMessagesContainer.innerHTML = '<p style="text-align: center; color: #999; font-style: italic;">No hay mensajes guardados aún 💭</p>';
            return;
        }

        const messagesHTML = messages.map(msg => `
            <div class="saved-message">
                <p>${msg.message}</p>
                <small>${new Date(msg.timestamp).toLocaleDateString()}</small>
                <button onclick="dashboard.copyMessage('${msg.message.replace(/'/g, "\\'")}')">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        `).join('');

        savedMessagesContainer.innerHTML = messagesHTML;
    }

    // Copiar mensaje al portapapeles
    copyMessage(message) {
        navigator.clipboard.writeText(message).then(() => {
            this.showNotification('¡Mensaje copiado! 📋💕', 'success');
        }).catch(err => {
            console.error('Error al copiar:', err);
            this.showNotification('Error al copiar el mensaje 💔', 'error');
        });
    }

    // Funciones del temporizador
    startTimer() {
        if (this.timer) return; // Ya está corriendo

        this.timerStartTime = Date.now() - this.timerElapsed;
        this.timer = setInterval(() => {
            this.updateTimerDisplay();
        }, 1000);
        
        this.updateTimerButtons('running');
    }

    pauseTimer() {
        if (!this.timer) return;

        clearInterval(this.timer);
        this.timer = null;
        this.timerElapsed = Date.now() - this.timerStartTime;
        
        this.updateTimerButtons('paused');
    }

    resetTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        
        this.timerElapsed = 0;
        this.timerStartTime = null;
        this.updateTimerDisplay();
        this.updateTimerButtons('stopped');
    }

    updateTimerDisplay() {
        const display = document.getElementById('timerDisplay');
        if (!display) return;

        const elapsed = this.timer ? Date.now() - this.timerStartTime : this.timerElapsed;
        const seconds = Math.floor(elapsed / 1000) % 60;
        const minutes = Math.floor(elapsed / 60000) % 60;
        const hours = Math.floor(elapsed / 3600000);

        display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    updateTimerButtons(state) {
        const startBtn = document.querySelector('.timer-btn.start');
        const pauseBtn = document.querySelector('.timer-btn.pause');
        const resetBtn = document.querySelector('.timer-btn.reset');

        if (startBtn && pauseBtn && resetBtn) {
            switch (state) {
                case 'running':
                    startBtn.style.display = 'none';
                    pauseBtn.style.display = 'inline-block';
                    resetBtn.style.display = 'inline-block';
                    break;
                case 'paused':
                    startBtn.style.display = 'inline-block';
                    pauseBtn.style.display = 'none';
                    resetBtn.style.display = 'inline-block';
                    break;
                case 'stopped':
                    startBtn.style.display = 'inline-block';
                    pauseBtn.style.display = 'none';
                    resetBtn.style.display = 'none';
                    break;
            }
        }
    }

    // Actualizar countdowns de fechas especiales
    updateCountdowns() {
        const now = new Date();
        const currentYear = now.getFullYear();
        
        // San Valentín
        const valentine = new Date(currentYear, 1, 14); // Febrero 14
        if (valentine < now) valentine.setFullYear(currentYear + 1);
        this.updateCountdown('valentinesCountdown', valentine);
        
        // Día de la Madre (segundo domingo de mayo)
        const mothersDay = this.getSecondSunday(currentYear, 4); // Mayo = mes 4
        if (mothersDay < now) {
            const nextMothersDay = this.getSecondSunday(currentYear + 1, 4);
            this.updateCountdown('mothersCountdown', nextMothersDay);
        } else {
            this.updateCountdown('mothersCountdown', mothersDay);
        }
        
        // Día del Amor y la Amistad (15 de septiembre en algunos países)
        const friendship = new Date(currentYear, 8, 15); // Septiembre 15
        if (friendship < now) friendship.setFullYear(currentYear + 1);
        this.updateCountdown('friendshipCountdown', friendship);
    }

    getSecondSunday(year, month) {
        const firstDay = new Date(year, month, 1);
        const firstSunday = new Date(year, month, 1 + (7 - firstDay.getDay()) % 7);
        return new Date(year, month, firstSunday.getDate() + 7);
    }

    updateCountdown(elementId, targetDate) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            element.textContent = '¡Hoy es el día! 🎉';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        if (days === 0) {
            element.textContent = '¡Mañana! 🔥';
        } else if (days === 1) {
            element.textContent = 'En 1 día 😍';
        } else if (days < 30) {
            element.textContent = `En ${days} días 💕`;
        } else {
            const months = Math.floor(days / 30);
            element.textContent = `En ${months} mes${months > 1 ? 'es' : ''} 📅`;
        }
    }

    // Cargar fechas personalizadas
    loadCustomDates() {
        const customDates = this.auth.getCustomDates(this.currentUser.user_id);
        const container = document.querySelector('.special-dates');
        
        if (!container || customDates.length === 0) return;

        customDates.forEach(dateObj => {
            const dateElement = document.createElement('div');
            dateElement.className = 'date-item custom-date';
            
            const targetDate = new Date(dateObj.date);
            const countdownId = `custom_${dateObj.id}`;
            
            dateElement.innerHTML = `
                <div class="date-icon">${dateObj.icon}</div>
                <div class="date-info">
                    <h4>${dateObj.name}</h4>
                    <p>${targetDate.toLocaleDateString()}</p>
                    <span class="countdown" id="${countdownId}"></span>
                </div>
            `;
            
            container.appendChild(dateElement);
            this.updateCountdown(countdownId, targetDate);
        });
    }

    // Modal para agregar fecha personalizada
    addCustomDate() {
        const modal = document.getElementById('customDateModal');
        if (modal) {
            modal.style.display = 'block';
        }
    }

    // Actualizar estadísticas
    updateStats() {
        const stats = this.getStatsForUser();
        
        // Días registrado
        const createdDate = new Date(this.getCurrentUserData().createdAt);
        const now = new Date();
        const daysDiff = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));
        
        this.updateStatElement('daysRegistered', Math.max(1, daysDiff));
        this.updateStatElement('messagesCount', stats.messagesSaved || 0);
        this.updateStatElement('quotesRead', stats.quotesRead || 0);
        this.updateStatElement('timeSpent', stats.timeSpentMinutes || 0);
    }

    updateStatElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    // Obtener datos del usuario actual
    getCurrentUserData() {
        const users = this.auth.getUsers();
        return users.find(u => u.id === this.currentUser.user_id) || {};
    }

    // Obtener estadísticas del usuario actual
    getStatsForUser() {
        const allStats = this.auth.getUserStats();
        return allStats[this.currentUser.user_id] || {};
    }

    // Actualizar tiempo gastado
    updateTimeSpent() {
        this.auth.updateStats(this.currentUser.user_id, {
            timeSpentMinutes: (this.getStatsForUser().timeSpentMinutes || 0) + 1
        });
    }

    // Inicializar eventos
    initializeEvents() {
        // Modal de fecha personalizada
        const modal = document.getElementById('customDateModal');
        const closeBtn = modal ? modal.querySelector('.close') : null;
        const form = document.getElementById('customDateForm');

        if (closeBtn) {
            closeBtn.onclick = () => {
                modal.style.display = 'none';
            };
        }

        if (modal) {
            window.onclick = (event) => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            };
        }

        if (form) {
            form.onsubmit = (e) => {
                e.preventDefault();
                this.saveCustomDate();
            };
        }

        // Prellenar nombre en calculadora del amor
        const name1Input = document.getElementById('name1');
        if (name1Input) {
            name1Input.value = this.currentUser.user_name;
        }
    }

    // Guardar fecha personalizada
    saveCustomDate() {
        const name = document.getElementById('customDateName').value.trim();
        const date = document.getElementById('customDate').value;
        const icon = document.getElementById('customDateIcon').value.trim() || '💕';

        if (!name || !date) {
            this.showNotification('Por favor completa todos los campos 💔', 'error');
            return;
        }

        this.auth.addCustomDate(this.currentUser.user_id, name, date, icon);
        
        // Cerrar modal
        const modal = document.getElementById('customDateModal');
        if (modal) {
            modal.style.display = 'none';
        }

        // Limpiar formulario
        document.getElementById('customDateForm').reset();
        
        // Recargar fechas
        location.reload(); // Recarga simple para mostrar la nueva fecha
        
        this.showNotification('¡Fecha especial agregada! 💕', 'success');
    }

    // Mostrar notificación
    showNotification(message, type = 'success') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'heart' : 'heart-broken'}"></i>
            <span>${message}</span>
        `;
        
        // Estilos CSS inline para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
            color: ${type === 'success' ? '#155724' : '#721c24'};
            padding: 15px 20px;
            border-radius: 10px;
            border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
            z-index: 1000;
            font-family: 'Poppins', sans-serif;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Función global para logout
function logout() {
    const result = window.romanticAuth.logout();
    if (result.success) {
        window.location.href = 'index.html';
    }
}

// Funciones globales para las tarjetas
function getNewQuote() {
    window.dashboard.getNewQuote();
}

function calculateLove() {
    window.dashboard.calculateLove();
}

function generateRandomMessage() {
    window.dashboard.generateRandomMessage();
}

function saveLoveMessage() {
    window.dashboard.saveLoveMessage();
}

function startTimer() {
    window.dashboard.startTimer();
}

function pauseTimer() {
    window.dashboard.pauseTimer();
}

function resetTimer() {
    window.dashboard.resetTimer();
}

function addCustomDate() {
    window.dashboard.addCustomDate();
}

// Inicializar dashboard cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new DashboardManager();
});
