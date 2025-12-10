// GSAP Animations Controller
class Animations {
    constructor() {
        this.init();
    }

    init() {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });

        this.heroAnimations();
        this.scrollAnimations();
    }

    heroAnimations() {
        const tl = gsap.timeline({ delay: 0.5 });

        tl.from('.title-line', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        })
            .from('.title-name', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.4')
            .from('.hero-subtitle', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.4')
            .from('.hero-buttons .btn', {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: 'power3.out'
            }, '-=0.4')
            .from('.scroll-indicator', {
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.2');
    }

    scrollAnimations() {
        // Section titles
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });

        // About section image
        gsap.from('.about-image', {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        // About section text
        gsap.from('.about-text', {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            x: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        // Highlight items stagger
        gsap.from('.highlight-item', {
            scrollTrigger: {
                trigger: '.about-highlights',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power3.out'
        });

        // Skill cards 3D tilt on hover
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        });

        // Project cards entrance
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: '.projects-grid',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            y: 80,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });

        // Timeline items alternating animation
        gsap.utils.toArray('.timeline-item').forEach((item, index) => {
            const direction = index % 2 === 0 ? -100 : 100;

            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                x: direction,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        });

        // Contact section elements
        gsap.from('.contact-info', {
            scrollTrigger: {
                trigger: '.contact-section',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            x: -80,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.from('.contact-form-wrapper', {
            scrollTrigger: {
                trigger: '.contact-section',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            x: 80,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }
}

// Initialize animations when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Animations();
    });
} else {
    new Animations();
}
