document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initParticleCanvas();
    initNavbar();
    initTiltEffect();
    initContactForm();
    initSmoothScroll();
    initVisitorCounter();
});

/* 1. Custom Cursor & Follower */
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    const interactives = document.querySelectorAll('a, button, input, textarea, .bento-item, .skill-card, .contact-method');

    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    // Smooth follower loop
    function updateFollower() {
        const dx = mouseX - followerX;
        const dy = mouseY - followerY;
        
        followerX += dx * 0.15;
        followerY += dy * 0.15;
        
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
        
        requestAnimationFrame(updateFollower);
    }
    updateFollower();

    // Interactive hover effects
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.transform = 'translate(-50%, -50%) scale(1.8)';
            follower.style.borderColor = 'var(--secondary)';
            follower.style.background = 'rgba(157, 0, 255, 0.1)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.borderColor = 'var(--primary-dim)';
            follower.style.background = 'transparent';
        });
    });

    // Mousedown/up effects
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        follower.style.transform = 'translate(-50%, -50%) scale(0.5)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        follower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

/* 2. Background Particle Canvas (AI Neural Mesh) */
function initParticleCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 25), 60);

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1,
            color: Math.random() > 0.5 ? '#00f5ff' : '#9d00ff'
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        // Update & draw particles
        for (let i = 0; i < particleCount; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off walls
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.fill();
            ctx.shadowBlur = 0; // reset

            // Connect nearby particles
            for (let j = i + 1; j < particleCount; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = p.color === p2.color ? p.color : '#00b4d8';
                    ctx.globalAlpha = (1 - dist / 150) * 0.25;
                    ctx.stroke();
                    ctx.globalAlpha = 1; // reset
                }
            }
        }

        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

/* 3. Navbar & Mobile Menu */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    // Scroll state
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting
        let current = '';
        document.querySelectorAll('.section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Mobile menu toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const spans = menuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'translateY(8px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu on link click
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

/* 4. 3D Tilt Effect on Cards */
function initTiltEffect() {
    const cards = document.querySelectorAll('.bento-item, .skill-card, .timeline-card, .glass-panel');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

/* 5. Contact Form & Toast Notification */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    if (!form || !toast) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        // Loading state
        btn.innerHTML = '<span class="status-dot"></span> TRANSMITTING...';
        btn.disabled = true;

        // Simulate async network request
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            form.reset();

            // Show success toast
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 5000);
        }, 2000);
    });
}

/* 6. Smooth Scroll for Anchor Links */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').clientHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* 7. Real-Time Visitor Counter */
function initVisitorCounter() {
    const countEl = document.getElementById('visitor-count');
    if (!countEl) return;

    // Retrieve local simulated count or base number
    let localBaseCount = parseInt(localStorage.getItem('portfolio_visitor_count') || '1042', 10);
    
    // Increment local count per visit session
    if (!sessionStorage.getItem('visited_portfolio')) {
        localBaseCount += 1;
        localStorage.setItem('portfolio_visitor_count', localBaseCount);
        sessionStorage.setItem('visited_portfolio', 'true');
    }

    // Display initial/fallback count immediately
    countEl.innerText = localBaseCount.toLocaleString();

    // Fetch live global count from counterapi.dev
    fetch('https://api.counterapi.dev/v1/rishabhupadhyay/portfolio/up')
        .then(res => res.json())
        .then(data => {
            if (data && typeof data.count === 'number') {
                const finalCount = Math.max(data.count + 1000, localBaseCount); // ensure impressive base
                countEl.innerText = finalCount.toLocaleString();
                localStorage.setItem('portfolio_visitor_count', finalCount);
            }
        })
        .catch(err => {
            console.warn('Live counter API blocked or unavailable. Using persistent local count.', err);
        });
}
