tools.mixin(tools, this);
var w = 700;
var h = 700;
var stage = new Stage(w, h);

var ctx = stage.out;


function lerp(a, b, t){
  return (1 - t) * a + t * b;
}

function makeParticle(x, y, ox, oy, deviation){
  // return {x, y, ox, oy, deviation, time:Math.random() * 200 + 100};
  return {x, y, ox, oy, deviation, time:200};
}

function copyParticle(p) {
  return makeParticle(p.x, p.y, p.ox, p.oy, -p.deviation);
}


let particles = [
  makeParticle(
    0.5 * w,
    0.5 * h,
    0.5 * w + Math.random() * 2 - 1,
    0.5 * h + Math.random() * 2 - 1,
    0.01)
];


let l = 0;
new Loop(() => {
  ctx.beginPath();

  let n = particles.length;
  for(let i = 0; i < n; i++){
    let p = particles[i];

    ctx.moveTo(p.x, p.y);
    let dx = p.x - p.ox;
    let dy = p.y - p.oy;
    p.ox = p.x;
    p.oy = p.y;
    let vx = dx + p.deviation * dy;
    let vy = dy - p.deviation * dx;
    p.deviation += (Math.random() * 2 - 1) * 0.001;
    p.x = p.ox + vx;
    p.y = p.oy + vy;
    ctx.lineTo(p.x, p.y);
    if(Math.random() < 0.02 && particles.length < 1000){
      particles.push(copyParticle(p));
    }

    if(p.time-- < 0 || p.x < 0 || p.y < 0 || p.x > w || p.y > h){
      particles[i] = particles[n - 1];
      n = particles.length = n - 1;
    };
  }
  l = (l + 0.1) % 100;
  ctx.strokeStyle = `hsla(${Math.round(360 * l / 100)}, 100%, 50%, 0.5)`;
  ctx.stroke();
});
