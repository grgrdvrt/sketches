var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({
  antialias:true,
});
renderer.setClearColor(0xffffff);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );

function resize(){
  var w = window.innerWidth;
  var h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
document.body.onresize = resize;
resize();
var center = new THREE.Vector3();

scene.add(new THREE.AmbientLight(0x808080));
var directional = new THREE.DirectionalLight(0x808080);
directional.position.set(1, 3, 1).multiplyScalar(2);
directional.lookAt(center);
scene.add(directional);
directional.castShadow = true;
directional.shadow.mapSize.width = 2048;
directional.shadow.mapSize.height = 2048;


var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshStandardMaterial( {
  roughness:0.4,
  metalness:0.4,
  color: 0x222222,
        shading:THREE.FlatShading
} );

var mesh = new THREE.Mesh( geometry, material );
mesh.castShadow = true;
mesh.receiveShadow = true;

var lineMaterial = new THREE.LineBasicMaterial( {
  color : 0x000000
} );
var line = new THREE.Line(geometry, lineMaterial);
line.castShadow = true;
line.receiveShadow = true;
scene.add(line);

camera.position.z = 3;

var sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1.35, 30, 30),
  new THREE.MeshStandardMaterial({
    roughness:0,
    metalness:0,
    color:0xffffff
  })
);
scene.add(sphere);
sphere.castShadow = true;
sphere.receiveShadow = true;

    var planeMaterial = new THREE.MeshLambertMaterial({
      color:0xffffff,
      side:THREE.BackSide
    });
    var plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(100, 100, 1, 1), planeMaterial);
    plane.rotation.x = 0.5 * Math.PI;
    plane.position.set(0, -1.5, 0);
    plane.receiveShadow = true;
    scene.add(plane);


var nParticlesInit = 10;
var maxParticles = 3000;
var minDist = 0.25;
var linkMaxLength = 0.35;
var linkGrowthRate = 1.02;
var radiusInit = minDist / (2 * Math.sin(Math.PI / nParticlesInit));

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
    0.1
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
        var separation = diff.multiplyScalar(0.01 * 0.5 * (minDist - dist) / dist);
        p0.force.sub(separation);
        p1.force.add(separation);
      }
    }
  }
}



function applyLinks()
{
  var nLinks = links.length;
  for(var i = 0; i < nLinks; i++){
    var link = links[i];
    link.update();
    if(link.length > linkMaxLength && nParticles < maxParticles){
      splitLink(link);
      nLinks++;
      i++;
    }
  }
}


function splitLink(link)
{
  link.length *= 0.5;
  var newPt = new Particle(
    0.5 * (link.a.pos.x + link.b.pos.x),
    0.5 * (link.a.pos.y + link.b.pos.y),
    0.5 * (link.a.pos.z + link.b.pos.z)
  );
  newPt.force.set(
    0.5 * (link.a.force.x + link.b.force.x),
    0.5 * (link.a.force.y + link.b.force.y),
    0.5 * (link.a.force.z + link.b.force.z)
  );
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
    temp.copy(p.pos).sub(p.oPos).multiplyScalar(0.9);
    p.pos.copy(p.oPos).add(temp);
  }
}

function constraintFrame()
{
  var maxDist = 1.5;
  for(var i = 0; i < nParticles; i++){
    var p = particles[i];

    p.pos.setLength(maxDist);
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

var controls = new THREE.OrbitControls(camera, renderer.element);

function updateSimulation()
{
  resetParticles();
  separateParticles();
  applyLinks();
  applyFriction();
  constraintFrame();
  updateParticles();
}


function makeFinalGeometry(points)
{
  var path = new THREE.CatmullRomCurve3(points);
  var geometry = new THREE.TubeGeometry( path, 10 * points.length, 0.1 * minDist, 4, true );
  mesh.geometry = geometry;
}



function makeTempGeometry(points)
{
  var path = new THREE.CatmullRomCurve3(points);
  var geometry = new THREE.Geometry();
  geometry.vertices = path.getPoints( points.length );
  line.geometry = geometry;
}

function getPointsList()
{
  var nLinks = links.length;
  var link = links[0];
  var points = [link.a.pos];
  for(var i = 1; i < nLinks; i++){
    link = links[i];
    points.push(link.b.pos);
  }
  return points;
}


var finalMesh = false;

function makeFromData()
{
  var points = [];
  var n = pts.length / 3;
  for(var i = 0; i < n; i++){
    var id = 3 * i;
    points.push(new THREE.Vector3(
      pts[id],
      pts[id + 1],
      pts[id + 2]
    ));

  }
  makeFinalGeometry(points);
  scene.add(mesh);
  scene.remove(line);
  finalMesh = true;
}

//makeFromData();
//

function pointsToString(points)
{
  return points.reduce(function(arr, p, i) {
    var id = 3 * i;
    arr[id] = p.x;
    arr[id + 1] = p.y;
    arr[id + 2] = p.z;
    return arr;
  }, []).join(",");
}


var time = 0;
function update(){
  var points;
  if(!finalMesh && particles.length < maxParticles){
    updateSimulation();
    points = getPointsList();
    makeTempGeometry(points);
  }
  else if(!finalMesh){
    points = getPointsList();
    makeFinalGeometry(points);
    finalMesh = true;
    scene.add(mesh);
    scene.remove(line);

    //console.log(pointsToString(points));
  }
  line.rotation.x = 0.01 * time;
  line.rotation.y = 0.01 * time;
  line.rotation.z = 0.01 * time;
  mesh.rotation.x = 0.01 * time;
  mesh.rotation.y = 0.01 * time;
  mesh.rotation.z = 0.01 * time;
  time++;

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}
update();

