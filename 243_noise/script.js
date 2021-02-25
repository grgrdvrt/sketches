const w = 700;
const h = 700;

const canvas = document.createElement("canvas");
canvas.width = w;
canvas.height = h;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

const noise = new SimplexNoise();

const scale = Math.random() * 0.002 + 0.004;

const bubbles = [];
for(let i = 0; i < 3000; i++){
  const b = {
    pos:new Vector2(
      Math.random() * w,
      Math.random() * h,
    ),
    radius:20
  };
  bubbles[i] = b;
}


let time = 0;
function update(){
  time += 0.08;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "black";
  ctx.strokeStyle = "white";
  bubbles.forEach(b => b.depth = noise.noise3d(scale * b.pos.x - 0.3 * time, scale * b.pos.y, time));
  bubbles.sort((a, b) => a.depth - b.depth);
  bubbles.forEach(b => {

    ctx.lineCap = ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.lineWidth = 2 * b.radius + 0.5;
    ctx.moveTo(b.pos.x - 1, b.pos.y + 1);
    ctx.lineTo(b.pos.x, b.pos.y);
    ctx.strokeStyle = "white";
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 2 * b.radius;
    ctx.moveTo(b.pos.x, b.pos.y);
    ctx.lineTo(b.pos.x + 0.5, b.pos.y + 0.5);
    ctx.strokeStyle = "black";
    ctx.stroke();
  });
  requestAnimationFrame(update);
}

update();
