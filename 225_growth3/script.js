var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({
  antialias:true
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

var controls = new THREE.OrbitControls(camera, renderer.element);

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
  color: 0x222222
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

forces.forEach(function(f){
  var sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.9 * f.radius, 30, 30),
    new THREE.MeshStandardMaterial({
      roughness:0,
      metalness:0,
      color:0xffffff
    })
  );
  sphere.position.copy(f.pos);
  scene.add(sphere);
  sphere.castShadow = true;
  sphere.receiveShadow = true;
});

var planeMaterial = new THREE.MeshLambertMaterial({
  color:0xffffff,
  side:THREE.BackSide
});
var plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(100, 100, 1, 1), planeMaterial);
plane.rotation.x = 0.5 * Math.PI;
plane.position.set(0, -1.5, 0);
plane.receiveShadow = true;
scene.add(plane);




function makeFinalGeometry(points)
{
  var path = new THREE.CatmullRomCurve3(points);
  var geometry = new THREE.TubeGeometry( path, 2 * points.length, 0.01, 8, true );
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
  time++;

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}
update();

