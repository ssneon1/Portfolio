// script.js

document.addEventListener('DOMContentLoaded', () => {
    // ===== Initialize Everything =====
    initLoader();
    // initTheme(); // Removed to support dark mode only
    // initNavigation(); // Disabled to use the new CardNavigation
    initParticles();
    initAnimations();
    initContactForm();
    initCounters();
    initProjectsFilter();
    initBackToTop();
    initCurrentYear();
    initChatbot();

    // ===== Loader =====
    function initLoader() {
        const loader = document.querySelector('.loader');
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';

            // Initialize animations after loader is hidden
            setTimeout(() => {
                animateOnScroll();
                initTypingEffect();
                animateSkills();
                animateExperience();
            }, 500);
        }, 1500);
    }

    // ===== Particles Background =====
    function initParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }

        function createParticle() {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            const size = Math.random() * 10 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            const opacity = Math.random() * 0.3 + 0.1;

            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                border-radius: 50%;
                left: ${posX}%;
                top: ${posY}%;
                opacity: ${opacity};
                animation: float ${duration}s ease-in-out ${delay}s infinite;
                filter: blur(${size / 3}px);
            `;

            particlesContainer.appendChild(particle);

            const styleCheck = document.getElementById('particle-style');
            if (!styleCheck) {
                const style = document.createElement('style');
                style.id = 'particle-style';
                style.textContent = `
                    @keyframes float {
                        0%, 100% { transform: translateY(0) rotate(0deg); }
                        50% { transform: translateY(-20px) rotate(180deg); }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }

    // ===== Typing Effect =====
    function initTypingEffect() {
        const titleCursor = document.querySelector('.title-cursor');
        if (!titleCursor) return;

        const texts = ["Full-Stack Developer", "AWS Cloud Enthusiast", "Team Lead & Mentor", "Problem Solver"];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;

        function type() {
            const currentText = texts[textIndex];
            if (isDeleting) charIndex--; else charIndex++;

            const displayedText = currentText.substring(0, charIndex);
            document.querySelector('.hero-subtitle .type-text').textContent = displayedText;

            let typeSpeed = 100;
            if (isDeleting) typeSpeed /= 2;

            if (!isDeleting && charIndex === currentText.length) {
                isEnd = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isEnd = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            if (isEnd) isDeleting = true; else if (isDeleting && charIndex === 0) isDeleting = false;
            setTimeout(type, typeSpeed);
        }
        setTimeout(type, 1000);
    }

    // ===== Animations =====
    function initAnimations() {
        const animatedElements = document.querySelectorAll('.skill, .project-card, .timeline-item');
        animatedElements.forEach((el, index) => { el.style.animationDelay = `${index * 0.1}s`; });
    }

    function animateOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.skill, .project-card, .timeline-item').forEach(el => observer.observe(el));
    }

    function animateSkills() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skill = entry.target;
                    const level = skill.getAttribute('data-level');
                    const progressBar = skill.querySelector('.skill-progress');
                    setTimeout(() => { progressBar.style.width = `${level}%`; }, 300);
                    observer.unobserve(skill);
                }
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('.skill').forEach(skill => observer.observe(skill));
    }

    function animateExperience() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        document.querySelectorAll('.timeline-item').forEach(item => observer.observe(item));
    }

    // ===== Contact Form =====
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        const formSuccess = document.getElementById('formSuccess');
        if (!contactForm) return;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            try {
                const response = await fetch("https://formspree.io/f/mjgebard", {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    contactForm.style.display = 'none';
                    formSuccess.style.display = 'block';
                    contactForm.reset();
                    setTimeout(() => { formSuccess.style.display = 'none'; contactForm.style.display = 'block'; }, 5000);
                } else throw new Error('Network response failed');
            } catch (error) {
                alert('Error sending message. Please try again later.');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // ===== Counters =====
    function initCounters() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-count');
                    let count = 0;
                    const increment = target / 200;
                    const updateCount = () => {
                        if (count < target) {
                            count += increment;
                            counter.innerText = Math.ceil(count);
                            setTimeout(updateCount, 1);
                        } else counter.innerText = target;
                    };
                    updateCount();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('.stat-number').forEach(counter => observer.observe(counter));
    }

    // ===== Projects Filter =====
    function initProjectsFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');
                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => { card.style.display = 'none'; }, 300);
                    }
                });
            });
        });
    }

    // ===== Back to Top =====
    function initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) backToTopBtn.classList.add('visible');
            else backToTopBtn.classList.remove('visible');
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== Current Year =====
    function initCurrentYear() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) yearElement.textContent = new Date().getFullYear();
    }

    // ===== Mobile App Shell Logic =====
    function initMobileShell() {
        const sections = document.querySelectorAll('section');
        const sectionTitle = document.querySelector('.mobile-section-title');
        const tabItems = document.querySelectorAll('.tab-item');

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    // Update Title
                    if (sectionTitle) {
                        const titleEl = entry.target.querySelector('.section-title');
                        const titleText = titleEl ? titleEl.textContent : (id.charAt(0).toUpperCase() + id.slice(1));
                        sectionTitle.textContent = titleText === 'Hero' ? 'Home' : titleText;
                    }

                    // Update Tab active state
                    tabItems.forEach(tab => {
                        tab.classList.remove('active');
                        if (tab.getAttribute('href') === `#${id}`) {
                            tab.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.3 });

        sections.forEach(section => sectionObserver.observe(section));

        // Smooth Scroll for tabs
        tabItems.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const targetId = tab.getAttribute('href');
                if (targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        window.scrollTo({
                            top: targetSection.offsetTop - 85,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // Initialize Mobile Shell
    if (window.innerWidth <= 768) {
        initMobileShell();
    }

    // ===== Chatbot Init =====
    function initChatbot() {
        if (document.getElementById('chatbot')) {
            window.portfolioChatbot = new PortfolioChatbot();
        }
    }

    // ===== Tech Stack Scroller =====
    const techLogos = [
        { icon: 'fab fa-python', title: 'Python', href: 'https://www.python.org' },
        { icon: 'fas fa-database', title: 'SQL', href: '#' },
        { icon: 'fab fa-aws', title: 'AWS', href: 'https://aws.amazon.com' },
        { icon: 'fas fa-flask', title: 'Flask', href: 'https://flask.palletsprojects.com' },
        { icon: 'fab fa-js', title: 'JavaScript', href: '#' },
        { icon: 'fab fa-html5', title: 'HTML5', href: '#' },
        { icon: 'fab fa-css3-alt', title: 'CSS3', href: '#' },
        { icon: 'fab fa-git-alt', title: 'Git', href: 'https://git-scm.com' },
        { icon: 'fab fa-docker', title: 'Docker', href: 'https://www.docker.com' },
        { icon: 'fab fa-linux', title: 'Linux', href: '#' }
    ];

    if (document.getElementById('logoContainer')) {
        new LogoLoop('logoContainer', { logos: techLogos, speed: 50, logoSize: '1.8rem', gap: '2rem' });
    }
});

/* ===== Classes ===== */

class PortfolioChatbot {
    constructor() {
        this.chatbot = document.getElementById('chatbot');
        this.trigger = document.getElementById('chatbotTrigger');
        this.window = document.getElementById('chatbotWindow');
        this.closeBtn = document.getElementById('chatbotClose');
        this.backBtn = document.getElementById('chatbotBack');
        this.form = document.getElementById('chatbotForm');
        this.input = document.getElementById('chatbotInputField');
        this.messagesContainer = document.getElementById('chatbotMessages');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.isOpen = false;

        this.responses = {
            greetings: [
                "Hello! How can I help you today?",
                "Hi! I'm Siddharth's AI. Type !send <message> if you want to email him directly!",
                "Greetings! Ask me about Siddharth's skills or projects."
            ],
            about: "Siddharth Srivastava is a Full-Stack Developer and AWS Cloud Enthusiast. He loves building scalable systems and lead teams to success.",
            skills: "Siddharth is proficient in Python (Flask), JavaScript, Flutter/Dart, and SQL. He also has extensive experience with AWS services like EC2, RDS, and S3.",
            projects: "Some of his key projects include a production-ready Delivery CRM on AWS, a Delivery Agent App in Flutter, and a Phone Recording App. Check out the Projects section for more details!",
            experience: "Siddharth has a strong background in lead roles, including leading team 'Bug Squashers' in the Codestorm'25 Hackathon.",
            contact: "You can reach Siddharth via email at contact@example.com. Better yet, type !send followed by your message here!",
            fallback: "I'm not sure about that. Try asking about skills, projects, or type !send <your message> to email Siddharth directly!"
        };

        this.init();
    }

    init() {
        this.trigger.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.closeChat());
        if (this.backBtn) {
            this.backBtn.addEventListener('click', () => this.closeChat());
        }
        this.form.addEventListener('submit', (e) => { e.preventDefault(); this.handleUserMessage(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && this.isOpen) this.closeChat(); });

        // Share Button Logic
        const shareBtn = document.querySelector('.mobile-share-btn');
        if (shareBtn) {
            shareBtn.addEventListener('click', async () => {
                if (navigator.share) {
                    try {
                        await navigator.share({
                            title: 'Siddharth Srivastava | Portfolio',
                            text: 'Check out Siddharth Srivastava\'s portfolio!',
                            url: window.location.href,
                        });
                    } catch (err) {
                        console.log('Error sharing:', err);
                    }
                } else {
                    // Fallback: Copy to clipboard
                    const url = window.location.href;
                    navigator.clipboard.writeText(url).then(() => {
                        alert('Link copied to clipboard!');
                    });
                }
            });
        }
    }

    toggleChat() { this.isOpen ? this.closeChat() : this.openChat(); }

    openChat() {
        this.isOpen = true;
        this.window.classList.add('open');
        this.trigger.querySelector('.trigger-badge').style.display = 'none';

        // Use a small delay for mobile keyboards to stabilize
        setTimeout(() => {
            this.input.focus();
        }, 300);
    }

    closeChat() {
        this.isOpen = false;
        this.window.classList.remove('open');
        this.input.blur();
    }

    handleUserMessage() {
        const text = this.input.value.trim();
        if (!text) return;
        this.addMessage(text, 'user');
        this.input.value = '';

        if (text.startsWith('!send')) {
            const messageContent = text.replace('!send', '').trim();
            if (messageContent) {
                this.sendEmail(messageContent);
            } else {
                this.addMessage("Please provide a message after !send. Example: !send hello siddharth!", 'bot');
            }
            return;
        }

        this.showTyping(true);
        setTimeout(() => {
            const response = this.generateResponse(text);
            this.showTyping(false);
            this.addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000);
    }

    async sendEmail(content) {
        this.addMessage("Attempting to send your message to Siddharth...", 'bot');
        this.showTyping(true);

        try {
            const formData = new FormData();
            formData.append('message', `Chatbot direct message: ${content}`);
            formData.append('_subject', 'Direct Message from Portfolio Chatbot');

            const response = await fetch("https://formspree.io/f/mojnakwd", {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            this.showTyping(false);
            if (response.ok) {
                this.addMessage("🚀 Your message has been sent successfully! Siddharth will get back to you soon.", 'bot');
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            this.showTyping(false);
            this.addMessage("❌ Sorry, I couldn't send the message right now. Please try again later or use the contact form below.", 'bot');
        }
    }

    generateResponse(input) {
        const text = input.toLowerCase();
        if (text.includes('hi') || text.includes('hello') || text.includes('hey')) return this.responses.greetings[Math.floor(Math.random() * this.responses.greetings.length)];
        if (text.includes('skill') || text.includes('tech') || text.includes('know')) return this.responses.skills;
        if (text.includes('project') || text.includes('work') || text.includes('build')) return this.responses.projects;
        if (text.includes('exp') || text.includes('hackathon') || text.includes('lead')) return this.responses.experience;
        if (text.includes('contact') || text.includes('email') || text.includes('reach')) return this.responses.contact;
        if (text.includes('about') || text.includes('who') || text.includes('siddharth')) return this.responses.about;
        return this.responses.fallback;
    }

    addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        div.innerHTML = `<div class="message-content">${text}</div><span class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>`;
        this.messagesContainer.appendChild(div);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    showTyping(show) {
        this.typingIndicator.style.display = show ? 'flex' : 'none';
        if (show) this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

class LogoLoop {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        this.options = { logos: options.logos || [], speed: options.speed || 100, direction: options.direction || 'left', logoSize: options.logoSize || '2.5rem', gap: options.gap || '1.5rem', pauseOnHover: options.pauseOnHover || false };
        this.logoLoop = null; this.animationId = null; this.lastTimestamp = null; this.position = 0; this.isHovered = false;
        this.init();
        requestAnimationFrame((t) => this.animate(t));
    }
    init() { this.createLogoElements(); this.setupEventListeners(); }
    createLogoElements() {
        this.container.innerHTML = '';
        this.logoLoop = document.createElement('div');
        this.logoLoop.className = 'logo-loop';
        this.container.appendChild(this.logoLoop);
        const logosToRender = [...this.options.logos, ...this.options.logos, ...this.options.logos, ...this.options.logos];
        logosToRender.forEach((logo) => {
            const logoItem = document.createElement('div');
            logoItem.className = 'logo-item';
            logoItem.style.margin = `0 ${this.options.gap}`;
            const link = document.createElement('a');
            link.href = logo.href || '#'; link.target = '_blank'; link.rel = 'noopener noreferrer';
            const icon = document.createElement('i');
            icon.className = logo.icon; icon.style.fontSize = this.options.logoSize; icon.style.color = '#fff';
            const text = document.createElement('span');
            text.textContent = logo.title;
            link.appendChild(icon); link.appendChild(text); logoItem.appendChild(link); this.logoLoop.appendChild(logoItem);
        });
    }
    setupEventListeners() {
        this.container.addEventListener('mouseenter', () => { this.isHovered = true; });
        this.container.addEventListener('mouseleave', () => { this.isHovered = false; });
    }
    animate(timestamp) {
        if (!this.lastTimestamp) this.lastTimestamp = timestamp;
        const deltaTime = (timestamp - this.lastTimestamp) / 1000;
        this.lastTimestamp = timestamp;

        if (!this.isHovered || !this.options.pauseOnHover) {
            let movement = this.options.speed * deltaTime;
            if (this.options.direction === 'left') {
                this.position -= movement;
            } else {
                this.position += movement;
            }
        }

        const totalWidth = this.logoLoop.scrollWidth;
        const oneSetWidth = totalWidth / 4;

        if (this.options.direction === 'left') {
            if (Math.abs(this.position) >= oneSetWidth) {
                this.position = 0;
            }
        } else {
            if (this.position >= 0) {
                this.position = -oneSetWidth;
            }
        }

        this.logoLoop.style.transform = `translateX(${this.position}px)`;
        this.animationId = requestAnimationFrame(this.animate.bind(this));
    }
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => { console.log('SW registration failed:', error); });
    });
}
