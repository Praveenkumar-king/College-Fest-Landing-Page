// Core Application Controller - Vortex College Fest

document.addEventListener('DOMContentLoaded', () => {
    initCursorParticles();
    initBackgroundGlow();
    initCountdownTimer();
    initFaqAccordion();
    initFormHandlers();
});

// Canvas-Based Custom Cursor & Particle Trail
function initCursorParticles() {
    // Disable on touch screens
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    // Create custom cursor elements
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    // Create Canvas for particle trails
    const canvas = document.createElement('canvas');
    canvas.id = 'cursor-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99998';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    const particles = [];
    // User requested: glowing royal-blue and gold sparks
    const colors = ['#0072ff', '#ffd700', '#00d2ff', '#ffffff'];

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;

        // Spawn particles based on movement velocity
        const speed = Math.sqrt(Math.pow(e.movementX, 2) + Math.pow(e.movementY, 2));
        if (speed > 1) {
            const count = Math.min(Math.floor(speed / 4) + 1, 3);
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: mouseX,
                    y: mouseY,
                    size: Math.random() * 3.5 + 1.5,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    vx: (Math.random() - 0.5) * 1.8,
                    vy: (Math.random() - 0.5) * 1.8 - 0.5, // slight upward drift
                    alpha: 1,
                    decay: Math.random() * 0.02 + 0.015
                });
            }
        }
    });

    // Lagging cursor ring follower
    function animateCursor() {
        const delay = 0.14;
        cursorX += (mouseX - cursorX) * delay;
        cursorY += (mouseY - cursorY) * delay;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Canvas particle render loop
    function updateParticles() {
        ctx.clearRect(0, 0, w, h);

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                particles.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.shadowBlur = 8;
            ctx.shadowColor = p.color;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
        requestAnimationFrame(updateParticles);
    }
    updateParticles();

    // Scale cursor on hover
    const hoverSelectors = 'a, button, input, textarea, select, .category-card, .comp-card, .speaker-card, .faq-question';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverSelectors)) {
            cursor.classList.add('hover');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(hoverSelectors)) {
            cursor.classList.remove('hover');
        }
    });

    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
    });
}

// Background Parallax Glow Blobs
function initBackgroundGlow() {
    const blobs = document.querySelectorAll('.glow-blob');
    if (blobs.length === 0) return;

    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const w = window.innerWidth;
        const h = window.innerHeight;

        const moveX = ((clientX / w) - 0.5) * 30;
        const moveY = ((clientY / h) - 0.5) * 30;

        blobs.forEach((blob, idx) => {
            const multiplier = (idx + 1) * 0.4;
            const x = moveX * multiplier;
            const y = moveY * multiplier;

            if (blob.classList.contains('glow-blob-1')) {
                blob.style.transform = `translate(${x}px, ${y}px)`;
            } else if (blob.classList.contains('glow-blob-2')) {
                blob.style.transform = `translate(${x}px, ${y}px)`;
            } else {
                blob.style.transform = `translate(${-50 + x}%, ${-50 + y}%)`;
            }
        });
    });
}

// Countdown Timer until Vortex 2026 Starts (e.g. 45 days in the future)
function initCountdownTimer() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    // Set countdown target date (45 days in the future from current time)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 45);

    function updateTimer() {
        const now = new Date().getTime();
        const difference = targetDate.getTime() - now;

        if (difference <= 0) {
            daysEl.innerText = '00';
            hoursEl.innerText = '00';
            minutesEl.innerText = '00';
            secondsEl.innerText = '00';
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysEl.innerText = days < 10 ? '0' + days : days;
        hoursEl.innerText = hours < 10 ? '0' + hours : hours;
        minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
        secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// FAQ Accordion
function initFaqAccordion() {
    const questions = document.querySelectorAll('.faq-question');

    questions.forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');

            // Close all active items
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = '0px';
            });

            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = `${answer.scrollHeight}px`;
            }
        });
    });
}

// Form Handlers & Toasts
function initFormHandlers() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Registration successful! Fest Pass sent to email.', 'success');
            form.reset();
        });
    });
}

// Toast Notifier Utility
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container') || createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
            <span class="toast-message">${message}</span>
        </div>
        <button class="toast-close">&times;</button>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);

    const timer = setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);

    toast.querySelector('.toast-close').addEventListener('click', () => {
        clearTimeout(timer);
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
    return container;
}

window.showToast = showToast;
