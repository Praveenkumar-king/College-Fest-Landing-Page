// Scroll Interactions Controller - Vortex College Fest

document.addEventListener('DOMContentLoaded', () => {
    initScrollProgressBar();
    initStickyHeader();
    initBackToTopScroll();
    initSmoothNavigation();
    initScrollSpy();
});

// Scroll Progress Indicator
function initScrollProgressBar() {
    const bar = document.createElement('div');
    bar.id = 'scroll-progress';
    bar.className = 'scroll-progress-bar';
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        bar.style.width = scrolled + '%';
    });
}

// Sticky Header
function initStickyHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Floating Back to Top Button
function initBackToTopScroll() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scroll linking for anchors
function initSmoothNavigation() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const targetSec = document.querySelector(targetId);
            if (targetSec) {
                e.preventDefault();
                
                // Subtract header height for perfect spacing
                const headerOffset = 80;
                const elementPosition = targetSec.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu
                const toggle = document.getElementById('menu-toggle');
                const navLinks = document.getElementById('nav-links');
                if (toggle && navLinks) {
                    toggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}

// Scroll Spy to highlight active section in Navbar
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (sections.length === 0 || navLinks.length === 0) return;

    window.addEventListener('scroll', () => {
        let currentSectionId = '';

        sections.forEach(sec => {
            const secTop = sec.offsetTop;
            
            // Highlight when section occupies the upper part of viewport
            if (window.pageYOffset >= (secTop - 120)) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}
