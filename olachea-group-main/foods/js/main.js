// --- FUNCIÓN PARA ANIMAR CONTADORES ---
function animateCounter(counterId, targetNumber, suffix = '') {
    const counter = document.getElementById(counterId);
    if (!counter) return;

    const duration = 1200; // 1.2 segundos de duración
    const step = Math.ceil(targetNumber / 40); // Ajustar el paso según el número objetivo
    let current = 0;

    const updateCounter = () => {
        if (current < targetNumber) {
            current += step;
            if (current > targetNumber) current = targetNumber;
            counter.textContent = current === targetNumber ? current + suffix : current;

            // Acelerar al principio, desacelerar al final
            const progress = current / targetNumber;
            const delay = Math.max(10, duration * (1 - Math.pow(progress, 0.5)) / 15);

            setTimeout(updateCounter, delay);
        }
    };

    // Iniciar la animación cuando el elemento sea visible
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            updateCounter();
            observer.disconnect();
        }
    }, { threshold: 0.5 });

    observer.observe(counter);
}


// --- SCRIPT PRINCIPAL EJECUTADO AL CARGAR EL DOM ---
document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DEL CARRUSEL INDEPENDIENTE ---
    document.querySelectorAll('.carousel-container').forEach((carousel, idx) => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.carousel-dot');
        if (slides.length > 0 && dots.length > 0) {
            let currentSlide = 0;
            const slideCount = slides.length;

            function showSlide(index) {
                slides.forEach(slide => slide.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));
                slides[index].classList.add('active');
                dots[index].classList.add('active');
            }

            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentSlide = index;
                    showSlide(currentSlide);
                    resetTimer();
                });
            });

            function nextSlide() {
                currentSlide = (currentSlide + 1) % slideCount;
                showSlide(currentSlide);
            }

            let slideInterval = setInterval(nextSlide, 5000);

            function resetTimer() {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            }

            showSlide(currentSlide);
        }
    });

    // --- LÓGICA DE ANIMACIÓN EN SCROLL ---
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Opcional: Desconectar para que la animación ocurra solo una vez
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        element.classList.remove('is-visible');
        animationObserver.observe(element);
    });
    
    // Forzar repintado para asegurar que las transiciones se apliquen
    setTimeout(() => {
        document.body.classList.add('animations-ready');
    }, 300);


    // --- LÓGICA DE SCROLL SUAVE PARA ANCLAS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para header fijo
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- INICIALIZACIÓN DE CONTADORES ---
    animateCounter('yearsCounter', 80, '+');
    animateCounter('yearsCounter2', 80, '+');

});


// --- MANEJADORES DE EVENTOS GLOBALES (load, resize) ---
window.addEventListener('load', function() {
    // Activar animaciones para elementos ya visibles en la carga inicial
    const firstScreenElements = document.querySelectorAll('.slide-container:first-child .animate-on-scroll');
    firstScreenElements.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
            el.classList.add('is-visible');
        }
    });
});

let resizeTimer;
window.addEventListener('resize', function() {
    // Optimizar el manejador de redimensionamiento
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Forzar una actualización de las animaciones después del redimensionamiento
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => {
            const wasVisible = el.classList.contains('is-visible');
            el.style.transition = 'none';
            el.classList.remove('is-visible');
            void el.offsetWidth; // Forzar repintado
            el.style.transition = '';
            if (wasVisible) {
                el.classList.add('is-visible');
            }
        });
    }, 250);
});