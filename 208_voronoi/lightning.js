export default function create(nLights, w, h)
{
  var pointLights = [];

  var globalHue = Math.random() * 360;
  var sat = Math.round(Math.random() * 50) + 50;
  var lig = 60;

  for(var i = 0; i < nLights; i++){

    var hue = Math.round(globalHue + Math.random() * 120);
    var color = "hsl(" + hue + ", " + sat + "%, " + lig + "%)";

    var light = new THREE.PointLight(color, 1, 0.3 * w, 1);
    light.position.set(
      (Math.random() - 0.5) * w,
      Math.random() * 3 + 1,
      (Math.random() - 0.5) * h
    );
    pointLights[i] = light;
  }

  var globalColor = new THREE.Color();
  globalColor.setHSL(globalHue / 360, sat / 100, lig / 100);
  globalColor.multiplyScalar(0.3);
  
  var ambientLight = new THREE.AmbientLight(globalColor);

/*var directional = new THREE.DirectionalLight(0xffffff);
  directional.position.set(1, 1, 1);
  directional.lookAt(0, 0, 0);
  scene.add(directional);*/

  return {
    pointLights:pointLights,
    ambientLight:ambientLight,
    globalColor:globalColor
  };
}
