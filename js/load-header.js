// Function to load header content - v2.0 (Dynamic paths for GitHub Pages and SiteGround)
// Función para obtener la ruta base según el entorno
function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/olachea-group-website/')) {
        return '/olachea-group-website';
    }
    return '';
}

function loadHeader() {
    // Get the current page path to set active link
    const currentPath = window.location.pathname;
    const basePath = getBasePath();

    // Create the header HTML structure with dynamic paths
    const headerHTML = `
        <div class="header-container">
            <a href="${basePath}/" class="logo-link">
                <img src="${basePath}/images/logo_horizontal.png" alt="Olachea Group Logo" class="logo">
            </a>
            
            <!-- Mobile Menu Button -->
            <button class="mobile-menu-btn" aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </button>
            
            <!-- Mobile Menu Overlay -->
            <div class="mobile-menu-overlay">
                <div class="mobile-menu-container">
                    <nav class="mobile-menu-nav">
                            <li><a href="${basePath}/" class="mobile-nav-link ${currentPath === basePath + '/' || currentPath === '/' ? 'active' : ''}" data-i18n="nav_home">Home</a></li>
                            <li><a href="${basePath}/about_us/" class="mobile-nav-link ${currentPath.includes('about') ? 'active' : ''}" data-i18n="nav_about">About Us</a></li>
                            <li><a href="${basePath}/contact/" class="mobile-nav-link ${currentPath.includes('contact') ? 'active' : ''}" data-i18n="nav_contact">Contact</a></li>
                            <li><a href="${basePath}/foods/blog/" class="mobile-nav-link ${currentPath.includes('blog') ? 'active' : ''}" data-i18n="nav_blog"><img src="${basePath}/images/blog.png" alt="Blog" style="display: inline-block; vertical-align: middle; margin-right: 5px; width: 16px; height: 16px;">Blog</a></li>
                            <li>
                                <a href="https://olacheagroup.com/webmail/log-in" class="user-login-mobile" target="_blank" rel="noopener noreferrer">
                                    <div class="mobile-user-icon-wrapper">
                                        <img src="${basePath}/images/user-svgrepo-com.svg" alt="User Login" class="mobile-user-icon">
                                    </div>
                                    LOGIN
                                </a>
                            </li>
                        </nav>
                </div>
            </div>
            
            <!-- Navigation Menu -->
            <nav class="main-nav">
                <ul class="nav-links">
                    <li><a href="${basePath}/" class="nav-link ${currentPath === basePath + '/' || currentPath === '/' ? 'active' : ''}" id="homeLink" data-i18n="nav_home">Home</a></li>
                    <li><a href="${basePath}/about_us/" class="nav-link ${currentPath.includes('about') ? 'active' : ''}" id="aboutLink" data-i18n="nav_about">About Us</a></li>
                    <li><a href="${basePath}/contact/" class="nav-link ${currentPath.includes('contact') ? 'active' : ''}" id="contactLink" data-i18n="nav_contact">Contact</a></li>
                    <li><a href="${basePath}/foods/blog/" class="nav-link ${currentPath.includes('blog') ? 'active' : ''}" id="blogLink" data-i18n="nav_blog"><img src="${basePath}/images/blog.png" alt="Blog" style="display: inline-block; vertical-align: middle; margin-right: 5px; width: 16px; height: 16px;">Blog</a></li>
                </ul>
                <!-- User Login Icon (Desktop) -->
                <div class="user-login-container">
                    <a href="https://olacheagroup.com/webmail/log-in" class="user-login-link" target="_blank" rel="noopener noreferrer">
                        <div class="user-icon-wrapper">
                            <img src="${basePath}/images/user-svgrepo-com.svg" alt="User Login" class="user-icon">
                        </div>
                    </a>
                </div>
            </nav>
        </div>
    `;

    // Insert the header HTML
    const headerElement = document.getElementById('main-header');
    if (headerElement) {
        headerElement.outerHTML = `<header class="main-header">${headerHTML}</header>`;
        initMobileMenu();

        // Add click event to home link
        const homeLink = document.getElementById('homeLink');
        if (homeLink) {
            homeLink.addEventListener('click', (e) => {
                const basePath = getBasePath();
                // If already on home page, prevent default and scroll to top
                if (window.location.pathname === basePath + '/' ||
                    window.location.pathname === '/' ||
                    window.location.pathname === basePath) {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
                // If on a different page, the default link behavior will take over
            });
        }

        // Add click event to about link (Esta lógica ya era correcta)
        const aboutLink = document.getElementById('aboutLink');
        if (aboutLink) {
            aboutLink.addEventListener('click', (e) => {
                // If already on about page, prevent default and scroll to top
                if (window.location.pathname.includes('about')) {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }
}

// Initialize mobile menu functionality (Sin cambios en esta función)
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const body = document.body;

    if (!menuBtn || !mobileMenu) return;

    function toggleMenu() {
        const isOpening = !menuBtn.classList.contains('active');

        // Toggle active class on menu button and overlay
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');

        // Add/remove active class to menu items for animation
        const menuItems = document.querySelectorAll('.mobile-menu-nav li');
        if (isOpening) {
            menuItems.forEach((item, index) => {
                item.style.transitionDelay = `${0.1 * (index + 1)}s`;
            });
        } else {
            menuItems.forEach((item, index) => {
                item.style.transitionDelay = `${0.05 * (menuItems.length - index)}s`;
            });
        }
    }

    // Toggle menu on button click
    menuBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (mobileMenu.classList.contains('active') &&
            !mobileMenu.contains(e.target) &&
            !menuBtn.contains(e.target)) {
            toggleMenu();
        }
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.mobile-menu-nav a').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Close menu on window resize
    function handleResize() {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    }

    window.addEventListener('resize', handleResize);
}

// Load header when DOM is fully loaded (Sin cambios aquí)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    loadHeader();
}
