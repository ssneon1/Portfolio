class CardNavigation {
    constructor() {
        this.nav = document.getElementById('cardNav');
        this.hamburger = document.getElementById('hamburgerMenu');
        this.ctaButton = document.getElementById('ctaButton');
        this.cards = document.querySelectorAll('.nav-card');
        this.content = document.querySelector('.card-nav-content');
        this.isOpen = false;
        this.isAnimating = false;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAnimations();
        this.setupScrollHandling();
    }

    setupEventListeners() {
        // Hamburger menu click
        this.hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.nav.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Escape key to close menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });

        // Card click handling
        this.cards.forEach(card => {
            card.addEventListener('click', (e) => {
                const href = card.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    this.scrollToSection(href);
                    this.closeMenu();
                }
            });
        });
    }

    setupAnimations() {
        // Initial state
        gsap.set(this.content, { opacity: 0, visibility: 'hidden' });
        gsap.set(this.cards, { y: 30, opacity: 0 });
    }

    setupScrollHandling() {
        // Change nav appearance on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.nav.style.background = 'rgba(15, 23, 42, 0.95)';
                this.nav.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.4)';
            } else {
                this.nav.style.background = 'rgba(15, 23, 42, 0.82)';
                this.nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            }
        });
    }

    toggleMenu() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.isOpen = true;
        this.hamburger.classList.add('open');
        this.nav.classList.add('open');

        // Animate content show
        gsap.to(this.content, {
            opacity: 1,
            visibility: 'visible',
            duration: 0.3,
            ease: 'power2.out'
        });

        // Animate cards with stagger
        gsap.to(this.cards, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.2)',
            stagger: 0.1,
            onComplete: () => {
                this.isAnimating = false;
            }
        });
    }

    closeMenu() {
        this.isOpen = false;
        this.hamburger.classList.remove('open');

        // Animate cards out
        gsap.to(this.cards, {
            y: 20,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            stagger: 0.05,
            onComplete: () => {
                this.nav.classList.remove('open');
                gsap.to(this.content, {
                    opacity: 0,
                    visibility: 'hidden',
                    duration: 0.2,
                    onComplete: () => {
                        this.isAnimating = false;
                    }
                });
            }
        });
    }

    scrollToSection(id) {
        const section = document.querySelector(id);
        if (section) {
            const offset = 100; // Account for fixed nav
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = section.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if the element exists (prevent errors during transition)
    if (document.getElementById('cardNav')) {
        window.cardNav = new CardNavigation();
    }
});