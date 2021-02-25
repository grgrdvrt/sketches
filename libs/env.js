function Env()
{
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  this.renderer = new THREE.WebGLRenderer({antialias:true});
  this.renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( this.renderer.domElement );


  this.ambientLight = new THREE.AmbientLight(0x808080);
  this.scene.add(this.ambientLight);

  this.directionalLight = new THREE.DirectionalLight(0x808080);
  this.directionalLight.position.set(1, 1, 1);
  this.directionalLight.lookAt(0, 0, 0);
  this.scene.add(this.directionalLight);

  this.camera.position.z = 5;

  this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);


  window.addEventListener("resize", this.onResize.bind(this));
}


Env.prototype = {

  start : function(updateCallback)
  {
    this.updateCallback = updateCallback;
    this.update();
  },


  update : function()
  {
    this.updateCallback();

    this.controls.update();

    this.renderer.render(this.scene, this.camera);
    
    requestAnimationFrame(this.update.bind(this));
  },


  onResize : function()
  {
    var w = window.innerWidth;
    var h = window.innerHeight;

    this.renderer.setSize(w, h);

    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }
};
