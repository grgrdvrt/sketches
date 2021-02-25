import createCells from "./cells";
import createGeometry from "./geometry";
import createLightning from "./lightning";
import createMaterial from "./material";


var w = 100;
var h = 100;

var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(10, 10, 10);
camera.lookAt(new THREE.Vector3());


var group = new THREE.Group();
scene.add(group);


var controls = new THREE.OrbitControls(camera, renderer.element);

var lights = createLightning(10, w, h);
var pointLights = lights.pointLights;
pointLights.forEach(function(light){
  group.add(light);
});

scene.add(lights.ambientLight);

var globalColor = lights.globalColor;
globalColor.multiplyScalar(0.3);
renderer.setClearColor(globalColor);
scene.fog = new THREE.FogExp2(globalColor, 0.04);


function createMesh(geometry)
{
  var material = createMaterial();
  var mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);
  return mesh;
}

var mesh = createMesh(
  createGeometry(
    createCells(10000, w, h)));



var time = 0;
var oldTime = Date.now();
function update()
{
  var now = Date.now();
  var dt = now - oldTime;
  oldTime = now;
  time += dt;
  mesh.material.uniforms.time.value = time;

  controls.update(dt);
  renderer.render(scene, camera);

  requestAnimationFrame( update );
}

update();
