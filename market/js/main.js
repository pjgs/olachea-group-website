// --- FUNCIÓN PARA ANIMAR ELEMENTOS AL HACER SCROLL ---
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0) scale(1)';
        }
    });
}

// --- OBSERVER PARA ANIMACIONES AL HACER SCROLL ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// --- INICIALIZAR ANIMACIONES ---
document.addEventListener('DOMContentLoaded', function() {
    // Configurar observador para elementos con animación
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in').forEach(element => {
        observer.observe(element);
    });
    
    // Configurar evento de scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Ejecutar una vez al cargar para elementos visibles
    animateOnScroll();
});
