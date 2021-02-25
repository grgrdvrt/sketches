var center = new THREE.Vector3();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.name = "camera";
scene.add(camera);

var renderer = new THREE.WebGLRenderer({antialias:true});
resize();
document.body.appendChild( renderer.domElement );


var globalHue = Math.random() * 360;
var sat = Math.round(Math.random() * 50) + 50;
var lig = 60;
            
var mainColor = "hsl(" + globalHue + ", " + sat + "%, " + Math.floor(lig * 0.5) + "%)";
var ambient = new THREE.AmbientLight(mainColor);
ambient.name = "ambientLight";
scene.add(ambient);

var pointLights = [];
var nPls = 5;
for(var i = 0 ; i < nPls; i++){
  var hue = Math.round(globalHue + Math.random() * 120);
  var color = "hsl(" + hue + ", " + sat + "%, " + lig + "%)";
  var light = new THREE.PointLight(color, 1, 1);
  light.name = "pointLight";
  scene.add(light);
  light.position.set(
    Math.random() * 2 - 1,
    Math.random(),
    Math.random() * 2 - 1
  ).multiplyScalar(0.5);
  pointLights[i] = {
    light:light,
    timeScale : 0.01 + 0.03 * Math.random(),
    timeOffset : Math.random() * 2 * Math.PI
  };
}

var geometry = new THREE.PlaneBufferGeometry(1, 1, 50, 50);
var material = new THREE.ShaderMaterial( {

  uniforms: THREE.UniformsUtils.merge( [

    THREE.UniformsLib.common,
    THREE.UniformsLib.aomap,
    THREE.UniformsLib.lightmap,
    THREE.UniformsLib.emissivemap,
    THREE.UniformsLib.bumpmap,
    THREE.UniformsLib.normalmap,
    THREE.UniformsLib.displacementmap,
    THREE.UniformsLib.fog,
    THREE.UniformsLib.lights,

    {
      time: { value: 1.0 },
      diffuse : { value: new THREE.Color( 0x808080 ) },
      emissive : { value: new THREE.Color( 0x000000 ) },
      specular : { value: new THREE.Color( 0x000000 ) },
      shininess: { value: 20 }
    }

  ] ),

  lights:true,
  //vertexShader: THREE.ShaderChunk.meshphong_vert,
  vertexShader: document.getElementById( 'vertexShader' ).textContent,
  fragmentShader: document.getElementById( 'fragmentShader' ).textContent

} );
//var material = new THREE.MeshPhongMaterial({color:0x808080});
var plane = new THREE.Mesh( geometry, material );
plane.name = "plane";
scene.add( plane );
plane.rotation.x = -0.5 * Math.PI;

camera.position.set(0.0, 1.0, 1.0).multiplyScalar(0.3);
//camera.position.set(0.0, 1.0, 0.0);
camera.lookAt(center);

var time = 0;
function render() {
  requestAnimationFrame( render );

  pointLights.forEach(function(p){
    p.light.power = 4 * Math.PI * (0.5 + 0.5 * Math.cos(p.timeScale * time + p.timeOffset));
  });
  time++;
  material.uniforms.time.value = time;

  renderer.render(scene, camera);
}

function resize(){
  renderer.setSize( window.innerWidth, window.innerHeight );
}


document.onresize = resize;


render();



//bump
