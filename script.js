/* DOM Elements */
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('nav ul li a');
const contactForm = document.getElementById('contact-form');
const sendButton = document.querySelector('.send-btn');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('nav ul');
const timelineItems = document.querySelectorAll('.timeline-item');
const skillCards = document.querySelectorAll('.skill-card');
const achievementBlocks = document.querySelectorAll('.achievement-block');
const githubCards = document.querySelectorAll('.github-card');
const neuralCanvas = document.getElementById('neural-background');
const mlCanvas = document.getElementById('ml-background');
const dottedCanvas = document.getElementById('dotted-background');
const terminalCanvas = document.getElementById('terminal-background');
const contactSection = document.getElementById('contact');
const skillsSection = document.getElementById('skills');
const achievementsSection = document.getElementById('achievements');
const githubSection = document.getElementById('github');
const birthplaceItems = document.querySelectorAll('.dashboard-item');

// Mobile Menu
mobileMenuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('show');
    mobileMenuToggle.classList.toggle('active', isOpen);
    const icon = mobileMenuToggle.querySelector('i');
    icon.className = isOpen ? 'fa-solid fa-times' : 'fa-solid fa-bars';
});

// Smooth Scroll
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        window.scrollTo({
            top: targetSection.offsetTop - 70,
            behavior: 'smooth'
        });
        navMenu.classList.remove('show');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.querySelector('i').className = 'fa-solid fa-bars';
    });
});

// Scroll Animations
function handleScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const triggerPoint = window.innerHeight * 0.85;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < triggerPoint) {
            section.classList.add('visible');
        }
    });

    // Sticky Timeline
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const itemBottom = item.getBoundingClientRect().bottom;
        if (itemTop < window.innerHeight * 0.5 && itemBottom > window.innerHeight * 0.3) {
            item.classList.add('sticky');
        } else {
            item.classList.remove('sticky');
        }
    });

    // Skill Cards Freefall
    skillCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight * 0.9) {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 200);
        }
    });

    // Achievement Blocks Slide-In
    achievementBlocks.forEach((block, index) => {
        const blockTop = block.getBoundingClientRect().top;
        if (blockTop < window.innerHeight * 0.9) {
            setTimeout(() => {
                block.classList.add('visible');
                block.style.setProperty('--translate-x', index === 0 ? '-100%' : '100%');
            }, index * 300);
        }
    });

    // GitHub Cards Type-In
    githubCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight * 0.9) {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 200);
        }
    });

    // Birthplace Alignment
    const birthplaceRect = document.getElementById('birthplace').getBoundingClientRect();
    const isVisible = birthplaceRect.top < window.innerHeight && birthplaceRect.bottom > 0;
    birthplaceItems.forEach(item => {
        item.classList.toggle('aligned', isVisible);
        item.classList.toggle('floating', !isVisible);
    });

    // Parallax for Dashboard Images
    birthplaceItems.forEach(item => {
        const img = item.querySelector('.dashboard-image');
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            img.style.transform = `scale(1.2) translateY(${scrollPercent * 20 - 10}%)`;
        }
    });

    // Toggle Canvases
    const contactRect = contactSection.getBoundingClientRect();
    const skillsRect = skillsSection.getBoundingClientRect();
    const achievementsRect = achievementsSection.getBoundingClientRect();
    const githubRect = githubSection.getBoundingClientRect();
    neuralCanvas.style.display = (contactRect.top < window.innerHeight && contactRect.bottom > 0) ||
                                (skillsRect.top < window.innerHeight && skillsRect.bottom > 0) ||
                                (achievementsRect.top < window.innerHeight && achievementsRect.bottom > 0) ||
                                (githubRect.top < window.innerHeight && githubRect.bottom > 0) ? 'none' : 'block';
    mlCanvas.style.display = (skillsRect.top < window.innerHeight && skillsRect.bottom > 0) ? 'block' : 'none';
    dottedCanvas.style.display = (achievementsRect.top < window.innerHeight && achievementsRect.bottom > 0) ? 'block' : 'none';
    terminalCanvas.style.display = (githubRect.top < window.innerHeight && githubRect.bottom > 0) ? 'block' : 'none';
}

// Neural Background
function initNeuralBackground() {
    const ctx = neuralCanvas.getContext('2d');
    neuralCanvas.width = window.innerWidth;
    neuralCanvas.height = window.innerHeight;

    const nodes = [];
    const numNodes = 40;
    let mouse = { x: null, y: null };

    class Node {
        constructor() {
            this.x = Math.random() * neuralCanvas.width;
            this.y = Math.random() * neuralCanvas.height;
            this.vx = (Math.random() - 0.5) * 2.5;
            this.vy = (Math.random() - 0.5) * 2.5;
            this.radius = Math.random() * 4 + 2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > neuralCanvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > neuralCanvas.height) this.vy *= -1;

            if (mouse.x && mouse.y) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.hypot(dx, dy);
                if (dist < 150) {
                    this.vx += dx * 0.01;
                    this.vy += dy * 0.01;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 204, 102, 0.9)';
            ctx.fill();
            ctx.shadowBlur = 20;
            ctx.shadowColor = 'rgba(0, 204, 102, 0.8)';
        }
    }

    for (let i = 0; i < numNodes; i++) {
        nodes.push(new Node());
    }

    function animate() {
        ctx.clearRect(0, 0, neuralCanvas.width, neuralCanvas.height);
        nodes.forEach(node => {
            node.update();
            node.draw();
            nodes.forEach(other => {
                if (node !== other) {
                    const dist = Math.hypot(node.x - other.x, node.y - other.y);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(0, 204, 102, ${1 - dist / 150})`;
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    }
                }
            });
        });
        requestAnimationFrame(animate);
    }

    animate();

    neuralCanvas.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    neuralCanvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', () => {
        neuralCanvas.width = window.innerWidth;
        neuralCanvas.height = window.innerHeight;
    });
}

// ML Background for Skills
function initMLBackground() {
    const ctx = mlCanvas.getContext('2d');
    mlCanvas.width = window.innerWidth;
    mlCanvas.height = skillsSection.offsetHeight;

    const nodes = [];
    const numNodes = 30;
    const codeLines = ['1010', '1101', '0010', '1110', '0101', '1001'];

    class Node {
        constructor() {
            this.x = Math.random() * mlCanvas.width;
            this.y = Math.random() * mlCanvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.radius = Math.random() * 3 + 2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > mlCanvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > mlCanvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(51, 255, 153, 0.8)';
            ctx.fill();
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(51, 255, 153, 0.7)';
        }
    }

    for (let i = 0; i < numNodes; i++) {
        nodes.push(new Node());
    }

    function drawCodeRain() {
        for (let i = 0; i < 10; i++) {
            const x = Math.random() * mlCanvas.width;
            const y = Math.random() * mlCanvas.height;
            ctx.font = '12px monospace';
            ctx.fillStyle = 'rgba(0, 153, 77, 0.3)';
            ctx.fillText(codeLines[Math.floor(Math.random() * codeLines.length)], x, y);
        }
    }

    function animate() {
        ctx.clearRect(0, 0, mlCanvas.width, mlCanvas.height);
        nodes.forEach(node => {
            node.update();
            node.draw();
            nodes.forEach(other => {
                if (node !== other) {
                    const dist = Math.hypot(node.x - other.x, node.y - other.y);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(51, 255, 153, ${1 - dist / 120})`;
                        ctx.lineWidth = 1.5;
                        ctx.stroke();
                    }
                }
            });
        });
        drawCodeRain();
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        mlCanvas.width = window.innerWidth;
        mlCanvas.height = skillsSection.offsetHeight;
    });
}

// Dotted Background for Achievements
function initDottedBackground() {
    const ctx = dottedCanvas.getContext('2d');
    dottedCanvas.width = window.innerWidth;
    dottedCanvas.height = achievementsSection.offsetHeight;

    const dots = [];
    const numDots = 100;

    class Dot {
        constructor() {
            this.x = Math.random() * dottedCanvas.width;
            this.y = Math.random() * dottedCanvas.height;
            this.radius = Math.random() * 3 + 1;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = (Math.random() - 0.5) * 1.5;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > dottedCanvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > dottedCanvas.height) this.vy *= -1;
            this.opacity = 0.3 + 0.5 * Math.abs(Math.sin(Date.now() * 0.002));
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 204, 102, ${this.opacity})`;
            ctx.fill();
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(0, 204, 102, 0.6)';
        }
    }

    for (let i = 0; i < numDots; i++) {
        dots.push(new Dot());
    }

    function animate() {
        ctx.clearRect(0, 0, dottedCanvas.width, dottedCanvas.height);
        dots.forEach(dot => {
            dot.update();
            dot.draw();
            dots.forEach(other => {
                if (dot !== other) {
                    const dist = Math.hypot(dot.x - other.x, dot.y - other.y);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(dot.x, dot.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(0, 204, 102, ${0.5 - dist / 100})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            });
        });
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        dottedCanvas.width = window.innerWidth;
        dottedCanvas.height = achievementsSection.offsetHeight;
    });

    window.addEventListener('scroll', () => {
        const rect = achievementsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            dots.forEach(dot => {
                dot.y += scrollPercent * 0.5;
            });
        }
    });
}

function initTerminalBackground() {
    const ctx = terminalCanvas.getContext('2d');
    terminalCanvas.width = window.innerWidth;
    terminalCanvas.height = githubSection.offsetHeight;

    const lines = ['git commit -m "Update"','merge conflict','skill issue','git commit -m "Crimes"', 'npm install', 'python train.py', 'docker build .'];
    const chars = [];

    class Char {
        constructor(index) {
            // Distribute x positions: 1/3 left, 1/3 center, 1/3 right
            const third = terminalCanvas.width / 3;
            const region = index % 3; // Cycle through left, center, right
            if (region === 0) {
                this.x = Math.random() * third; // Left third
            } else if (region === 1) {
                this.x = third + Math.random() * third; // Center third
            } else {
                this.x = 2 * third + Math.random() * third; // Right third
            }
            this.y = Math.random() * terminalCanvas.height; // Random start y
            this.text = lines[Math.floor(Math.random() * lines.length)];
            this.opacity = Math.random() * 0.4 + 0.2;
            this.vy = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.y += this.vy;
            if (this.y > terminalCanvas.height) this.y = 0; // Reset to top
            this.opacity = 0.2 + 0.4 * Math.abs(Math.sin(Date.now() * 0.002));
        }

        draw() {
            ctx.font = '14px monospace';
            ctx.fillStyle = `rgba(0, 204, 102, ${this.opacity})`;
            ctx.fillText(this.text, this.x, this.y);
        }
    }

    // Increase to 30 chars for better coverage
    for (let i = 0; i < 30; i++) {
        chars.push(new Char(i));
    }

    function animate() {
        ctx.fillStyle = 'rgba(10, 14, 20, 0.2)';
        ctx.fillRect(0, 0, terminalCanvas.width, terminalCanvas.height);
        chars.forEach(char => {
            char.update();
            char.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        terminalCanvas.width = window.innerWidth;
        terminalCanvas.height = githubSection.offsetHeight;
    });
}

// Birthplace Floating
function initBirthplaceFloating() {
    birthplaceItems.forEach((item, index) => {
        const floatX = `${(index % 4 - 2) * 10}%`;
        const floatY = `${(Math.floor(index / 4) - 1) * 10}%`;
        const floatRotate = `${(index % 2 === 0 ? 1 : -1) * 15}deg`;
        item.style.setProperty('--float-x', floatX);
        item.style.setProperty('--float-y', floatY);
        item.style.setProperty('--float-rotate', floatRotate);

        item.addEventListener('mouseenter', () => {
            item.classList.add('aligned');
            item.classList.remove('floating');
        });

        item.addEventListener('mouseleave', () => {
            const birthplaceRect = document.getElementById('birthplace').getBoundingClientRect();
            if (birthplaceRect.top >= window.innerHeight || birthplaceRect.bottom <= 0) {
                item.classList.add('floating');
                item.classList.remove('aligned');
            }
        });
    });
}

// Header Scroll
function updateHeaderOnScroll() {
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(10, 14, 20, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
    } else {
        header.style.backgroundColor = 'rgba(10, 14, 20, 0.9)';
        header.style.boxShadow = 'none';
    }
}

// Active Navigation
function updateNavActive() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 80;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        sendButton.classList.add('sent');
        setTimeout(() => {
            sendButton.classList.remove('sent');
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            alert(`Thanks ${name}! I’ll ping you at ${email} soon!`);
            contactForm.reset();
        }, 1000);
    });
}

// Event Tracking Function
function initEventTracking() {
    // Helper function to determine the type of event object
    function getEventObjectType(element) {
        if (element.tagName === 'A') {
            if (element.classList.contains('mobile-menu-toggle') || element.closest('nav')) return 'nav-link';
            if (element.classList.contains('btn')) return 'button';
            if (element.classList.contains('social-links')) return 'social-link';
            return 'link';
        }
        if (element.tagName === 'BUTTON') {
            if (element.classList.contains('mobile-menu-toggle')) return 'menu-toggle';
            if (element.classList.contains('send-btn')) return 'submit-button';
            return 'button';
        }
        if (element.tagName === 'IMG') return 'image';
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') return 'form-input';
        if (element.tagName === 'CANVAS') return 'canvas';
        if (element.classList.contains('timeline-item')) return 'timeline-item';
        if (element.classList.contains('skill-card')) return 'skill-card';
        if (element.classList.contains('achievement-block')) return 'achievement-block';
        if (element.classList.contains('github-card')) return 'github-card';
        if (element.classList.contains('dashboard-item')) return 'dashboard-item';
        if (element.tagName === 'DIV' || element.tagName === 'P' || element.tagName === 'SPAN' || element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'H3') return 'text';
        return 'element';
    }

    // Click event listener for the entire document
    document.addEventListener('click', (e) => {
        const timestamp = new Date().toISOString();
        const eventType = 'click';
        const eventObject = getEventObjectType(e.target);
        console.log(`${timestamp}, ${eventType}, ${eventObject}`);
    });

    // Intersection Observer for page view tracking
    const observerOptions = {
        root: null,
        threshold: 0.5 // Trigger when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const timestamp = new Date().toISOString();
                const eventType = 'view';
                let eventObject = 'section';
                
                // Identify specific sections
                if (entry.target.id === 'home') eventObject = 'hero-section';
                else if (entry.target.id === 'about') eventObject = 'about-section';
                else if (entry.target.id === 'birthplace') eventObject = 'birthplace-section';
                else if (entry.target.id === 'education') eventObject = 'education-section';
                else if (entry.target.id === 'achievements') eventObject = 'achievements-section';
                else if (entry.target.id === 'github') eventObject = 'github-section';
                else if (entry.target.id === 'skills') eventObject = 'skills-section';
                else if (entry.target.id === 'contact') eventObject = 'contact-section';
                
                console.log(`${timestamp}, ${eventType}, ${eventObject}`);
                
                // Optional: Unobserve after first view to avoid repeated logs
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initNeuralBackground();
    initMLBackground();
    initDottedBackground();
    initTerminalBackground();
    initBirthplaceFloating();
    updateNavActive();
    handleScrollAnimations();
    initEventTracking();

    window.addEventListener('scroll', () => {
        updateHeaderOnScroll();
        updateNavActive();
        handleScrollAnimations();
    });
});