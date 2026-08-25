// Neural Background Interactive Particle Mesh
const canvas = document.getElementById('neuralCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
});

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 1.8 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 242, 254, 0.4)';
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const count = Math.min(Math.floor(width / 18), 70);
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 130) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - dist / 130)})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Live Terminal Simulation Engine
const terminalLogs = document.getElementById('terminalLogs');
const runScanBtn = document.getElementById('runScanBtn');

const simulationSteps = [
    { type: 'cmd', text: '<span class="prompt">argus@core:~$</span> python -m argus.engine --target enterprise-staging.internal --mode autonomous-chain' },
    { type: 'log-info', text: '[+] [RECON] Initializing Argus Neural Penetration Engine v2.4...' },
    { type: 'log-info', text: '[+] [RECON] Passive OSINT & DNS permutation complete: 28 subdomains resolved.' },
    { type: 'log-ai', text: '[🧠] [AGENT-REASONING] Threat Model synthesized: Target exposes microservices mesh with GraphQL & REST gateways.' },
    { type: 'log-warning', text: '[!] [DISCOVERY] Parameter tampering vector spotted at /api/v2/auth/session-exchange (BOLA candidate).' },
    { type: 'log-ai', text: '[🧠] [AGENT-PAYLOAD] Formulating adaptive non-destructive JWT exploit candidate...' },
    { type: 'log-danger', text: '[🚨] [VALIDATION] High Severity Authenticated Escalation validated in sandbox environment!' },
    { type: 'log-success', text: '[✔] [REMEDIATION] Auto-generated mitigation patch created: "patch-auth-validation-v2.diff"' },
    { type: 'log-info', text: '[+] [REPORT] Executive risk telemetry & audit playbook compiled to ./reports/argus-audit-latest.pdf' }
];

let simIndex = 0;
let isRunning = false;

function printLogLine() {
    if (simIndex < simulationSteps.length) {
        const step = simulationSteps[simIndex];
        const p = document.createElement('p');
        p.className = `terminal-line ${step.type}`;
        p.innerHTML = step.text;
        terminalLogs.appendChild(p);
        terminalLogs.scrollTop = terminalLogs.scrollHeight;
        simIndex++;
        setTimeout(printLogLine, 650);
    } else {
        isRunning = false;
        runScanBtn.disabled = false;
        runScanBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Re-Run Simulation';
    }
}

function startSimulation() {
    if (isRunning) return;
    isRunning = true;
    runScanBtn.disabled = true;
    runScanBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Simulating Scan...';
    terminalLogs.innerHTML = '';
    simIndex = 0;
    printLogLine();
}

runScanBtn.addEventListener('click', startSimulation);

// Start terminal automatically after initial load
setTimeout(startSimulation, 800);

// Animated Counters for Metrics
const counters = document.querySelectorAll('.metric-number');
let countersStarted = false;

window.addEventListener('scroll', () => {
    if (!countersStarted && window.scrollY > 50) {
        countersStarted = true;
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            let current = 0;
            const step = target / 40;
            const suffix = counter.innerText.includes('%') ? '%' : counter.innerText.includes('x') ? 'x' : '';
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.innerText = (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)) + suffix;
            }, 30);
        });
    }
});
