const w = 1000;
const h = 1000;
const canvas = document.createElement("canvas");
canvas.width = w;
canvas.height = h;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

const cellSize = 5;
let time = 0;

ctx.fillStyle = "black";
ctx.strokeStyle = "white";
function update(){
    time++;
    for(let i = 0; i < (1 - (0.01 * time) % 1) * 100; i++){
        const scale = 2**(Math.floor((0.01 * time % 1)**6 * 6));
        const radius = scale * cellSize / 2;
        const x = Math.floor(Math.random() * w / (scale * cellSize)) * (scale * cellSize) + radius;
        const y = Math.floor(Math.random() * h / (scale * cellSize)) * (scale * cellSize) + radius;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
    requestAnimationFrame(update);
}

update();
