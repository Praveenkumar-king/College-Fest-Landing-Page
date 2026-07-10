// Scroll Reveal Animations - Vortex College Fest

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
});

function initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
        // Fallback: immediately reveal all elements
        document.querySelectorAll('.reveal').forEach(el => {
            el.classList.add('reveal-active');
        });
        return;
    }

    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });
}
// Mobile Navbar Toggle menu
const toggle = document.getElementById('menu-toggle');
const links = document.getElementById('nav-links');

if (toggle && links) {
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        links.classList.toggle('active');
    });
}
