// Custom Cursor Implementation
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.cursorFollower = document.querySelector('.cursor-follower');
        this.cursorPos = { x: 0, y: 0 };
        this.followerPos = { x: 0, y: 0 };
        this.isHovering = false;

        // Only initialize on desktop
        if (window.innerWidth > 768) {
            this.init();
        }
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursorPos.x = e.clientX;
            this.cursorPos.y = e.clientY;
        });

        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .skill-card, .project-card, .contact-method');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                this.cursorFollower.classList.add('hover');
            });

            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
                this.cursorFollower.classList.remove('hover');
            });
        });

        this.animate();
    }

    animate() {
        // Smooth cursor movement
        this.cursor.style.left = this.cursorPos.x + 'px';
        this.cursor.style.top = this.cursorPos.y + 'px';

        // Follower with delay (lerp)
        this.followerPos.x += (this.cursorPos.x - this.followerPos.x) * 0.15;
        this.followerPos.y += (this.cursorPos.y - this.followerPos.y) * 0.15;

        this.cursorFollower.style.left = this.followerPos.x + 'px';
        this.cursorFollower.style.top = this.followerPos.y + 'px';

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize custom cursor
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new CustomCursor();
    });
} else {
    new CustomCursor();
}
