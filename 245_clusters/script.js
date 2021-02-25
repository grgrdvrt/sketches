const w = 700;
const h = 700;

const canvas = document.createElement("canvas");
canvas.width = w;
canvas.height = h;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");



const pts = [];
for(let i = 0; i < 5000; i++){
  pts[i] = {
    x:Math.random() * w,
    y:Math.random() * h,
  };
}


const attractors = [];

for(let i = 0; i < 10; i++){
  attractors[i] = {
    x:Math.random() * w,
    y:Math.random() * h,
  };
}

function lerp(a, b, t){
  return (1 - t) * a + t * b;
}


pts.forEach(pt => {
  // const closest = attractors.reduce((candidate, att) => {
  //   const dist = Math.hypot(att.x - pt.x, att.y - pt.y);
  //   if(candidate.dist > dist){
  //     return {attractor:att, dist:dist};
  //   }
  //   else {
  //     return candidate;
  //   }
  // }, {attractor:null, dist:Number.POSITIVE_INFINITY});

  const randAtt = attractors[Math.floor(Math.random() * attractors.length)];
  const closest = {attractor:randAtt, dist:Math.hypot(randAtt.x - pt.x, randAtt.y - pt.y)};

  const factor = 500 / closest.dist;
  pt.x = lerp(pt.x, closest.attractor.x, factor);
  pt.y = lerp(pt.y, closest.attractor.y, factor);
});


function drawPoint(ctx, pt, color = 0, radius = 5){
  ctx.beginPath();
  ctx.moveTo(pt.x + radius, pt.y);
  ctx.arc(pt.x, pt.y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

// pts.forEach(pt => drawPoint(ctx, pt));



function kMeansStep(cendroids, pts){
  const newCentroids = centroids.map(c => {
    return {
      x:c.x,
      y:c.y,
      color:c.color,
      pts:[]
    };
  });

  pts.forEach(pt => {
    const closest = newCentroids.reduce((candidate, cent) => {
      const dist = Math.hypot(cent.x - pt.x, cent.y - pt.y);
      if(candidate.dist > dist){
        return {centroid:cent, dist:dist};
      }
      else {
        return candidate;
      }
    }, {centroid:null, dist:Number.POSITIVE_INFINITY});
    closest.centroid.pts.push(pt);
  });

  newCentroids.forEach(c => {
    const total = c.pts.reduce((sum, pt) => {
      sum.x += pt.x;
      sum.y += pt.y;
      return sum;
    }, {x:0, y:0});
    const iNPts = 1 / c.pts.length;
    c.x = total.x * iNPts;
    c.y = total.y * iNPts;
  });
  return newCentroids;
}

let centroids = [];
for(let i = 0; i < 10; i++){
  centroids[i] = {
    x:Math.random() * w,
    y:Math.random() * h,
    color:"#" + Math.round(Math.random() * 0xffffff).toString(16)
  };
}

setInterval(() => {

  ctx.clearRect(0, 0, w, h);
  centroids = kMeansStep(centroids, pts);

  centroids.forEach(c => {
    ctx.beginPath();
    const radius = 5;
    c.pts.forEach(pt => {
      ctx.moveTo(pt.x + radius, pt.y);
      ctx.arc(pt.x, pt.y, radius, 0, 2 * Math.PI);
    });
    ctx.fillStyle = c.color;
    ctx.fill();
    drawPoint(ctx, c, c.color);
    ctx.strokeStyle = "black";
    ctx.stroke();

  });
}, 200);
