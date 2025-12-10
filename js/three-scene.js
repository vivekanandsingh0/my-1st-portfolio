// Three.js Scene Setup for Hero Section
class ThreeScene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.geometricShapes = [];
        this.mouse = { x: 0, y: 0 };
        this.targetMouse = { x: 0, y: 0 };

        this.init();
        this.createParticles();
        this.createGeometricShapes();
        this.addEventListeners();
        this.animate();
    }

    init() {
        // Scene
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 30;

        // Renderer
        const canvas = document.getElementById('three-canvas');
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    createParticles() {
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 100;
        }

        particlesGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(posArray, 3)
        );

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.15,
            color: 0x00d9ff,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);
    }

    createGeometricShapes() {
        // Create rotating torus
        const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
        const torusMaterial = new THREE.MeshBasicMaterial({
            color: 0xa855f7,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        torus.position.set(-15, 5, -10);
        this.scene.add(torus);
        this.geometricShapes.push({ mesh: torus, rotationSpeed: { x: 0.01, y: 0.02 } });

        // Create icosahedron
        const icoGeometry = new THREE.IcosahedronGeometry(5, 0);
        const icoMaterial = new THREE.MeshBasicMaterial({
            color: 0x00d9ff,
            wireframe: true,
            transparent: true,
            opacity: 0.4
        });
        const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
        icosahedron.position.set(15, -5, -15);
        this.scene.add(icosahedron);
        this.geometricShapes.push({ mesh: icosahedron, rotationSpeed: { x: 0.015, y: 0.01 } });

        // Create octahedron
        const octaGeometry = new THREE.OctahedronGeometry(4, 0);
        const octaMaterial = new THREE.MeshBasicMaterial({
            color: 0xec4899,
            wireframe: true,
            transparent: true,
            opacity: 0.35
        });
        const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
        octahedron.position.set(0, 10, -20);
        this.scene.add(octahedron);
        this.geometricShapes.push({ mesh: octahedron, rotationSpeed: { x: 0.02, y: 0.015 } });

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
    }

    addEventListeners() {
        window.addEventListener('mousemove', (event) => {
            this.targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Smooth mouse movement (lerp)
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

        // Rotate particles
        if (this.particles) {
            this.particles.rotation.y += 0.001;
            this.particles.rotation.x = this.mouse.y * 0.1;
            this.particles.rotation.y = this.mouse.x * 0.1;
        }

        // Rotate geometric shapes
        this.geometricShapes.forEach(shape => {
            shape.mesh.rotation.x += shape.rotationSpeed.x;
            shape.mesh.rotation.y += shape.rotationSpeed.y;
        });

        // VR-style camera movement
        this.camera.position.x = this.mouse.x * 2;
        this.camera.position.y = this.mouse.y * 2;
        this.camera.lookAt(this.scene.position);

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize Three.js scene when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Only initialize on desktop/tablet, not on small mobile devices
        if (window.innerWidth > 480) {
            new ThreeScene();
        }
    });
} else {
    if (window.innerWidth > 480) {
        new ThreeScene();
    }
}
