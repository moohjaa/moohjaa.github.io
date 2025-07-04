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
    // Minimum 8 characters, at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
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
        const response = await fetch('auth.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'login',
                email: email,
                password: password,
                remember: rememberMe
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showModal('¡Bienvenido de vuelta! 💕', 'Has iniciado sesión exitosamente.');
            
            // Save session data if remember me is checked
            if (rememberMe) {
                localStorage.setItem('userEmail', email);
            }
            
            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = 'dashboard.php';
            }, 2000);
        } else {
            showModal('Error de acceso 💔', data.message || 'Credenciales incorrectas.', false);
        }
    } catch (error) {
        console.error('Error:', error);
        showModal('Error de conexión 💔', 'No se pudo conectar con el servidor. Intenta de nuevo.', false);
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
    
    const name = document.getElementById('registerName').value.trim();
    const lastname = document.getElementById('registerLastname').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const phone = document.getElementById('registerPhone').value.trim();
    const birthdate = document.getElementById('registerBirthdate').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const acceptTerms = document.getElementById('acceptTerms').checked;
    
    // Client-side validation
    if (!name || !lastname) {
        showModal('Datos incompletos 💔', 'Por favor completa tu nombre y apellido.', false);
        return;
    }
    
    if (!validateEmail(email)) {
        showModal('Email inválido 💔', 'Por favor ingresa un email válido.', false);
        return;
    }
    
    if (!validatePhone(phone)) {
        showModal('Teléfono inválido 💔', 'Por favor ingresa un número de teléfono válido.', false);
        return;
    }
    
    if (!birthdate) {
        showModal('Fecha requerida 💔', 'Por favor ingresa tu fecha de nacimiento.', false);
        return;
    }
    
    // Check if user is at least 13 years old
    const today = new Date();
    const birth = new Date(birthdate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (age < 13 || (age === 13 && monthDiff < 0)) {
        showModal('Edad mínima requerida 💔', 'Debes tener al menos 13 años para registrarte.', false);
        return;
    }
    
    if (!validatePassword(password)) {
        showModal('Contraseña débil 💔', 'La contraseña debe tener al menos 8 caracteres, una letra y un número.', false);
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
        const response = await fetch('auth.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'register',
                name: name,
                lastname: lastname,
                email: email,
                phone: phone,
                birthdate: birthdate,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
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
            showModal('Error en registro 💔', data.message || 'No se pudo crear la cuenta.', false);
        }
    } catch (error) {
        console.error('Error:', error);
        showModal('Error de conexión 💔', 'No se pudo conectar con el servidor. Intenta de nuevo.', false);
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
