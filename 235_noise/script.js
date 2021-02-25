

const w = 700;
const h = 700;

const canvas = document.createElement("canvas");
canvas.width = w;
canvas.height = h;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

const noise = new SimplexNoise();

const noiseOffset = {
  x:Math.random() * 1000,
  y:Math.random() * 1000
};
const scale = Math.random() * 0.005 + 0.005;
const yOffset = 10000;
const cOffset = 20000;
const sOffset = 30000;
const tOffset = 40000;
const vel = 3;

let time = 0;

const particles = [];
for(let i = 0; i < 3000; i++){
  particles[i] = resetParticle({});
}

function resetParticle(p){
  p.x = Math.random() * w;
  p.y = Math.random() * h;
  p.vx = vel * noise.noise3d(p.x * scale, p.y * scale, time);
  p.vy = vel * noise.noise3d(p.x * scale + yOffset, p.y * scale + yOffset, time);
  // p.totalTime = 30 + Math.random() * 100;
  p.totalTime = 30 + (noise.noise3d(p.x * scale + tOffset, p.y * scale + tOffset, time) * 0.5 + 0.5) * 100;
  p.time = p.totalTime;

  p.gs = Math.floor(0xff * (0.5 * noise.noise3d(p.x * scale + cOffset, p.y * scale + cOffset, time) + 0.5));
  p.size = 50 * (0.5 + 0.5 * noise.noise3d(p.x * scale + sOffset, p.y * scale + sOffset, time))**8 + 1;
  return p;
}


const fr = 0.98;
function update(){

  time+=0.003;
  particles.forEach(p => {
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    // const vel = 0.05 * p.time / p.totalTime;
    const vel = 0.3;
    p.vx += vel * noise.noise3d(p.x * scale, p.y * scale, time);
    p.vy += vel * noise.noise3d(p.x * scale + yOffset, p.y * scale + yOffset, time);
    p.vx *= fr;
    p.vy *= fr;
    p.x += p.vx;
    p.y += p.vy;
    ctx.lineTo(p.x, p.y);
    const gs = p.gs;
    const alpha = 1 - p.time / p.totalTime;
    // const alpha = 1;
    p.color = `rgba(${gs}, ${gs}, ${gs}, ${alpha})`;
    ctx.lineWidth = p.size;
    ctx.strokeStyle = p.color;
    ctx.stroke();
    if(--p.time < 0){
      resetParticle(p);
    }
  });
  requestAnimationFrame(update);
}

update();

