// Dashboard JavaScript functionality

// Romantic quotes collection
const romanticQuotes = [
    {
        text: "El amor es la única fuerza capaz de transformar a un enemigo en un amigo.",
        author: "Martin Luther King Jr."
    },
    {
        text: "Donde hay amor, hay vida.",
        author: "Mahatma Gandhi"
    },
    {
        text: "El amor verdadero nunca tiene fin.",
        author: "Proverbio"
    },
    {
        text: "Ser amado profundamente te da fuerza, mientras que amar profundamente te da coraje.",
        author: "Lao Tzu"
    },
    {
        text: "El amor es como una amistad que se ha prendido fuego.",
        author: "Bruce Lee"
    },
    {
        text: "En el amor, no hay nada mejor que encontrar a alguien que haga que el mundo parezca un lugar más brillante.",
        author: "Anónimo"
    },
    {
        text: "El amor no se mira, se siente. Y aún más: se vive.",
        author: "Pablo Neruda"
    },
    {
        text: "Amar no es mirarse el uno al otro, sino mirar juntos en la misma dirección.",
        author: "Antoine de Saint-Exupéry"
    }
];

// Romantic messages collection
const romanticMessages = [
    "Eres la razón por la que sonrío cada día 💕",
    "Mi corazón late más fuerte cuando estás cerca ❤️",
    "Contigo, cada momento se convierte en un recuerdo hermoso 💖",
    "Eres mi sol en los días nublados ☀️💕",
    "Tu amor es la melodía más hermosa que he escuchado 🎵💗",
    "Cada día a tu lado es una nueva aventura romántica 🌹",
    "Eres mi persona favorita en todo el universo 🌟💕",
    "Tu sonrisa ilumina mi mundo entero ✨❤️",
    "Contigo, he encontrado mi hogar en una persona 🏠💖",
    "Eres la respuesta a todas mis oraciones de amor 🙏💕"
];

// Timer variables
let timerInterval;
let timerSeconds = 0;
let isTimerRunning = false;

// Statistics
let quotesReadCount = 0;
let messagesCount = 0;
let timeSpentMinutes = 0;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    updateSpecialDatesCountdown();
    setInterval(updateSpecialDatesCountdown, 60000); // Update every minute
    loadSavedMessages();
    updateStats();
});

function initializeDashboard() {
    // Load initial quote
    getNewQuote();
    
    // Initialize timer display
    updateTimerDisplay();
    
    // Start session time tracking
    startSessionTracking();
    
    // Load saved statistics
    loadStats();
}

function getNewQuote() {
    const randomIndex = Math.floor(Math.random() * romanticQuotes.length);
    const quote = romanticQuotes[randomIndex];
    
    document.getElementById('dailyQuote').textContent = `"${quote.text}"`;
    document.querySelector('.quote-author').textContent = `- ${quote.author}`;
    
    quotesReadCount++;
    updateStats();
    saveStats();
    
    // Add animation
    const quoteElement = document.querySelector('.quote p');
    quoteElement.style.opacity = '0';
    setTimeout(() => {
        quoteElement.style.opacity = '1';
    }, 200);
}

function calculateLove() {
    const name1 = document.getElementById('name1').value.trim();
    const name2 = document.getElementById('name2').value.trim();
    
    if (!name1 || !name2) {
        showLoveResult("Por favor ingresa ambos nombres 💕", "#ff6b9d");
        return;
    }
    
    // Fun love calculation algorithm
    const combined = (name1 + name2).toLowerCase();
    let loveScore = 0;
    
    // Calculate based on character codes and length
    for (let i = 0; i < combined.length; i++) {
        loveScore += combined.charCodeAt(i);
    }
    
    // Normalize to 1-100
    loveScore = (loveScore % 100) + 1;
    
    // Ensure it's always positive and romantic
    if (loveScore < 50) {
        loveScore = 100 - loveScore;
    }
    
    let message, color;
    
    if (loveScore >= 90) {
        message = `¡${loveScore}%! 💕 ¡Amor eterno y verdadero!`;
        color = "#ff1744";
    } else if (loveScore >= 75) {
        message = `${loveScore}% 💖 ¡Una conexión muy especial!`;
        color = "#ff6b9d";
    } else if (loveScore >= 60) {
        message = `${loveScore}% 💗 ¡Hay química entre ustedes!`;
        color = "#ff8fab";
    } else {
        message = `${loveScore}% 💕 ¡El amor puede crecer!`;
        color = "#ffb3c1";
    }
    
    showLoveResult(message, color);
}

function showLoveResult(message, color) {
    const resultDiv = document.getElementById('loveResult');
    resultDiv.textContent = message;
    resultDiv.style.background = `linear-gradient(135deg, ${color}, ${color}44)`;
    resultDiv.style.color = color;
    resultDiv.style.border = `2px solid ${color}44`;
    
    // Animation
    resultDiv.style.transform = 'scale(0.8)';
    resultDiv.style.opacity = '0';
    setTimeout(() => {
        resultDiv.style.transform = 'scale(1)';
        resultDiv.style.opacity = '1';
        resultDiv.style.transition = 'all 0.3s ease';
    }, 100);
}

function generateRandomMessage() {
    const randomIndex = Math.floor(Math.random() * romanticMessages.length);
    const message = romanticMessages[randomIndex];
    
    document.getElementById('loveMessage').value = message;
    
    // Focus and select the text
    const textarea = document.getElementById('loveMessage');
    textarea.focus();
    textarea.select();
}

function saveLoveMessage() {
    const message = document.getElementById('loveMessage').value.trim();
    
    if (!message) {
        showNotification("Escribe un mensaje para guardar 💕", "warning");
        return;
    }
    
    // Get saved messages from localStorage
    let savedMessages = JSON.parse(localStorage.getItem('savedLoveMessages') || '[]');
    
    // Add new message with timestamp
    const newMessage = {
        text: message,
        timestamp: new Date().toLocaleString()
    };
    
    savedMessages.unshift(newMessage); // Add to beginning
    
    // Keep only last 10 messages
    if (savedMessages.length > 10) {
        savedMessages = savedMessages.slice(0, 10);
    }
    
    // Save to localStorage
    localStorage.setItem('savedLoveMessages', JSON.stringify(savedMessages));
    
    // Clear the textarea
    document.getElementById('loveMessage').value = '';
    
    // Reload saved messages display
    loadSavedMessages();
    
    // Update stats
    messagesCount = savedMessages.length;
    updateStats();
    saveStats();
    
    showNotification("¡Mensaje guardado con amor! 💕", "success");
}

function loadSavedMessages() {
    const savedMessages = JSON.parse(localStorage.getItem('savedLoveMessages') || '[]');
    const container = document.getElementById('savedMessages');
    
    if (savedMessages.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; font-style: italic;">No hay mensajes guardados aún 💭</p>';
        return;
    }
    
    container.innerHTML = savedMessages.map(msg => `
        <div class="saved-message">
            "${msg.text}"
            <div style="font-size: 0.8rem; color: #999; margin-top: 5px;">${msg.timestamp}</div>
        </div>
    `).join('');
    
    messagesCount = savedMessages.length;
}

// Timer functions
function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        timerInterval = setInterval(() => {
            timerSeconds++;
            updateTimerDisplay();
        }, 1000);
        
        showNotification("Temporizador iniciado 💕", "info");
    }
}

function pauseTimer() {
    if (isTimerRunning) {
        isTimerRunning = false;
        clearInterval(timerInterval);
        showNotification("Temporizador pausado ⏸️", "info");
    }
}

function resetTimer() {
    isTimerRunning = false;
    clearInterval(timerInterval);
    timerSeconds = 0;
    updateTimerDisplay();
    showNotification("Temporizador reiniciado 🔄", "info");
}

function updateTimerDisplay() {
    const hours = Math.floor(timerSeconds / 3600);
    const minutes = Math.floor((timerSeconds % 3600) / 60);
    const seconds = timerSeconds % 60;
    
    const display = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('timerDisplay').textContent = display;
}

// Special dates countdown
function updateSpecialDatesCountdown() {
    const now = new Date();
    const year = now.getFullYear();
    
    // Valentine's Day
    const valentines = new Date(year, 1, 14); // February 14
    if (valentines < now) {
        valentines.setFullYear(year + 1);
    }
    updateCountdown('valentinesCountdown', valentines);
    
    // Mother's Day (second Sunday of May)
    const mothersDay = getSecondSundayOfMay(year);
    if (mothersDay < now) {
        mothersDay.setFullYear(year + 1);
    }
    updateCountdown('mothersCountdown', mothersDay);
    
    // Love and Friendship Day (September - let's say September 21)
    const friendshipDay = new Date(year, 8, 21); // September 21
    if (friendshipDay < now) {
        friendshipDay.setFullYear(year + 1);
    }
    updateCountdown('friendshipCountdown', friendshipDay);
}

function getSecondSundayOfMay(year) {
    const may1 = new Date(year, 4, 1); // May 1
    const dayOfWeek = may1.getDay();
    const daysUntilFirstSunday = (7 - dayOfWeek) % 7;
    const firstSunday = new Date(year, 4, 1 + daysUntilFirstSunday);
    return new Date(year, 4, firstSunday.getDate() + 7);
}

function updateCountdown(elementId, targetDate) {
    const now = new Date();
    const diff = targetDate - now;
    
    if (diff <= 0) {
        document.getElementById(elementId).textContent = '¡Hoy es el día! 🎉';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
        document.getElementById(elementId).textContent = `En ${days} días`;
    } else {
        document.getElementById(elementId).textContent = `En ${hours} horas`;
    }
}

// Custom date modal
function addCustomDate() {
    document.getElementById('customDateModal').style.display = 'block';
}

// Modal close functionality
document.querySelector('.close').onclick = function() {
    document.getElementById('customDateModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('customDateModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Custom date form handler
document.getElementById('customDateForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('customDateName').value.trim();
    const date = document.getElementById('customDate').value;
    const icon = document.getElementById('customDateIcon').value.trim() || '💕';
    
    if (!name || !date) {
        showNotification("Por favor completa todos los campos 💔", "error");
        return;
    }
    
    // Save custom date
    let customDates = JSON.parse(localStorage.getItem('customDates') || '[]');
    customDates.push({ name, date, icon, id: Date.now() });
    localStorage.setItem('customDates', JSON.stringify(customDates));
    
    // Clear form and close modal
    document.getElementById('customDateForm').reset();
    document.getElementById('customDateModal').style.display = 'none';
    
    showNotification("¡Fecha especial agregada! 💕", "success");
    
    // Reload special dates (you could implement this to show custom dates)
    loadCustomDates();
});

function loadCustomDates() {
    // This function would load and display custom dates
    // Implementation depends on how you want to show them in the calendar
}

// Session tracking
function startSessionTracking() {
    setInterval(() => {
        timeSpentMinutes++;
        updateStats();
        saveStats();
    }, 60000); // Every minute
}

// Statistics functions
function updateStats() {
    document.getElementById('messagesCount').textContent = messagesCount;
    document.getElementById('quotesRead').textContent = quotesReadCount;
    document.getElementById('timeSpent').textContent = timeSpentMinutes;
}

function saveStats() {
    const stats = {
        messagesCount,
        quotesReadCount,
        timeSpentMinutes,
        lastVisit: new Date().toISOString()
    };
    localStorage.setItem('loveStats', JSON.stringify(stats));
}

function loadStats() {
    const saved = localStorage.getItem('loveStats');
    if (saved) {
        const stats = JSON.parse(saved);
        messagesCount = stats.messagesCount || 0;
        quotesReadCount = stats.quotesReadCount || 0;
        timeSpentMinutes = stats.timeSpentMinutes || 0;
        updateStats();
    }
}

// Logout function
async function logout() {
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
        
        const data = await response.json();
        
        if (data.success) {
            showNotification("¡Hasta pronto! 💕", "info");
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }
    } catch (error) {
        console.error('Error:', error);
        // Force logout even if request fails
        window.location.href = 'index.html';
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        background: ${getNotificationColor(type)};
        color: white;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-heart';
        case 'error': return 'fa-heart-broken';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return 'linear-gradient(135deg, #28a745, #20c997)';
        case 'error': return 'linear-gradient(135deg, #dc3545, #fd7e14)';
        case 'warning': return 'linear-gradient(135deg, #ffc107, #fd7e14)';
        default: return 'linear-gradient(135deg, #ff6b9d, #ff8fab)';
    }
}

// Add floating hearts animation
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.style.cssText = `
        position: fixed;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 1;
        opacity: 0.7;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight + 20}px;
    `;
    
    document.body.appendChild(heart);
    
    const duration = 3000 + Math.random() * 2000;
    
    heart.animate([
        { transform: 'translateY(0px) rotate(0deg)', opacity: 0.7 },
        { transform: `translateY(-${window.innerHeight + 100}px) rotate(360deg)`, opacity: 0 }
    ], {
        duration: duration,
        easing: 'linear'
    }).onfinish = () => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    };
}

// Create floating hearts periodically
setInterval(createFloatingHeart, 2000);

// Add hover effects to cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Animate stats numbers
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 20;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 50);
    });
}

// Call animate stats when page loads
setTimeout(animateStats, 1000);

// Add romantic particle effects on click
document.addEventListener('click', function(e) {
    createClickEffect(e.clientX, e.clientY);
});

function createClickEffect(x, y) {
    const effects = ['💕', '💖', '✨', '💗', '🌟'];
    const effect = effects[Math.floor(Math.random() * effects.length)];
    
    const particle = document.createElement('div');
    particle.innerHTML = effect;
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 1.2rem;
        pointer-events: none;
        z-index: 1000;
        transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(particle);
    
    particle.animate([
        { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
        { transform: 'translate(-50%, -150%) scale(1)', opacity: 0 }
    ], {
        duration: 800,
        easing: 'ease-out'
    }).onfinish = () => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    };
}
