tools.mixin(tools, this);

function lerp(a, b, t){
  return a + (b - a) * t;
}

function pt(x, y){
  return {x, y};
}


function makePoly(n, r){
  let poly = {pts:[], angles:[], id:0};
  let angleStep = 2 * Math.PI / n;
  for(let i = 0; i < n; i++){
    let a = (i + 0.5) * angleStep;
    poly.pts[i] = pt(
      r * Math.cos(a),
      r * Math.sin(a)
    );
  }
  return poly;
}


function makeSquare(c){
  let hc = 0.5 * c;
  let pts = [
    pt(-hc, -hc),
    pt(hc, -hc),
    pt(hc, hc),
    pt(-hc, hc)
  ];
  return {pts, angles:[], id:0};
}

function makeMatrix(a = 1, b = 0, tx = 0, c = 0, d = 1, ty = 0){
  return {
    a, b, tx,
    c, d, ty
  };
}

function makeRotationAroundPt(pt, a){
  return multMat(
    makeTranslation(pt.x, pt.y),
    multMat(
      makeRotation(a),
      makeTranslation(-pt.x, -pt.y)
    )
  );
}

function multMat(a, b){
  return makeMatrix(
    a.a * b.a + a.b * b.c, a.a * b.b + a.b * b.d, a.a * b.tx + a.b * b.ty + a.tx,
    a.c * b.a + a.d * b.c, a.c * b.b + a.d * b.d, a.c * b.tx + a.d * b.ty + a.ty
  );
}

function makeRotation(a){
  return makeMatrix(
    Math.cos(a), -Math.sin(a), 0,
    Math.sin(a), Math.cos(a), 0
  );
}

function makeScale(sx, sy){
  return makeMatrix(sx, 0, 0, 0, sy, 0);
}

function scalarMultMat(s, m){
  return makeMatrix(
    s * m.a, s * m.b, s * m.tx,
    s * m.c, s * m.d, s * m.ty
  );
}

function invert(m){
  let k = m.a * m.d - m.b * m.c;
  return scalarMultMat(1 / k, makeMatrix(
    m.d, -m.b, m.b * ((m.a * m.ty - m.c * m.tx) - k * m.tx) / m.a,
    -m.c, m.a, -(m.a * m.y - m.c * m.x)
  ));
}

function makeTranslation(tx, ty){
  return makeMatrix(
    1, 0, tx,
    0, 1, ty
  );
}

function transformPt(m, p){
  return {
    x:m.a * p.x + m.b * p.y + m.tx,
    y:m.c * p.x + m.d * p.y + m.ty
  };
}

function transformPoly(m, poly){
  poly.pts = poly.pts.map(p => transformPt(m, p));
}



function dist2(p1, p2){
  let dx = p2.x - p1.x;
  let dy = p2.y - p1.y;
  return dx * dx + dy * dy;
}

function initRotation(p1, p2, r){
  let pt1 = p1.pts[p1.id];
  let pt2 = p2.pts[p2.id];
  let d1 = dist2(p1.pts[p1.id], r);
  let d2 = dist2(p2.pts[p2.id], r);
  let nr, ang, p;
  if(d1 < d2) p = p1;
  else p = p2;
  let rotationCenter = p.pts[p.id];
  let angle = p.angles[p.id];
  p.id = (p.id + 1) % p.pts.length;
  return {
    center:rotationCenter,
    ang:Math.PI - angle
  };
}

function getCenter(poly){
  let x = 0;
  let y = 0;
  poly.pts.forEach(p => {
    x += p.x;
    y += p.y;
  });
  let n = 1 / poly.pts.length;
  return pt(x * n, y * n);
}

function drawPoly(ctx, poly){
  let p = poly.pts[poly.pts.length - 1];
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
  poly.pts.forEach(p => {
    ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();
}

function computePolyAngles(poly){
  let n = poly.pts.length;
  let prevPt = poly.pts[n - 1];
  for(let i = 0; i < n; i++){
    let pt = poly.pts[i];
    let npt = poly.pts[(i + 1) % n];
    let x1 = prevPt.x - pt.x;
    let y1 = prevPt.y - pt.y;
    let x2 = npt.x - pt.x;
    let y2 = npt.y - pt.y;
    let d1 = Math.hypot(x1, y1);
    let d2 = Math.hypot(x2, y2);
    let r = 1 / (d1 * d2);
    let angle = Math.acos(r * (x1 * x2 + y1 * y2));

    poly.angles[i] = angle;
    prevPt =  pt;
  }
}



var w = 700;
var h = 700;


var stage = new Stage(w, h);

let c2 = 125;
let n1 = Math.floor(Math.random() * 5 + 3);
let n2 = Math.floor(Math.random() * 5 + 3);
let radius1 = 50 + Math.random() * 150;
let radius2 = 50 + Math.random() * 150;
let s1 = makePoly(n1, radius1);
let s2 = makePoly(n2, radius2);
s2.pts.forEach((p, i) => p.name = i);
transformPoly(makeScale(-1, 1), s1);
transformPoly(makeScale(1, -1), s2);

s2.pts.push(s2.pts[0]);
s2.pts = s2.pts.reverse();
s2.pts.length--;

computePolyAngles(s1);
computePolyAngles(s2);
s1.id = 0;
s2.id = 1;

let r1 = -s1.pts[0].x;
let r2 = s2.pts[0].x;
transformPoly(makeTranslation(r2 + r1, 0), s1);
let rotCenter = s2.pts[0];
let rot, steps;
function nextRotation(){
  let rotVel = 0.05;
  let rotData = initRotation(s1, s2, rotCenter);
  rotCenter = rotData.center;
  steps = Math.floor(rotData.ang / rotVel);
  rot = makeRotationAroundPt(rotCenter, rotData.ang / steps);
}
nextRotation();

let loop = new Loop(function(){
  stage.clear();
  transformPoly(rot, s1);
  let ctx = stage.out;
  let c = getCenter(s1);
  let ang = Math.atan2(c.y, c.x);
  ctx.save();
  let d = Math.hypot(c.x, c.y);
  ctx.translate(0.5 * (w - d), 0.5 * h);
  ctx.rotate(-ang);
  drawPoly(ctx, s1);
  drawPoly(ctx, s2);
  if(--steps <= 0){
    nextRotation();
  }
  ctx.restore();
});


//bon positionnement initial + ids de début
