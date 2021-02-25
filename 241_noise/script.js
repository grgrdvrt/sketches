

const w = 700;
const h = 700;

const canvas = document.createElement("canvas");
canvas.width = w;
canvas.height = h;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

const noise = new SimplexNoise();

const scale = Math.random() * 0.003 + 0.005;
const o1 = 0;
const o2 = 1000;

let time = 0;

const bubbles = [];
for(let i = 0; i < 3000; i++){
  bubbles[i] = {
    pos:new Vector2(
      0.5 * w + 0.1 * Math.random() * w,
      0.5 * h + 0.1 * Math.random() * h,
    ),
    vel:new Vector2()
  };
}

function channel(){
  let a = Math.random();
  let b = Math.random();
  let c = Math.random();
  let d = Math.random();
  return function(t){
    return Math.floor(255 * (a + b * (0.5 + 0.5 * Math.cos(2 * Math.PI * (c * t + d)))));
  };
}

let r  = channel();
let g  = channel();
let b  = channel();


const fr = 0.98;
const center = new Vector2(0.5 * w, 0.5 * h);
ctx.lineCap = ctx.lineJoin = "round";
ctx.lineWidth = 2;

function update(){
  let acc = new Vector2();
  time += 0.0075;
  // ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
  // ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = `rgb(${r(time)}, ${g(time)}, ${b(time)})`;

  ctx.beginPath();
  bubbles.forEach(b => {
    ctx.moveTo(b.pos.x, b.pos.y);
    acc.set(
      noise.noise3d(b.pos.x * scale + o1, b.pos.y * scale + o1, time),
      noise.noise3d(b.pos.x * scale + o1, b.pos.y * scale + o2, time)
    ).multiplyScalar(0.35);
    b.vel.multiplyScalar(fr).add(acc);
    b.pos.add(b.vel);
    b.pos.add(center.clone().sub(b.pos).multiplyScalar(0.02));
    ctx.lineTo(b.pos.x, b.pos.y);
  });
  ctx.stroke();
  requestAnimationFrame(update);
}

update();

