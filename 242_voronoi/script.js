const w = 700;
const h = 700;

const canvas = document.createElement("canvas");
canvas.width = w;
canvas.height = h;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");


const pts = [];
for(let i = 0; i < 1500; i++){
  pts[i] = new Vector2(
    Math.random() * w,
    Math.random() * h,
  );
}

const sites = [];
for(let i = 0; i < 30; i++){
  sites[i] = {
    pos:new Vector2(
      Math.random() * w,
      Math.random() * h,
    ),
    vel:(new Vector2(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
    )).multiplyScalar(2.2),
  };
}

const fr = 0.95;
const vel = 1.2;


function update(){
  ctx.clearRect(0, 0, w, h);
  const nPts = pts.length;
  const nSites = sites.length;
  const tmp = new Vector2();
  for(let j = 0; j < nSites; j++){
    let s = sites[j];
    // s.vel.x = fr * s.vel.x + vel * (Math.random() * 2 - 1);
    // s.vel.y = fr * s.vel.y + vel * (Math.random() * 2 - 1);
    s.pos.add(s.vel);
    if(s.pos.x < 0){
      s.pos.x = 0;
      s.vel.x *= -1;
    }
    else if(s.pos.x > w){
      s.pos.x = w;
      s.vel.x *= -1;
    }
    if(s.pos.y < 0){
      s.pos.y = 0;
      s.vel.y *= -1;
    }
    else if(s.pos.y > h){
      s.pos.y = h;
      s.vel.y *= -1;
    }
  }
  ctx.beginPath();
  for(let i = 0; i < nPts; i++){
    let closest = undefined;
    let minDist = Number.POSITIVE_INFINITY;
    let p = pts[i];
    for(let j = 0; j < nSites; j++){
      let s = sites[j];
      const dist = tmp.copy(p).sub(s.pos).getLength();
      if(dist < minDist){
        closest = s;
        minDist = dist;
      }
    }

    ctx.moveTo(p.x, p.y);
    ctx.lineTo(closest.pos.x, closest.pos.y);
  }
  ctx.stroke();
  const s = 2;
  ctx.fillStyle = "black";
  pts.forEach(pt => {
    ctx.fillRect(pt.x - 0.5 * s, pt.y - 0.5 * s, s, s);
  });


  requestAnimationFrame(update);
}

update();
