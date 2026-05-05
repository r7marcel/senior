// ========================================
// SENIORKOMFORT PREMIUM - Advanced Script
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Theme Toggle =====
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-theme');
            const isDark = body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
    
    // ===== Header Scroll Effect =====
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ===== Shopping Cart =====
    let cartCount = 0;
    const cartBtn = document.querySelector('.cart-btn');
    const cartCountEl = document.querySelector('.cart-count');
    
    // Obsługa przycisków "Dodaj do koszyka"
    const addButtons = document.querySelectorAll('.btn-add');
    addButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            cartCount++;
            
            if (cartCountEl) {
                cartCountEl.textContent = cartCount;
                cartCountEl.style.animation = 'none';
                setTimeout(() => {
                    cartCountEl.style.animation = 'pulse 0.3s ease';
                }, 10);
            }
            
            // Premium animation confirmation
            const originalContent = this.innerHTML;
            this.innerHTML = '<span class="add-icon">✓</span><span>Dodano!</span>';
            this.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            setTimeout(() => {
                this.innerHTML = originalContent;
                this.style.background = '';
            }, 1500);
        });
    });
    
    // ===== Smooth Scroll with Offset =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== Contact Form with Validation =====
    const contactForm = document.querySelector('.contact-form.premium');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.btn-submit');
            const originalContent = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Wysyłanie...</span>';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.innerHTML = '<span>✓ Wiadomość Wysłana!</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                
                this.reset();
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.style.background = '';
                    submitBtn.style.opacity = '1';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
    
    // ===== Product Cards Animation =====
    const productCards = document.querySelectorAll('.product-card.premium');
    productCards.forEach(card => {
        // Add intersection observer for fade-in animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease';
        observer.observe(card);
    });
    
    // ===== Quick View Buttons =====
    const quickViewButtons = document.querySelectorAll('.btn-quickview');
    quickViewButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // Create modal overlay
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.style.cssText = `
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                animation: fadeIn 0.3s ease;
            `;
            
            modal.innerHTML = `
                <div style="
                    background: white;
                    padding: 40px;
                    border-radius: 24px;
                    max-width: 500px;
                    text-align: center;
                    position: relative;
                    animation: slideUp 0.4s ease;
                ">
                    <button onclick="this.closest('.modal-overlay').remove()" style="
                        position: absolute;
                        top: 15px;
                        right: 15px;
                        background: none;
                        border: none;
                        font-size: 1.5rem;
                        cursor: pointer;
                        color: #666;
                    ">×</button>
                    <h2 style="font-family: 'Playfair Display'; color: #1a1a2e; margin-bottom: 15px;">${productName}</h2>
                    <p style="color: #666; margin-bottom: 25px;">Szczegółowe informacje o produkcie będą dostępne wkrótce.</p>
                    <button onclick="this.closest('.modal-overlay').remove()" style="
                        background: linear-gradient(135deg, #c9a959 0%, #e0c47f 100%);
                        color: white;
                        border: none;
                        padding: 14px 40px;
                        border-radius: 12px;
                        font-weight: 600;
                        cursor: pointer;
                    ">Zamknij</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.remove();
            });
        });
    });
    
    // ===== Hero Stats Counter Animation =====
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = stat.textContent;
            const numericValue = parseInt(target.replace(/\D/g, ''));
            const suffix = target.replace(/[\d]/g, '');
            
            if (numericValue) {
                let current = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        stat.textContent = target;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + suffix;
                    }
                }, 30);
            }
        });
    };
    
    // Trigger stats animation when hero section is visible
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        heroObserver.observe(heroSection);
    }
    
    // ===== Particle Effect (Simple Implementation) =====
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: rgba(201, 169, 89, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }
    
    // Console welcome message
    console.log('%c✦ SeniorKomfort Premium ✦', 'font-size: 20px; font-weight: bold; color: #c9a959;');
    console.log('%cEkskluzywne akcesoria dla seniorów', 'font-size: 12px; color: #666;');
    console.log('Liczba produktów w ofercie:', addButtons.length);
});

// ===== Font Size Adjustment Functions (Accessibility) =====
function increaseFontSize() {
    const body = document.body;
    const currentSize = parseFloat(window.getComputedStyle(body).fontSize);
    if (currentSize < 24) {
        body.style.fontSize = (currentSize + 2) + 'px';
    }
}

function decreaseFontSize() {
    const body = document.body;
    const currentSize = parseFloat(window.getComputedStyle(body).fontSize);
    if (currentSize > 14) {
        body.style.fontSize = (currentSize - 2) + 'px';
    }
}

// Export functions to global scope
window.increaseFontSize = increaseFontSize;
window.decreaseFontSize = decreaseFontSize;

// ===== Add CSS Animations Dynamically =====
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from { 
            opacity: 0;
            transform: translateY(30px);
        }
        to { 
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes float {
        0%, 100% { 
            transform: translateY(0) translateX(0);
            opacity: 0.5;
        }
        50% { 
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
