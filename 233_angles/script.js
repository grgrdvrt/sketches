let w = 700;
let h = 700;
let canvas = document.createElement("canvas");
canvas.width = w;
canvas.height = h;
document.body.appendChild(canvas);

let ctx = canvas.getContext("2d");

let nPts = 100;
let pts = [];
let overFlow = 0.25;
for(let i = 0; i < nPts; i++){
  pts[i] = {
    x:Math.random() * (1 + overFlow) * w - (0.5 * overFlow) * w,
    y:Math.random() * (1 + overFlow) * h - (0.5 * overFlow) * h
  };
}



pts.sort((a, b) => a.y - b.y);

function angle(p1, p2){
  return Math.atan2(
    p2.y - p1.y,
    p2.x - p1.x,
  );
}

function lerp(a, b, t){
  return a + t * (b - a);
}

let size = 3;
pts.forEach((p1, i) => {
  let angleLim = Math.PI / 10 + Math.random() * Math.PI / 5;
  let leftPt, rightPt;
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  for(let j = i + 1; j < nPts; j++){
    let p2 = pts[j];
    if(p2.x < min && angle(p1, p2) < Math.PI / 2 + angleLim && (!leftPt || angle(p1, p2) > angle(p1, leftPt))){
      min = p2.x;
      leftPt = p2;
    }
    if(p2.x > max && angle(p1, p2) > Math.PI / 2 - angleLim && (!rightPt || angle(p1, p2) < angle(p1, rightPt))){
      max = p2.x;
      rightPt = p2;
    }
  }
  if(leftPt && rightPt){
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(lerp(p1.x, leftPt.x, 5), lerp(p1.y, leftPt.y, 5));
    ctx.lineTo(lerp(p1.x, rightPt.x, 5), lerp(p1.y, rightPt.y, 5));
    ctx.lineTo(p1.x, p1.y);
    ctx.fillStyle = "white";
    ctx.fill();
  }

  ctx.beginPath();
  for(let j = i + 1; j < nPts; j++){
    let p2 = pts[j];
    let a = angle(p1, p2);

    if(a < Math.PI / 2 + angleLim && a > Math.PI / 2 - angleLim){
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    }
  }
  ctx.stroke();
});
