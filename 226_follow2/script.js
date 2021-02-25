var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.01, 100 );

var renderer = new THREE.WebGLRenderer({
  antialias:true
});
//renderer.setClearColor(0xffffff);
renderer.setSize( window.innerWidth, window.innerHeight );
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

camera.position.z = 0.25;
var controls = new THREE.TrackballControls(camera, renderer.element);
controls.dynamicDampingFactor = 0.1;

var center = new THREE.Vector3();


var group = new THREE.Object3D();
scene.add(group);


function updateLine(particle)
{
  var points = particle.positions;
  var path = new THREE.CatmullRomCurve3(points);
  var geometry = new THREE.Geometry();
  geometry.vertices = path.getPoints( 2 * points.length );
  particle.line.geometry = geometry;
}

var n = 250;

var particles = [];
var geometry = new THREE.Geometry();
for(var i = 0; i < n; i++) {
  var material = new THREE.LineBasicMaterial( {
    opacity:0.05,
    transparent:true,
    color : 0xffffff
  } );
  var p = {
    position:new THREE.Vector3(
      (Math.random() * 2 - 1),
      (Math.random() * 2 - 1),
      (Math.random() * 2 - 1)
    ).normalize(),
    vel:new THREE.Vector3(),
    v:Math.random() * 0.01 + 0.01,
    size:1,
    positions:[],
    material:material,
    line : new THREE.Line(geometry, material)
  };
  particles[i] = p;
  group.add(p.line);
}


particles.forEach(function(p, i){
  var target = particles[(i + 1) % n]; 
  p.target = target;
  target.follower = p;
});


var time = 0;
var ot = Date.now();
function update()
{
  if(particles.length > 1){
    var i, p;
    for(i = 0; i < n; i++){
      p = particles[i];
      p.material.opacity += 0.001;
      var diff = p.target.position.clone().sub(p.position);
      var dist2 = diff.lengthSq();
      if(dist2 < 0.0001){
        p.follower.target = p.target;
        p.target.follower = p.follower;
        p.target.size += p.size;
        particles.splice(i, 1);
        n--;
        i--;
      }
      else {
        var v = p.v / Math.sqrt(dist2);
        p.vel.copy(diff.multiplyScalar(v));
      }
    }

    for(i = 0; i < n; i++){
      p = particles[i];
      p.position.add(p.vel);
      p.positions.push(p.position.clone());
      if(p.positions.length > 2){
        updateLine(p);
      }
    }
  }
  group.rotation.y += 0.001;
  var t = Date.now();
  var dt = t - ot;
  ot = t;
  controls.update(dt);
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}
update();

