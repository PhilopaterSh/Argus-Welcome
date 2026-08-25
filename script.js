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

// Real Argus Multi-Agent Studio Telemetry Simulation
const terminalLogs = document.getElementById('terminalLogs');
const runScanBtn = document.getElementById('runScanBtn');

const simulationSteps = [
    { type: 'cmd', text: '<span class="prompt">argus@studio:~$</span> python -m app.GUI.studio --port 8199 --target target.local --mode react-langgraph' },
    { type: 'log-info', text: '[+] [INIT] ArgusBrain initializing via Ollama (Model: WhiteRabbitNeo-V3-7B)...' },
    { type: 'log-info', text: '[+] [RAG] FAISS Vector Store loaded with nomic-embed-text embeddings from knowledge_base/.' },
    { type: 'log-info', text: '[+] [WSL-BRIDGE] Connected to Kali Linux environment (Subprocess/SSH verified).' },
    { type: 'log-ai', text: '[🧠] [THOUGHT] "Target given: target.local. Executing Phase 1 Passive OSINT to identify subdomains."' },
    { type: 'log-info', text: '[⚡] [ACTION] ReconService.execute_passive_recon(tools=["subfinder", "findomain", "assetfinder"])' },
    { type: 'log-success', text: '[✔] [OBSERVATION] 18 live subdomains discovered, passed to anew deduplication pipeline.' },
    { type: 'log-ai', text: '[🧠] [THOUGHT] "Subdomains collected. Running Phase 4 HTTPX validation & Phase 5 Nmap/Nuclei scanning."' },
    { type: 'log-warning', text: '[!] [DISCOVERY] HTTPX identified exposed admin gateway at api.target.local:8080.' },
    { type: 'log-ai', text: '[🧠] [REFLECTIVE] Running pre_execute_verify to ensure safety and avoid WAF false positives.' },
    { type: 'log-success', text: '[✔] [MEMORY] Findings and entity relations persisted into SQLite Blackboard (targets, findings, relations).' },
    { type: 'log-info', text: '[+] [FINAL ANSWER] Recon cycle complete. Session state synchronized in Streamlit Studio.' }
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
        setTimeout(printLogLine, 600);
    } else {
        isRunning = false;
        runScanBtn.disabled = false;
        runScanBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Re-Run Studio Simulation';
    }
}

function startSimulation() {
    if (isRunning) return;
    isRunning = true;
    runScanBtn.disabled = true;
    runScanBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Executing LangGraph Loop...';
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
            const suffix = counter.innerText.includes('%') ? '%' : '';
            
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
