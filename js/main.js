// Main Application Controller
class PortfolioApp {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.sections = document.querySelectorAll('.section');
        this.contactForm = document.getElementById('contact-form');

        this.init();
    }

    init() {
        this.initParticles();
        this.initNavigation();
        this.initSmoothScroll();
        this.initSectionHighlight();
        this.initContactForm();
        this.initMobileMenu();
    }

    initParticles() {
        // Initialize particles.js background
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: '#00d9ff'
                    },
                    shape: {
                        type: 'circle'
                    },
                    opacity: {
                        value: 0.3,
                        random: true
                    },
                    size: {
                        value: 3,
                        random: true
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#00d9ff',
                        opacity: 0.2,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'grab'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 0.5
                            }
                        },
                        push: {
                            particles_nb: 4
                        }
                    }
                },
                retina_detect: true
            });
        }
    }

    initNavigation() {
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }

    initSmoothScroll() {
        // Smooth scroll for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    this.navMenu.classList.remove('active');
                    this.hamburger.classList.remove('active');
                }
            });
        });
    }

    initSectionHighlight() {
        // Highlight active section in navigation
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-80px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    this.navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        // Observe all sections
        this.sections.forEach(section => {
            if (section.id) {
                observer.observe(section);
            }
        });

        // Also observe hero section
        const heroSection = document.getElementById('home');
        if (heroSection) {
            observer.observe(heroSection);
        }
    }

    initContactForm() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => {
                e.preventDefault();

                // Get form data
                const formData = new FormData(this.contactForm);
                const data = Object.fromEntries(formData);

                console.log('Form submitted:', data);

                // Show success message
                const successMessage = document.getElementById('form-success');
                successMessage.style.display = 'block';

                // Reset form
                this.contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);

                // Here you would typically send the data to a server
                // Example: fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
            });
        }
    }

    initMobileMenu() {
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => {
                this.hamburger.classList.toggle('active');
                this.navMenu.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                    this.hamburger.classList.remove('active');
                    this.navMenu.classList.remove('active');
                }
            });
        }
    }
}

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PortfolioApp();
    });
} else {
    new PortfolioApp();
}

// Download resume functionality
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('download-resume');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Resume download feature - Please add your resume PDF to the project and update this link!');
            // To implement: downloadBtn.href = 'path/to/your/resume.pdf';
            // downloadBtn.download = 'Your_Name_Resume.pdf';
        });
    }
});
