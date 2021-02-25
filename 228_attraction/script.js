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

camera.position.z = 2;
var controls = new THREE.TrackballControls(camera, renderer.element);
controls.dynamicDampingFactor = 0.1;

var center = new THREE.Vector3();


var group = new THREE.Object3D();
scene.add(group);


function updateLineMesh(line)
{
  var points = line.positions;
  var path = new THREE.CatmullRomCurve3(points);
  var geometry = new THREE.Geometry();
  geometry.vertices = path.getPoints( 2 * points.length );
  line.mesh.geometry = geometry;
}

var nLines = 150;

var lines = [];
var geometry = new THREE.Geometry();
var material = new THREE.LineBasicMaterial( {
  opacity:1,
  transparent:false,
  color : 0xffffff
} );
for(var i = 0; i < nLines; i++) {
  var line = {
    position:new THREE.Vector3(
      (Math.random() * 2 - 1),
      (Math.random() * 2 - 1),
      (Math.random() * 2 - 1)
    ).setLength(1),
    vel:new THREE.Vector3(),
    positions:[],
    friends:[],
    material:material,
    mesh : new THREE.Line(geometry, material)
  };
  lines[i] = line;
  group.add(line.mesh);
}


let chances = 0.20;
lines.forEach((line, id) => {
  for(let i = 0; i < nLines; i++){
    if(i === id){
      continue;
    }
    if(Math.random() < chances){
      line.friends.push(lines[i]);
    }
  }
});


function updateLines()
{
  let fr = 0.75;
  let minDist = 0.003;
  let friendMinDist = 0.002;
  let force = new THREE.Vector3();
  let diff = new THREE.Vector3();
  lines.forEach((line, id) => {
    line.vel.multiplyScalar(fr);
    force.set(0, 0, 0);
    for(let i = 0; i < nLines; i++){
      let node2 = lines[i];
      if(i === id){
        continue;
      }
      diff.copy(node2.position).sub(line.position);
      let dist2 = diff.lengthSq();
      let isFriend = line.friends.indexOf(node2) !== -1;
      if((isFriend && dist2 > friendMinDist) || (!isFriend && dist2 < minDist)){
        let attr = 0.0001 / dist2;
        if(!isFriend){
          attr *= -1;
        }
        force.add(diff.multiplyScalar(attr));
      }
    }
    line.vel.add(force.multiplyScalar(0.5));
    line.positions.push(line.position.clone());
    line.position.add(line.vel);
  });
}

var time = 0;
var ot = Date.now();
for(let i = 0; i < 200; i++){
  updateLines();
}
lines.forEach(line => {

  if(line.positions.length > 2){
    updateLineMesh(line);
  }
});

function update()
{
  var t = Date.now();
  var dt = t - ot;
  ot = t;
  controls.update(dt);
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}
update();

