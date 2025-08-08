// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    setupAnimations();
    setupInteractivity();
    setupParticleEffect();
    setupResponsiveHandling();
}

// Setup initial animations
function setupAnimations() {
    const hero = document.querySelector('.hero');
    const greeting = document.querySelector('.greeting');
    const subtitle = document.querySelector('.subtitle');
    const cta = document.querySelector('.cta');

    // Stagger animation entrance
    setTimeout(() => {
        if (greeting) greeting.classList.add('animate-in');
    }, 300);

    setTimeout(() => {
        if (subtitle) subtitle.classList.add('animate-in');
    }, 600);

    setTimeout(() => {
        if (cta) cta.classList.add('animate-in');
    }, 900);
}

// Setup interactive elements
function setupInteractivity() {
    // Greeting click interaction
    const greeting = document.querySelector('.greeting');
    if (greeting) {
        greeting.addEventListener('click', handleGreetingClick);
        greeting.addEventListener('mouseenter', handleGreetingHover);
        greeting.addEventListener('mouseleave', handleGreetingLeave);
    }

    // CTA button interactions
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', handleCTAClick);
        ctaButton.addEventListener('mouseenter', handleCTAHover);
        ctaButton.addEventListener('mouseleave', handleCTALeave);
    }

    // Keyboard accessibility
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// Greeting interaction handlers
function handleGreetingClick(e) {
    const element = e.target;
    element.classList.add('pulse');
    
    // Create floating hearts effect
    createFloatingHearts(e.clientX, e.clientY);
    
    // Remove pulse class after animation
    setTimeout(() => {
        element.classList.remove('pulse');
    }, 600);
}

function handleGreetingHover(e) {
    const element = e.target;
    element.style.transform = 'scale(1.05) translateY(-5px)';
}

function handleGreetingLeave(e) {
    const element = e.target;
    element.style.transform = 'scale(1) translateY(0)';
}

// CTA button handlers
function handleCTAClick(e) {
    e.preventDefault();
    const button = e.target;
    
    // Add click animation
    button.classList.add('clicked');
    
    // Show success message
    showSuccessMessage();
    
    // Remove animation class
    setTimeout(() => {
        button.classList.remove('clicked');
    }, 300);
}

function handleCTAHover(e) {
    const button = e.target;
    button.style.transform = 'translateY(-3px)';
    button.style.boxShadow = '0 10px 25px rgba(139, 69, 19, 0.3)';
}

function handleCTALeave(e) {
    const button = e.target;
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = '0 5px 15px rgba(139, 69, 19, 0.2)';
}

// Create floating hearts effect
function createFloatingHearts(x, y) {
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.className = 'floating-heart';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.animationDelay = (i * 0.1) + 's';
        
        document.body.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 2000);
    }
}

// Show success message
function showSuccessMessage() {
    // Remove existing message if present
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = '✨ Hello sent to Naza! ✨';
    
    document.body.appendChild(message);
    
    // Animate in
    setTimeout(() => {
        message.classList.add('show');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 300);
    }, 3000);
}

// Particle effect system
function setupParticleEffect() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.6';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 182, 193, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Responsive handling
function setupResponsiveHandling() {
    let resizeTimeout;
    
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            handleResize();
        }, 250);
    });
}

function handleResize() {
    // Adjust particle canvas
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Recalculate any position-dependent elements
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth < 768) {
        // Mobile-specific adjustments
        hero.style.padding = '2rem 1rem';
    } else if (hero) {
        // Desktop adjustments
        hero.style.padding = '4rem 2rem';
    }
}

// Keyboard navigation
function handleKeyboardNavigation(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        
        if (focusedElement.classList.contains('greeting')) {
            e.preventDefault();
            handleGreetingClick({ 
                target: focusedElement, 
                clientX: window.innerWidth / 2, 
                clientY: window.innerHeight / 2 
            });
        }
        
        if (focusedElement.classList.contains('cta-button')) {
            e.preventDefault();
            handleCTAClick({ target: focusedElement, preventDefault: () => {} });
        }
    }
}

// Utility function for smooth scrolling (if needed for future enhancements)
function smoothScrollTo(target, duration = 800) {
    const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Error handling
window.addEventListener('error', function(e) {
    console.warn('An error occurred:', e.error);
    // Graceful degradation - ensure basic functionality still works
});

// Performance optimization - throttle scroll events if needed
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}