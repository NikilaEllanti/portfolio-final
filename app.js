// DOM Elements
const themeToggleBtn = document.querySelector('.theme-toggle');
const body = document.body;
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('nav ul li a');
const contactForm = document.getElementById('contact-form');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('nav ul');

// Theme Management
function initializeTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        body.classList.toggle('light-theme', storedTheme === 'light');
    } else {
        body.classList.toggle('light-theme', !prefersDark);
    }
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeIcon = themeToggleBtn.querySelector('i');
    themeIcon.className = body.classList.contains('light-theme') ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
});

// Mobile Menu Toggle
mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    const icon = mobileMenuToggle.querySelector('i');
    icon.className = navMenu.classList.contains('show') ? 'fa-solid fa-times' : 'fa-solid fa-bars';
});

// Smooth Scroll Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        window.scrollTo({
            top: targetSection.offsetTop - 60,
            behavior: 'smooth'
        });
        navMenu.classList.remove('show');
        mobileMenuToggle.querySelector('i').className = 'fa-solid fa-bars';
    });
});

// Scroll Animations
function handleScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const triggerPoint = window.innerHeight * 0.8;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < triggerPoint) {
            section.classList.add('visible');
        }
    });
}

// Neural Network Background
function initNeuralBackground() {
    const canvas = document.getElementById('neural-background');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes = [];
    const numNodes = 20;

    class Node {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 255, 136, 0.5)';
            ctx.fill();
        }
    }

    for (let i = 0; i < numNodes; i++) {
        nodes.push(new Node());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        nodes.forEach(node => {
            node.update();
            node.draw();
            nodes.forEach(other => {
                if (node !== other) {
                    const dist = Math.hypot(node.x - other.x, node.y - other.y);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = 'rgba(0, 255, 136, 0.2)';
                        ctx.stroke();
                    }
                }
            });
        });
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Header Scroll Effect
function updateHeaderOnScroll() {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        header.style.backgroundColor = 'rgba(13, 15, 22, 0.95)';
    } else {
        header.style.boxShadow = 'none';
        header.style.backgroundColor = 'rgba(13, 15, 22, 0.8)';
    }
}

// Active Navigation
function updateNavActive() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

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
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        alert(`Thanks ${name}! Your message has been received. I'll get back to you at ${email} soon!`);
        contactForm.reset();
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initNeuralBackground();
    updateNavActive();
    handleScrollAnimations();

    window.addEventListener('scroll', () => {
        updateHeaderOnScroll();
        updateNavActive();
        handleScrollAnimations();
    });
});