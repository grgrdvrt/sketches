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

camera.position.z = 4;
var controls = new THREE.TrackballControls(camera, renderer.element);
controls.dynamicDampingFactor = 0.1;

var center = new THREE.Vector3();



let group = new THREE.Object3D();
scene.add(group);

let directional = new THREE.DirectionalLight();
directional.position.set(1, 1, 1);
directional.lookAt(center);
scene.add(directional);
scene.add(new THREE.AmbientLight());

// let geometry = new THREE.BoxBufferGeometry(1, 1, 1);
let geometry = new THREE.TorusKnotBufferGeometry(1, 1/3, 100, 16);
let mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
  color:0x111111,
  roughness:0.5,
  metalness:0.8
}));
group.add(mesh);


let nLines = 150;


function initLine(direction, mesh, distBegin, distEnd = distBegin){
  let box = new THREE.Box3();
  box.setFromObject(mesh);
  let center = box.getCenter();
  let radius = box.max.clone().sub(box.min).length() / 3;//pas la bonne taille : trop large
  let b1 = getHortogonal(direction);
  let b2 = direction.clone().cross(b1);
  let offset = b1.multiplyScalar(Math.random() * 2 - 1).add(b2.multiplyScalar(Math.random() * 2 - 1));

  return {
    begin:direction.clone().negate().setLength(distBegin).add(offset),
    end:direction.clone().setLength(distEnd).add(offset),
    rayOriginOffset:offset.clone().setLength(radius),
    rayDir:offset.clone().negate().normalize(),
    radius
  };
}

function createLinePts(lineParams, mesh, nIterations){
  let p = new THREE.Vector3();
  let rayOrig = new THREE.Vector3();
  let raycaster = new THREE.Raycaster(rayOrig, lineParams.rayDir, 0, 2 * lineParams.radius);
  let pts = [];
  for(let i = 0; i < nIterations; i++){
    p.lerpVectors(lineParams.begin, lineParams.end, i / nIterations);
    rayOrig.copy(p).add(lineParams.rayOriginOffset);
    raycaster.set(rayOrig, lineParams.rayDir);
    let intersections = raycaster.intersectObject(mesh, true);
    if(intersections.length > 0){
      let dist = rayOrig.distanceTo(p);
      if(intersections[0].distance < dist){
        // pts[i] = intersections[0].point;
        pts.push(intersections[0].point);
      }
      else {
        // pts[i] = p.clone();
        // pts.push(p.clone());
      }
    }
    else {
      // pts[i] = p.clone();
    }
  }
  return pts;
}

function createLine(pts){
  let curve = new THREE.CatmullRomCurve3(pts);
  let geometry = new THREE.Geometry();
  geometry.vertices = curve.getPoints(200);

  let material = new THREE.LineBasicMaterial({
	  color: 0xffffff,
    opacity:Math.random() * 0.4 + 0.4,
    transparent:true
  });
  return new THREE.Line( geometry, material );
}

function getHortogonal(v){
  let result = new THREE.Vector3(0, 1, 0);
  if(v.x === v.y && v.x === 0){
    result.set(1, 0, 0);
  }
  return result.cross(v);
}


let geometries = [];
for(let i = 0; i < 1000; i++){
  let direction = new THREE.Vector3(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    Math.random() * 2 - 1
  );

  let params = initLine(direction, mesh, 3);
  let pts = createLinePts(params, mesh, 30);
  if(pts.length > 1){
    let line = createLine(pts);
    geometries.push(line.geometry);
    group.add(line);
  }
}


mesh.scale.multiplyScalar(0.9);

let time = 0;
let ot = 0;
function update()
{
  time++;
  var t = Date.now();
  var dt = t - ot;
  ot = t;
  controls.update(dt);
  group.rotation.y += 0.01;
  renderer.render(scene, camera);
  geometries.forEach(geometry => {
    if(geometry._bufferGeometry){
      geometry._bufferGeometry.setDrawRange(0, 0.5 * time);
    }
  });
  requestAnimationFrame(update);
}
update();

