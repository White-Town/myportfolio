// Three.js background animation
class Background3D {
    constructor() {
        this.canvas = document.getElementById('bg-canvas');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });

        this.init();
        this.animate();
    }

    init() {
        // Setup renderer
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Setup camera
        this.camera.position.z = 30;

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 5000;
        const posArray = new Float32Array(particlesCount * 3);

        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 100;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        // Create material
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.005,
            color: '#4f46e5',
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        // Create mesh
        this.particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particlesMesh);

        // Add event listeners
        window.addEventListener('resize', this.onWindowResize.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onMouseMove(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        this.particlesMesh.rotation.x = mouseY * 0.0001;
        this.particlesMesh.rotation.y = mouseX * 0.0001;
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        this.particlesMesh.rotation.x += 0.0001;
        this.particlesMesh.rotation.y += 0.0001;

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize background
window.addEventListener('load', () => {
    new Background3D();
});
