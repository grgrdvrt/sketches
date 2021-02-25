//params
let nSpheres = 1300;
let mainRadius = 1;

let nMotions = 15;
let minDuration = 3000;
let maxDuration = 7000;
let minRadiusOffset = 0.1;
let maxRadiusOffset = 0.3;



//utils
function lerp(a, b, t){
  return a + t * (b - a);
}

function lerpV(v1, v2, t, dest){
  return dest.copy(v2).sub(v1).multiplyScalar(t).add(v1);
}



//scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 3;

var renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setClearColor(0xffffff);
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

var controls = new THREE.TrackballControls(camera, renderer.element);

var center = new THREE.Vector3();

scene.add(new THREE.AmbientLight(0x808080));
var directional = new THREE.DirectionalLight(0x808080);
directional.position.set(1, 3, 1).multiplyScalar(2);
directional.lookAt(center);
scene.add(directional);


//mainSphere
var sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
let mainSphere = new THREE.Mesh(
  sphereGeometry,
  new THREE.MeshStandardMaterial({
    roughness:0,
    metalness:0,
    color:0xffffff
  })
);
mainSphere.scale.multiplyScalar(mainRadius);
scene.add(mainSphere);



//spheres
var spheres = [];

var h = Math.random();
let minRadius = 0.05;
for(let i = 0; i < nSpheres; i++){
  let radius = minRadius;

  let h2 = Math.random() * 0.2 + 0.8 * h;
  if(Math.random() < 0.1){
    radius += 0.02;
    h2 += 0.3; 
  }
  let color = new THREE.Color();
  color.setHSL(
    h2,
    Math.random(),
    Math.random() * 0.5 + 0.4
  );
  let material = new THREE.MeshStandardMaterial({
    roughness:1,
    metalness:0,
    color:color
  });

  var sphere = new THREE.Mesh(sphereGeometry, material);
  sphere.radius = radius;
  sphere.scale.multiplyScalar(sphere.radius);
  sphere.position.set(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    Math.random() * 2 - 1
  ).setLength(mainRadius + sphere.radius);
  scene.add(sphere);
  spheres[i] = sphere;
}

function spaceSpheres(){
  for(let i = 0; i < nSpheres - 1; i++){
    let s1 = spheres[i];
    for(let j = i + 1; j < nSpheres; j++){
      let s2 = spheres[j];
      let d = s1.position.clone().sub(s2.position);
      let l = d.length();
      let minLength = s1.radius + s2.radius;
      if(l < minLength){
        d.setLength((minLength - l) * (s2.radius / minLength));
        s1.position.add(d);
        d.setLength((minLength - l) * (s1.radius / minLength));
        s2.position.sub(d);
        s1.position.setLength(1 + s1.radius);
        s2.position.setLength(1 + s2.radius);
      }
    }
  }
}



//motions

function resetMotion(motion){
  let targetId = Math.floor(Math.random() * (spheres.length - nMotions));
  let target = spheres[targetId];
  spheres[targetId] = spheres[motion.slotId];
  spheres[motion.slotId] = target;
  motion.target = target;


  motion.timeBegin = Date.now();
  motion.duration = lerp(minDuration, maxDuration, Math.random());

  let begin = motion.begin;
  begin.position.copy(target.position);
  begin.color.copy(target.material.color);
  begin.radius = target.radius;

  let end = motion.end;
  end.position.set(
    Math.random() * 2 - 1,
    Math.random() * 2 - 1,
    Math.random() * 2 - 1
  ).setLength(mainRadius + target.radius);
  end.radius = target.radius + lerp(minRadiusOffset, maxRadiusOffset, Math.pow(Math.random(), 4));
}


//retour complete:boolean 
function updateMotion(motion, time){
  let roughTimeRatio = (time - motion.timeBegin) / (motion.duration);
  let timeRatio = Math.min(roughTimeRatio, 1);
  lerpV(motion.begin.position, motion.end.position, timeRatio, motion.target.position);

  let s = 4;
  let m = Math.min(-Math.abs(s * 2 * (timeRatio - 0.5)) + s, 1);
  let ratio2 = m * m * (3 - 2 * m);
  let r = lerp(motion.begin.radius, motion.end.radius, ratio2);
  motion.target.radius = r;
  motion.target.scale.set(r, r, r);
  let color = motion.target.material.color;
  color.set(motion.begin.color).lerp(motion.end.color, ratio2);

  motion.target.position.setLength(mainRadius + r);

  return roughTimeRatio > 1;
}

let motions = [];
for(let i = 0; i < nMotions; i++){
  let motion = {
    timeBegin:0,
    duration:0,
    slotId : nSpheres - i - 1,
    begin:{
      position : new THREE.Vector3(),
      color : new THREE.Color(),
      radius: 0
    },
    end:{
      position : new THREE.Vector3(),
      color : new THREE.Color(0xffffff),
      radius: 0
    }
  };

  resetMotion(motion);
  motions[i] = motion;
}



function update(){
  controls.update();
  motions.forEach(motion => {
    let isComplete = updateMotion(motion, Date.now());
    if(isComplete){
      resetMotion(motion);
    }
  });
  spaceSpheres();
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}
update();
