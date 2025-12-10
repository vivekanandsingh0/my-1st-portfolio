// Loading Screen Controller
class Loader {
    constructor() {
        this.loader = document.getElementById('loader');
        this.progressFill = document.querySelector('.progress-fill');
        this.progressPercent = document.querySelector('.progress-percent');
        this.progress = 0;

        this.init();
    }

    init() {
        this.simulateLoading();
    }

    simulateLoading() {
        const interval = setInterval(() => {
            this.progress += Math.random() * 15;

            if (this.progress >= 100) {
                this.progress = 100;
                clearInterval(interval);
                setTimeout(() => this.hideLoader(), 500);
            }

            this.updateProgress();
        }, 200);
    }

    updateProgress() {
        this.progressFill.style.width = this.progress + '%';
        this.progressPercent.textContent = Math.floor(this.progress) + '%';
    }

    hideLoader() {
        this.loader.classList.add('hidden');

        // Remove from DOM after transition
        setTimeout(() => {
            this.loader.style.display = 'none';
        }, 500);
    }
}

// Initialize loader
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Loader();
    });
} else {
    new Loader();
}
