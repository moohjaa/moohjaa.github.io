// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const modal = document.getElementById('messageModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const closeModal = document.getElementsByClassName('close')[0];

// Form Toggle Functionality
loginBtn.addEventListener('click', () => {
    showLoginForm();
});

registerBtn.addEventListener('click', () => {
    showRegisterForm();
});

function showLoginForm() {
    loginBtn.classList.add('active');
    registerBtn.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
}

function showRegisterForm() {
    registerBtn.classList.add('active');
    loginBtn.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
}

// Password Toggle Functionality
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggleBtn = input.nextElementSibling;
    const icon = toggleBtn.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Modal Functionality
function showModal(title, message, isSuccess = true) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    
    const modalIcon = document.querySelector('.modal-icon i');
    if (isSuccess) {
        modalIcon.className = 'fas fa-heart';
        modalIcon.style.color = '#ff6b9d';
    } else {
        modalIcon.className = 'fas fa-heart-broken';
        modalIcon.style.color = '#dc3545';
    }
    
    modal.style.display = 'block';
    
    // Auto close after 3 seconds
    setTimeout(() => {
        hideModal();
    }, 3000);
}

function hideModal() {
    modal.style.display = 'none';
}

closeModal.onclick = hideModal;

window.onclick = function(event) {
    if (event.target == modal) {
        hideModal();
    }
}

// Form Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // Minimum 6 characters
    return password.length >= 6;
}

// Login Form Handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Client-side validation
    if (!validateEmail(email)) {
        showModal('Email inválido 💔', 'Por favor ingresa un email válido, mi amor.', false);
        return;
    }
    
    if (password.length < 6) {
        showModal('Contraseña muy corta 💔', 'La contraseña debe tener al menos 6 caracteres.', false);
        return;
    }
    
    // Show loading state
    const submitBtn = loginForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-heart"></i> Entrando...';
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        // Obtener el sistema de autenticación apropiado
        const authSystem = await getAuthSystem();
        const result = await authSystem.login(email, password, rememberMe);
        
        if (result.success) {
            showModal('¡Bienvenido de vuelta! 💕', 'Has iniciado sesión exitosamente.');
            
            // Save session data if remember me is checked
            if (rememberMe) {
                localStorage.setItem('userEmail', email);
            }
            
            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        } else {
            showModal('Error de acceso 💔', result.message || 'Credenciales incorrectas.', false);
        }
    } catch (error) {
        console.error('Error:', error);
        showModal('Error inesperado 💔', 'Algo salió mal. Intenta de nuevo.', false);
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

// Register Form Handler
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('registerUsername').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const gender = document.getElementById('registerGender').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const acceptTerms = document.getElementById('acceptTerms').checked;
    
    // Client-side validation
    if (!username) {
        showModal('Datos incompletos 💔', 'Por favor ingresa tu nombre de usuario.', false);
        return;
    }
    
    if (username.length < 3) {
        showModal('Nombre muy corto 💔', 'El nombre de usuario debe tener al menos 3 caracteres.', false);
        return;
    }
    
    if (!validateEmail(email)) {
        showModal('Email inválido 💔', 'Por favor ingresa un email válido.', false);
        return;
    }
    
    if (!gender) {
        showModal('Género requerido 💔', 'Por favor selecciona tu género.', false);
        return;
    }
    
    if (!validatePassword(password)) {
        showModal('Contraseña débil 💔', 'La contraseña debe tener al menos 6 caracteres.', false);
        return;
    }
    
    if (password !== confirmPassword) {
        showModal('Contraseñas no coinciden 💔', 'Las contraseñas no son iguales. Verifica e intenta de nuevo.', false);
        return;
    }
    
    if (!acceptTerms) {
        showModal('Términos requeridos 💔', 'Debes aceptar los términos y condiciones.', false);
        return;
    }
    
    // Show loading state
    const submitBtn = registerForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-heart"></i> Creando cuenta...';
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        // Obtener el sistema de autenticación apropiado
        const authSystem = await getAuthSystem();
        const result = await authSystem.register(username, email, password, gender);
        
        if (result.success) {
            showModal('¡Cuenta creada! 💕', 'Tu cuenta ha sido creada exitosamente. ¡Bienvenido al amor!');
            
            // Clear form
            registerForm.reset();
            
            // Switch to login form after 2 seconds
            setTimeout(() => {
                showLoginForm();
                // Pre-fill email in login form
                document.getElementById('loginEmail').value = email;
            }, 2000);
        } else {
            showModal('Error en registro 💔', result.message || 'No se pudo crear la cuenta.', false);
        }
    } catch (error) {
        console.error('Error:', error);
        showModal('Error inesperado 💔', 'Algo salió mal. Intenta de nuevo.', false);
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

// Social Login Handlers
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const platform = e.currentTarget.classList.contains('google') ? 'Google' : 
                        e.currentTarget.classList.contains('facebook') ? 'Facebook' : 'Instagram';
        
        showModal('Próximamente 💕', `La integración con ${platform} estará disponible pronto.`);
    });
});

// Load remembered email on page load
document.addEventListener('DOMContentLoaded', () => {
    const rememberedEmail = localStorage.getItem('userEmail');
    if (rememberedEmail) {
        document.getElementById('loginEmail').value = rememberedEmail;
        document.getElementById('rememberMe').checked = true;
    }
});

// Add floating animation to hearts
function animateHearts() {
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        setInterval(() => {
            const randomX = Math.random() * 10 - 5;
            const randomY = Math.random() * 10 - 5;
            heart.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 20 - 10}deg)`;
        }, 2000 + index * 500);
    });
}

// Initialize animations
animateHearts();

// Add romantic quotes
const romanticQuotes = [
    "El amor es la única fuerza capaz de transformar a un enemigo en un amigo. 💕",
    "Donde hay amor, hay vida. 💖",
    "El amor verdadero nunca tiene fin. 💗",
    "Eres mi persona favorita en todo el universo. ❤️",
    "El amor es el puente entre dos corazones. 💝"
];

// Change quote every 10 seconds
setInterval(() => {
    const randomQuote = romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)];
    console.log(randomQuote); // Could be displayed in a quote element if added to HTML
}, 10000);

// Add input focus animations
document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.3s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Add romantic particles effect
function createRomanticParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.backgroundColor = '#ff6b9d';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1';
    particle.style.opacity = '0.7';
    
    const startX = Math.random() * window.innerWidth;
    particle.style.left = startX + 'px';
    particle.style.top = '-10px';
    
    document.body.appendChild(particle);
    
    const duration = 3000 + Math.random() * 2000;
    const endY = window.innerHeight + 10;
    
    particle.animate([
        { transform: 'translateY(0px) rotate(0deg)', opacity: 0.7 },
        { transform: `translateY(${endY}px) rotate(360deg)`, opacity: 0 }
    ], {
        duration: duration,
        easing: 'linear'
    }).onfinish = () => {
        particle.remove();
    };
}

// Create particles periodically
setInterval(createRomanticParticle, 500);

// Add smooth scrolling for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Prevent form submission on Enter for better UX
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.type !== 'submit') {
            e.preventDefault();
            const form = this.closest('form');
            const inputs = Array.from(form.querySelectorAll('input'));
            const index = inputs.indexOf(this);
            const nextInput = inputs[index + 1];
            
            if (nextInput) {
                nextInput.focus();
            }
        }
    });
});

// Función para obtener el sistema de autenticación apropiado
async function getAuthSystem() {
    // Verificar si tenemos el config cargado
    if (typeof window.systemConfig === 'undefined') {
        console.log('Config no disponible, usando sistema local por defecto');
        return window.romanticAuth;
    }
    
    // Detectar si estamos en un entorno con servidor
    const hasServer = await detectServerEnvironment();
    
    if (hasServer) {
        console.log('Servidor detectado, usando autenticación PHP/MySQL');
        return new ServerAuth();
    } else {
        console.log('Sin servidor, usando autenticación local (localStorage)');
        return window.romanticAuth;
    }
}

// Detectar si PHP/servidor está disponible
async function detectServerEnvironment() {
    try {
        const response = await fetch('auth.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'test' })
        });
        
        return response.ok || response.status === 404; // 404 también indica que PHP está disponible
    } catch (error) {
        return false; // Probablemente GitHub Pages o sin servidor
    }
}

// Clase para autenticación con servidor (definida aquí si config.js no está disponible)
if (typeof ServerAuth === 'undefined') {
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
                        user_id: 1,
                        user_name: email.split('@')[0],
                        user_email: email,
                        user_gender: 'otro',
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
                sessionStorage.removeItem('romantic_session');
                return result;
            } catch (error) {
                console.error('Error en logout:', error);
                return { success: false, message: 'Error de conexión al servidor' };
            }
        }
    }
}
