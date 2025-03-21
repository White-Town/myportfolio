class ParticleNetwork {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 100 };
        this.particleCount = 100;
        
        this.init();
        this.animate();
        this.handleResize();
        this.handleMouseMove();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });
    }

    handleMouseMove() {
        window.addEventListener('mousemove', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = event.clientX - rect.left;
            this.mouse.y = event.clientY - rect.top;
        });
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2 + 1,
                dx: (Math.random() - 0.5) * 2,
                dy: (Math.random() - 0.5) * 2
            });
        }
    }

    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.fill();
        });
    }

    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance/120})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    updateParticles() {
        this.particles.forEach(particle => {
            // Move particles
            particle.x += particle.dx;
            particle.y += particle.dy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.dx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.dy *= -1;

            // Interactive mouse effect
            if (this.mouse.x != null && this.mouse.y != null) {
                const dx = particle.x - this.mouse.x;
                const dy = particle.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    
                    particle.x += Math.cos(angle) * force;
                    particle.y += Math.sin(angle) * force;
                }
            }
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateParticles();
        this.drawParticles();
        this.connectParticles();
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particles-network');
    if (canvas) {
        new ParticleNetwork(canvas);
    }
});
