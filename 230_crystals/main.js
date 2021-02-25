import createCells from "./cells";
import createGeometry from "./geometry";

let w = 100;
let h = 100;

let scene = new THREE.Scene();

let renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(1, 1, 1).multiplyScalar(100);
camera.lookAt(new THREE.Vector3());


let group = new THREE.Group();
group.position.y = -50;
scene.add(group);


let controls = new THREE.OrbitControls(camera, renderer.element);

scene.add(new THREE.AmbientLight(0xffffff));

let directional = new THREE.DirectionalLight(0xffffff);
directional.position.set(1, 1, 1);
directional.lookAt(0, 0, 0);
scene.add(directional);

renderer.setClearColor(0xffffff);
scene.fog = new THREE.FogExp2(0xffffff, 0.002);


function createMesh(geometry)
{
  let material = new THREE.MeshStandardMaterial({
    color:0xaaaaaa,
    roughness:0.4,
    metalness:1,
    shading:THREE.FlatShading
  });
  let mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);
  return mesh;
}

let mesh = createMesh(createGeometry(createCells(50, w, h)));



let time = 0;
let oldTime = Date.now();
function update()
{
  let now = Date.now();
  let dt = now - oldTime;
  oldTime = now;
  time += dt;

  controls.update(dt);
  renderer.render(scene, camera);
  group.rotation.y += 0.01;

  requestAnimationFrame( update );
}

update();
