// --- I18N SCRIPT --- //

// 1. Función principal para traducir todo el contenido
const translatePage = () => {
    if (!window.i18next) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerHTML = window.i18next.t(key);
    });
    document.documentElement.lang = window.i18next.language;
};

// 2. Función para cambiar el idioma
const changeLanguage = (lang) => {
    if (!window.i18next) return;
    window.i18next.changeLanguage(lang, (err) => {
        if (err) return console.error(`Error changing language to ${lang}:`, err);
        localStorage.setItem('language', lang);
        translatePage(); // Llama a la función principal de traducción
    });
};

// 3. Inicialización y configuración de i18next
const initI18n = async () => {
    try {
        // Carga los scripts de i18next
        await Promise.all([
            loadScript('https://cdn.jsdelivr.net/npm/i18next@23.11.5/dist/umd/i18next.min.js'),
            loadScript('https://cdn.jsdelivr.net/gh/i18next/i18next-http-backend@2.5.0/i18nextHttpBackend.min.js')
        ]);

        // Inicializa i18next
        await window.i18next
            .use(window.i18nextHttpBackend)
            .init({
                lng: localStorage.getItem('language') || navigator.language.split('-')[0] || 'en',
                fallbackLng: 'en',
                debug: true, // Reactivar logs para un diagnóstico detallado
                backend: {
                    loadPath: '/locales/{{lng}}/translation.json'
                }
            });

        // Traduce la página por primera vez
        translatePage();

        // Observa si se cargan el header/footer y vuelve a traducir
        const observer = new MutationObserver(() => translatePage());
        const headerPlaceholder = document.getElementById('header-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (headerPlaceholder) observer.observe(headerPlaceholder, { childList: true });
        if (footerPlaceholder) observer.observe(footerPlaceholder, { childList: true });

    } catch (error) {
        console.error("Failed to initialize i18next:", error);
    }
};

// Función auxiliar para cargar scripts
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// --- INICIO DE LA EJECUCIÓN ---

// Asigna un único listener de clics al body para los botones de idioma
document.body.addEventListener('click', (event) => {
    const langButton = event.target.closest('[data-lang]');
    if (langButton) {
        changeLanguage(langButton.getAttribute('data-lang'));
    }
});

// Inicia todo el proceso cuando el DOM está listo
document.addEventListener('DOMContentLoaded', initI18n);
