var nParticlesInit = 7;
var maxParticles = 3000;
var minDist = 0.20;
var linkMaxLength = 0.20;
var linkGrowthRate = 1.02;
var friction = 0.30;
var separationForce = 0.10;

var radiusInit =  5 * minDist / (2 * Math.sin(Math.PI / nParticlesInit));

var nParticles = nParticlesInit;

var temp = new THREE.Vector3();


function Particle(x, y, z)
{
  this.pos = new THREE.Vector3(x, y, z);
  this.oPos = this.pos.clone();
  this.force = new THREE.Vector3();
  this.mass = 1;
}

Particle.prototype = {
  clone : function()
  {
    var p = new Particle(this.pos.x, this.pos.y, this.pos.z);
    p.oPos.copy(this.oPos);
    p.force.copy(this.force);
    return p;
  }
};


function Link(a, b)
{
  this.a = a;
  this.b = b;
  this.a.next = b;
  this.b.prev = a;
  this.length = temp.copy(b.pos).sub(a.pos).length();
}


Link.prototype = {
  update : function()
  {
    var diff = temp.copy(this.b.pos).sub(this.a.pos);
    var dist = diff.length();
    this.length *= linkGrowthRate;
    if(this.length > dist)return;
    var force = diff.multiplyScalar(0.9 * 0.5 * (this.length - dist) / dist);
    this.a.force.sub(force);
    this.b.force.add(force);
  }
};



var particles = [];

for(var i = 0; i < nParticlesInit; i++){
  var angle = 2 * Math.PI * i / nParticlesInit;
  var radius = radiusInit * (1 + 0.1 * (Math.random() * 2 - 1));
  var p = new Particle(
    radius * Math.cos(angle),
    radius * Math.sin(angle),
    2 * (Math.random() * 2 - 1)
  );
  particles[i] = p;
}


var links = [];
for(var i = 0; i < nParticles; i++){
  links[i] = new Link(
    this.particles[i],
    this.particles[(i + 1) % nParticles]
  );
}


function resetParticles()
{
  for(var i = 0; i < nParticles; i++){
    particles[i].force.set(0, 0, 0);
  }
}

function separateParticles()
{
  var diff = new THREE.Vector3();
  for(var i = 0; i < nParticles; i++){
    var p0 = particles[i];
    for(var j = i + 1; j < nParticles; j++){
      var p1 = particles[j];
      if(p1 === p0.prev || p1 === p0.next)continue;
      diff.copy(p1.pos).sub(p0.pos);
      var d2 = diff.lengthSq();
      if(d2 < minDist * minDist){
        var dist = Math.sqrt(d2);
        var separation = diff.multiplyScalar(separationForce * 0.5 * (minDist - dist) / dist);
        p0.force.sub(separation);
        p1.force.add(separation);
      }
    }
  }
}



var forces = [];
for(var i = 0; i < 10; i++){
  forces[i] = {
    pos:new THREE.Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    ).multiplyScalar(1),
    radius:Math.random() * 0.8 + 0.05,
    strength : Math.random() * 0.003 + 0.001
  };
}
function accumulateForces()
{
  var nLinks = links.length;
  var i;
  for(i = 0; i < nLinks; i++){
    var link = links[i];
    link.update();
  }

  var nForces = forces.length;
  for(i = 0; i < nParticles; i++){
    var p = particles[i];
    for(var j = 0; j < nForces; j++){
      var force = forces[j];
      var diff = temp.copy(p.pos).sub(force.pos);
      var resultForce = diff.multiplyScalar(-force.strength * diff.length() / nForces);
      p.force.add(resultForce);
    }
    //p.force.add(temp.copy(p.pos).multiplyScalar(0.001 / p.pos.length()));
  }
}


function checkLinksSizes()
{
  var nLinks = links.length;
  for(var i = 0; i < nLinks; i++){
    var link = links[i];
    var diff = temp.copy(link.a.pos).sub(link.b.pos);
    if((link.length > linkMaxLength || diff.length() > linkMaxLength) && nParticles < maxParticles){
      splitLink(link);
      nLinks++;
      i++;
    }
  }
}


function splitLink(link)
{
  link.length *= 0.5;
  var newPt = new Particle(0, 0, 0);
  newPt.pos.copy(link.a.pos).add(link.b.pos).multiplyScalar(0.5);
  newPt.oPos.copy(newPt.pos);

  newPt.force.copy(link.a.force).add(link.b.force).multiplyScalar(0.5);

  var newLink = new Link(newPt, link.b);
  link.b = newPt;
  links.splice(links.indexOf(link) + 1, 0, newLink);
  particles.push(newPt);

  newPt.prev = link.a;
  newPt.next = link.b;
  link.a.next = newLink.b.prev = newPt;

  nParticles++;
}


function applyFriction()
{
  var temp = new THREE.Vector3();
  for(var i = 0; i < nParticles; i++){
    var p = particles[i];
    temp.copy(p.pos).sub(p.oPos).multiplyScalar(friction);
    p.pos.copy(p.oPos).add(temp);
  }
}

function applyConstraints()
{
  var maxDist = 1;
  for(var i = 0; i < nParticles; i++){
    var p = particles[i];
    //if(p.pos.length() > maxDist){
      //p.pos.setLength(maxDist);
    //}
    var nForces = forces.length;
    for(var j = 0; j < nForces; j++){
      var f = forces[j];
      var diff = temp.copy(p.pos).sub(f.pos);
      if(diff.length() < f.radius){
        var r = f.radius / diff.length();
        p.pos.x = f.pos.x + r * diff.x;
        p.pos.y = f.pos.y + r * diff.y;
        p.pos.z = f.pos.z + r * diff.z;
      }
    }
    if(p.pos.y < -1.5){
      p.pos.y = -1.5;
    }

  }
}


function updateParticles()
{
  var dt = 1;
  var temp = new THREE.Vector3();
  for(var i = 0; i < nParticles; i++){
    var p = particles[i];
    temp.copy(p.pos);
    p.pos.multiplyScalar(2).sub(p.oPos).add(p.force.multiplyScalar(dt * dt / p.mass));
    p.oPos.copy(temp);
  }
}


function updateSimulation()
{
  resetParticles();
  separateParticles();
  accumulateForces();
  checkLinksSizes();
  applyFriction();
  updateParticles();
  applyConstraints();
}
