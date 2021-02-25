tools.mixin(tools, this);


//utils
function vec3(x = 0, y = 0, z = 0){
  return {x, y, z};
}

function cloneVec(v){
  return {x:v.x, y:v.y, z:v.z};
}

function copyVec(from, to){
  to.x = from.x;
  to.y = from.y;
  to.z = from.z;
}


//orbit
function makeOrbit(center, radius){
  return {
    radius:radius,
    v1:vec3(1, 0, 0),
    v2:vec3(0, 1, 0),
    center
  };
}

function getPosOnOrbit(orbit, ang, targetVec){
  let ca = orbit.radius * Math.cos(ang);
  let sa = orbit.radius * Math.sin(ang);
  targetVec.x = ca * orbit.v1.x + sa * orbit.v2.x + orbit.center.x;
  targetVec.y = ca * orbit.v1.y + sa * orbit.v2.y + orbit.center.y;
  targetVec.z = ca * orbit.v1.z + sa * orbit.v2.z + orbit.center.z;
  return targetVec;
}


//planet
function makePlanet(size, orbit, vel, angInit = 0){
  return {
    size,
    pos:getPosOnOrbit(orbit, angInit, vec3()),
    vel:vel,
    ang:angInit,
    orbit:orbit
  };
}

function updatePlanet(planet){
  planet.ang += planet.vel;
}


//trail
function makeTrail(planet, length){
  let pts = [];
  let posInit = getPosOnOrbit(planet.orbit, planet.ang, vec3()); 
  for(let i = 0; i < length; i++){
    pts[i] = cloneVec(posInit);
  }
  return {
    planet,
    pts,
    id:0
  };
}

let tmp = vec3();
function updateTrail(trail){
  let pos = getPosOnOrbit(trail.planet.orbit, trail.planet.ang, tmp);
  trail.id++;
  if(trail.id >= trail.pts.length){
    trail.id = 0;
  }
  copyVec(pos, trail.pts[trail.id]);
}

function getTrailPt(trail, id){
  return trail.pts[(trail.id + id) % trail.pts.length];
}


//rendering
function drawOrbit(ctx, orbit){
  ctx.save();
  ctx.beginPath();
  ctx.transform(
    orbit.v1.x, orbit.v1.y,
    orbit.v2.x, orbit.v2.y,
    orbit.center.x, orbit.center.y
  );
  ctx.arc(0, 0, orbit.radius, 0, 2 * Math.PI);
  ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
  ctx.stroke();
  ctx.restore();
}

function drawTrail(ctx, trail){
  ctx.save();
  ctx.lineCap = ctx.lineJoin = "round";
  let n = trail.pts.length;
  let pt = getTrailPt(trail, 1);
  let p = trail.planet;
  for(let i = 2; i < n + 1; i++){
    ctx.beginPath();
    ctx.moveTo(pt.x, pt.y);
    pt = getTrailPt(trail, i);
    let a = p.ang;
    let side = Math.cos(a) * p.orbit.v1.x * p.orbit.v2.y;
    if(side < 0){
      ctx.globalCompositeOperation = "source-over";
    }
    else {
      ctx.globalCompositeOperation = "destination-over";
    }
    ctx.lineWidth = trail.planet.size * i / n;
    ctx.lineTo(pt.x, pt.y);
    ctx.stroke();
  }
  ctx.restore();
}

let w = 700;
let h = 700;


let stage = new Stage(w, h);
let ctx = stage.out;
let radiusMin = 50;

let orbits = [];
let planets = [];
let trails = [];
let n = 7;
for(let i = 0; i < n; i++){
  let orbit = makeOrbit(vec3(0, 0, 0), radiusMin + 25 * (i + 1) + Math.random() * 10 * i);
  let planet = makePlanet(Math.random() * 10 + 5, orbit, 0.01 + Math.random() * 0.05, 0);
  let trail = makeTrail(planet, 20);
  orbits[i] = orbit;
  planets[i] = planet;
  trails[i] = trail;
}


let time = 0;
let loop = new Loop(function(){
  time++;
  stage.clear();
  ctx.save();
  ctx.translate(0.5 * w, 0.5 * h);
  ctx.beginPath();
  ctx.arc(0, 0, radiusMin - 5, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "white";
  ctx.fill();
  for(let i = 0; i < n; i++){
    let planet = planets[i];
    let orbit = orbits[i];
    let trail = trails[i];
    orbit.v1.x = Math.cos((i + 1) * 0.001 * time);
    orbit.v2.x = Math.sin((i + 1) * 0.001 * time);
    updatePlanet(planet);
    updateTrail(trails[i], );
    drawOrbit(ctx, orbit);
    drawTrail(ctx, trail);
  }

  ctx.restore();
});
