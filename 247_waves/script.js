let w, h, baseRadius;
const center = {};
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
resize();

window.addEventListener("resize", resize);

function resize(){
  w = window.innerWidth;
  h = window.innerHeight;
  center.x = 0.5 * w;
  center.y = 0.5 * h;
  baseRadius = 0.5 * Math.min(w, h);
  canvas.width = w;
  canvas.height = h;
}

function lerp(a, b, t){
  return a + t * (b - a);
}

const params = [];

for(let i = 0; i < 10; i++){
  params[i] = {
    timeOffset:Math.random() * 2 * Math.PI,
    amplitude:Math.random(),
    offset:Math.random(),
    timeScale:lerp(-5, 5, Math.random()),
    periods:Math.round(lerp(2, 6, Math.random()))
  };
}

function mutateColor(baseColor){
  const color = {
    h:baseColor.h + lerp(-30, 30, Math.random()),
    s:baseColor.s + lerp(-30, 30, Math.random()),
    l:Math.random() < 0.5 ? 10 : 90,
    a:lerp(0.4, 1, Math.random())
  };
  if(Math.random() < 0.2) color.h += 180;
  return color;
}


function colorToString(color){
  const h = Math.round(color.h);
  const s = Math.round(color.s);
  const l = Math.round(color.l);
  return `hsla(${h}, ${s}%, ${l}%, ${color.a})`;
}


const nLevels = 50;
const colors = [];
const angles = [];
const styles = [];
const baseColor = {
  h: lerp(30, 330, Math.random()),
  s: lerp(30, 70, Math.random()),
  l: lerp(30, 70, Math.random()),
};

for(let i = 0; i < nLevels; i++){
  styles[i] = {
    fill:Math.random() < 0.5,
    stroke:Math.random() < 0.5
  };


  colors[i] = [
    colorToString(mutateColor(baseColor)),
    colorToString(mutateColor(baseColor))
  ];
  angles[i] = Math.random() * 2 * Math.PI;
}

const nLines = 200;
const lines = [];
for(let i = 0; i < nLines; i++){
  const level = lerp(0, 1, Math.random());
  const c1 = mutateColor(baseColor);
  const c2 = mutateColor(baseColor);
  c1.a = lerp(0.1, 0.5, Math.random());
  c2.a = lerp(0.1, 0.5, Math.random());
  lines[i] = {
    level:level,
    levelOffset:0.1 * lerp(-1, 0.2, Math.random()),
    angle:Math.random() * 2 * Math.PI,
    angleBegin:Math.random() * 2 * Math.PI,
    angleLen:lerp(0.1, 0.2, Math.random()) * Math.PI,
    thickness:lerp(1, 2, Math.random()),
    timeRatio:lerp(1, -1, Math.random()),
    colors:[
      colorToString(c1),
      colorToString(c2)
    ]
  };
}

function evalParams(params, angle, time){
  return params.reduce((v, p) => {
    return v + p.offset + p.amplitude * Math.sin(p.timeOffset + time * p.timeScale + angle * p.periods);
  }, 0);
}

function getPosition(params, angle, time, rLevel){
  const val = evalParams(params, angle, time);
  const radius = rLevel * (0.4 * baseRadius * (val / params.length) + 0.5 * baseRadius);
  return {
    x:center.x + radius * Math.cos(angle),
    y:center.y + radius * Math.sin(angle)
  };
}

function makeGradient(params, angle, colors, time, rj){
  const p1 = getPosition(params, angle + time, time, rj);
  const p2 = getPosition(params, angle + Math.PI + time, time, rj);

  const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors[1]);
  return gradient;
}


function update(){
  ctx.clearRect(0, 0, w, h);
  for(let j = 0; j < nLevels; j++){
    const rLevel = 1 - j / nLevels;
    const time = 0.0006 * (Date.now() + 5000 * rLevel);
    const nPts = 80;
    ctx.beginPath();

    const last = getPosition(params, -2 * Math.PI / nPts, time, rLevel);
    ctx.moveTo(last.x, last.y);
    for(let i = 0; i < nPts; i++){
      const angle = 2 * Math.PI * i / nPts;
      const {x, y} = getPosition(params, angle, time, rLevel);
      ctx.lineTo(x, y);
    }

    const gradient = makeGradient(params, angles[j], colors[j], time, rLevel, j);
    if(styles[j].fill){
      ctx.fillStyle = gradient;
      ctx.fill();
    }
    if(styles[j].stroke){
      ctx.lineWidth = 1;
      ctx.strokeStyle = gradient;
      ctx.stroke();
    }
  }

  const nLines = lines.length;
  for(let j = 0; j < nLines; j++){
    const line = lines[j];
    const rLevel = line.level;
    const time = 0.0006 * (Date.now() + 5000 * rLevel);
    const nPts = 15;
    ctx.beginPath();

    const angleBegin = line.angleBegin + time * line.timeRatio;
    const first = getPosition(params, angleBegin, time, rLevel + line.levelOffset);
    ctx.moveTo(first.x, first.y);
    for(let i = 1; i < nPts; i++){
      const r = i /nPts;
      const angle = angleBegin + r * line.angleLen;
      const {x, y} = getPosition(params, angle, time, rLevel + line.levelOffset);
      ctx.lineTo(x, y);
    }

    const gradient = makeGradient(params, line.angle, line.colors, time, rLevel, j);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = line.thickness;
    ctx.stroke();
  }


  requestAnimationFrame(update);
}
update();
