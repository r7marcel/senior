// Skrypt dla strony SeniorKomfort

document.addEventListener('DOMContentLoaded', function() {
    // Koszyk zakupowy
    let cartCount = 0;
    const cartBtn = document.querySelector('.cart-btn');
    
    // Obsługa przycisków "Dodaj do koszyka"
    const addButtons = document.querySelectorAll('.btn-add');
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartCount++;
            cartBtn.textContent = `🛒 Koszyk (${cartCount})`;
            
            // Animacja potwierdzenia
            this.textContent = '✓ Dodano!';
            this.style.background = '#4CAF50';
            
            setTimeout(() => {
                this.textContent = 'Dodaj do koszyka';
                this.style.background = '';
            }, 1500);
        });
    });
    
    // Płynne przewijanie do sekcji
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Formularz kontaktowy
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Symulacja wysyłki formularza
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Wysyłanie...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = '✓ Wiadomość wysłana!';
                submitBtn.style.background = '#4CAF50';
                
                // Reset formularza
                this.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
    
    // Interakcja z kartami produktów
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Powiadomienie o dostępności produktu
    const prices = document.querySelectorAll('.price');
    prices.forEach(price => {
        price.addEventListener('click', function() {
            alert('Szczegóły produktu dostępne po kliknięciu w nazwę produktu.');
        });
    });
    
    // Licznik odwiedzin (symulacja)
    console.log('Witamy na stronie SeniorKomfort!');
    console.log('Liczba produktów w ofercie:', addButtons.length);
});

// Funkcja pomocnicza do powiększania tekstu (dostępność)
function increaseFontSize() {
    const body = document.body;
    const currentSize = parseFloat(window.getComputedStyle(body).fontSize);
    body.style.fontSize = (currentSize + 2) + 'px';
}

function decreaseFontSize() {
    const body = document.body;
    const currentSize = parseFloat(window.getComputedStyle(body).fontSize);
    if (currentSize > 14) {
        body.style.fontSize = (currentSize - 2) + 'px';
    }
}

// Eksport funkcji do globalnego zakresu
window.increaseFontSize = increaseFontSize;
window.decreaseFontSize = decreaseFontSize;
