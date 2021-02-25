let w = 700;
let h = 700;
let canvas = document.createElement("canvas");
canvas.width = w;
canvas.height = h;
document.body.appendChild(canvas);

let ctx = canvas.getContext("2d");

const fr = 0.90;
const nPacks = 8;
const nBubbles = 200;


function applyConstraints(bubbles){
  const n = bubbles.length;
  for(let i = 0; i < n; i++){
    const b1 = bubbles[i];
    for(let j = 0; j < i; j++){
      const b2 = bubbles[j];
      const d = b1.pos.clone().sub(b2.pos);
      if(d.getLength() < b1.radius + b2.radius){
        d.setLength((b1.radius + b2.radius) - d.getLength()).multiplyScalar(0.5);
        b1.pos.add(d);
        b2.pos.sub(d);
      }
    }
  }
}

function computePacksRadius(packs, bubbles){
  const tmp = new Vector2();
  packs.forEach(p => p.radius = 0);
  bubbles.forEach(b => {
    let d = tmp.copy(b.target.pos).sub(b.pos).getLength() + b.radius;
    b.target.radius = Math.max(b.target.radius, d);
  });
  packs.forEach(p => p.radius *= 0.5);
}

function draw(ctx, bubble){
  ctx.moveTo(bubble.pos.x + bubble.radius, bubble.pos.y);
  ctx.arc(bubble.pos.x, bubble.pos.y, bubble.radius, 0, 2 * Math.PI);
}

function updatePositions(bubbles, strength){
  const tmp = new Vector2();
  bubbles.forEach(b => {
    b.vel.multiplyScalar(fr).add(tmp.copy(b.target.pos).sub(b.pos).multiplyScalar(strength * Math.pow(b.radius, 2) * 0.001));
    b.pos.add(b.vel);
  });
}

function makeBubble(target){
  return {
    pos:new Vector2(),
    vel:new Vector2(),
    radius:0,
    scale:1,
    target:target
  };
}

const center = new Vector2(0.5 * w, 0.5 * h);
const centerTarget = {pos:center};

let packs = [];
for(let i = 0; i < nPacks; i++){
  const p = makeBubble(centerTarget);
  p.pos.x = Math.random() * w;
  p.pos.y = Math.random() * h;
  p.scale = Math.pow(Math.random(), 0.4) + 0.2;
  packs[i] = p;
}

let bubbles = [];
for(let i = 0; i < nBubbles; i++){
  const pack = packs[Math.floor(Math.random() * nPacks)];
  const b = makeBubble(pack);
  b.pos.copy(b.target.pos);
  b.pos.x += Math.random();
  b.pos.y += Math.random();
  b.radius = (Math.pow(Math.random(), 2) * 30 + 2) * pack.scale;
  bubbles[i] = b;
}

function update(){
  ctx.clearRect(0, 0, w, h);

  computePacksRadius(packs, bubbles);
  updatePositions(packs, 0.0005);
  for(let i = 0; i < 5; i++){
    applyConstraints(packs);
  }
  updatePositions(bubbles, 0.008);
  for(let i = 0; i < 5; i++){
    applyConstraints(bubbles);
  }


  ctx.beginPath();
  packs.forEach(p => draw(ctx, p));
  ctx.strokeStyle = "red";
  ctx.stroke();

  ctx.beginPath();
  bubbles.forEach(b => draw(ctx, b));
  ctx.strokeStyle = "black";
  ctx.stroke();

  requestAnimationFrame(update);
}

update();
