// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const navLinksItems = document.querySelectorAll('.nav-link');
const caseFilters = document.querySelectorAll('.filter-btn');
const caseItems = document.querySelectorAll('.case-item');
const statCards = document.querySelectorAll('.stat-card');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        document.body.style.overflow = 'auto';
    }, 2000);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinksItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Case Studies Filtering
caseFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Remove active class from all filters
        caseFilters.forEach(f => f.classList.remove('active'));
        // Add active class to clicked filter
        filter.classList.add('active');
        
        const filterValue = filter.getAttribute('data-filter');
        
        caseItems.forEach(item => {
            const itemYear = item.getAttribute('data-year');
            
            if (filterValue === 'all' || filterValue === itemYear) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Interactive Stats Cards
statCards.forEach(card => {
    card.addEventListener('click', () => {
        card.style.transform = 'translateY(-10px) scale(1.05)';
        card.style.boxShadow = '0 30px 50px rgba(99, 102, 241, 0.3)';
        
        setTimeout(() => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.2)';
        }, 300);
    });
});

// Attack Type Cards Interaction
const attackTypeCards = document.querySelectorAll('.attack-type-card');
if (attackTypeCards.length > 0) {
    attackTypeCards.forEach(card => {
        // Click effect
        card.addEventListener('click', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 30px 50px rgba(99, 102, 241, 0.3)';
            
            setTimeout(() => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 25px 50px rgba(99, 102, 241, 0.2)';
            }, 300);
        });
        
        // Add to observer for scroll animation
        observer.observe(card);
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animate Elements on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements to animate
document.querySelectorAll('.attack-card, .impact-card, .tip-card').forEach(card => {
    observer.observe(card);
});

// Terminal Typing Effect
function typeTerminalText() {
    const lines = document.querySelectorAll('.code-line');
    lines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        line.style.width = '0';
        
        setTimeout(() => {
            let i = 0;
            const typeChar = () => {
                if (i < text.length) {
                    line.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeChar, 50);
                }
            };
            typeChar();
        }, index * 1000);
    });
}

// Initialize terminal effect after load
setTimeout(typeTerminalText, 3000);

// Copy to Clipboard Functionality
const emergencyBtn = document.querySelector('.emergency-btn');
emergencyBtn?.addEventListener('click', (e) => {
    if (e.target.closest('.emergency-btn')) {
        e.preventDefault();
        const phoneNumber = '02152903769';
        navigator.clipboard.writeText(phoneNumber).then(() => {
            const originalText = emergencyBtn.innerHTML;
            emergencyBtn.innerHTML = '<i class="fas fa-check"></i> Nomor Disalin!';
            emergencyBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            setTimeout(() => {
                emergencyBtn.innerHTML = originalText;
                emergencyBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            }, 2000);
        });
    }
});

// Floating Elements Animation
function animateFloatingElements() {
    const elements = document.querySelectorAll('.floating-element');
    elements.forEach((el, index) => {
        const randomX = Math.random() * 20 - 10;
        const randomY = Math.random() * 20 - 10;
        el.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
}

setInterval(animateFloatingElements, 100);

// Real-time Clock
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const dateString = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const clockElement = document.getElementById('realTimeClock');
    if (!clockElement) {
        const clockDiv = document.createElement('div');
        clockDiv.id = 'realTimeClock';
        clockDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(17, 24, 39, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(99, 102, 241, 0.2);
            border-radius: 10px;
            padding: 10px 15px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9rem;
            color: #94a3b8;
            z-index: 100;
            display: none;
        `;
        document.body.appendChild(clockDiv);
    }
    
    document.getElementById('realTimeClock').innerHTML = `
        <div style="color: #6366f1; font-weight: bold;">${timeString}</div>
        <div style="font-size: 0.8rem;">${dateString}</div>
    `;
}

// Show clock on mouse move
let mouseMoveTimer;
document.addEventListener('mousemove', () => {
    const clock = document.getElementById('realTimeClock');
    if (clock) {
        clock.style.display = 'block';
        clearTimeout(mouseMoveTimer);
        mouseMoveTimer = setTimeout(() => {
            clock.style.display = 'none';
        }, 3000);
    }
});

// Initialize clock
setInterval(updateClock, 1000);
updateClock();