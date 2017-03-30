//background.js

var canvas = document.getElementById("background");
canvas.width = window.innerWidth
canvas.height = window.innerHeight;
var canvasW = canvas.width;
var canvasH = canvas.height;
var ctx = canvas.getContext("2d");

function Particle() {
    this.x = Math.random() * canvasW;
    this.y = Math.random() * canvasH;
    this.radius = Math.random() * 8 + 2;
    this.vx = (Math.random() - 0.5) * this.radius;
    this.vy = (Math.random() - 0.5) * this.radius;
    this.color = "#4b4b4b";
};

Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
}

var particles = [];

function createParticles() {
    particles = [];
    for (var i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

var frames = 400;

function draw() {
    frames++;
    if (frames > 400) {
        frames = 0;
        createParticles();
        ctx.beginPath();
        ctx.rect(0, 0, canvasW, canvasH);
        ctx.fillStyle = "#555";
        ctx.fill();
    }

    particles.map(function(particle) {
        particle.draw();
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.y > canvas.height || particle.y < 0) {
            particle.vy = -particle.vy;
        }
        if (particle.x > canvas.width || particle.x < 0) {
            particle.vx = -particle.vx;
        }

    })

    raf = window.requestAnimationFrame(draw);
}

draw();
