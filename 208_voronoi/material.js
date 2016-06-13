
var lib = name => THREE.UniformsLib[name];
var chunk = name => THREE.ShaderChunk[name];

var uniforms = THREE.UniformsUtils.merge( [

  lib("common"),
  lib("aomap"),
  lib("lightmap"),
  lib("emissivemap"),
  lib("bumpmap"),
  lib("normalmap"),
  lib("displacementmap"),
  lib("fog"),
  lib("lights"),
  lib("shadowmap"),

  {
    "emissive" : { type: "c", value: new THREE.Color( 0x000000 ) },
    "specular" : { type: "c", value: new THREE.Color( 0x111111 ) },
    "shininess": { type: "f", value: 30 },
    "time": { type: "f", value: 0 }
  }

] );

var vertexShader = [

  "#define PHONG",

  "varying vec3 vViewPosition;",

  "#ifndef FLAT_SHADED",

  "	varying vec3 vNormal;",

  "#endif",

  "	uniform float time;",
  "	attribute vec3 center;",

  chunk("common"),
  chunk("uv_pars_vertex"),
  chunk("uv2_pars_vertex"),
  chunk("displacementmap_pars_vertex"),
  chunk("envmap_pars_vertex"),
  chunk("lights_phong_pars_vertex"),
  chunk("color_pars_vertex"),
  chunk("morphtarget_pars_vertex"),
  chunk("skinning_pars_vertex"),
  chunk("shadowmap_pars_vertex"),
  chunk("logdepthbuf_pars_vertex"),

  "void main() {",

  chunk("uv_vertex"),
  chunk("uv2_vertex"),
  chunk("color_vertex"),

  chunk("beginnormal_vertex"),
  chunk("morphnormal_vertex"),
  chunk("skinbase_vertex"),
  chunk("skinnormal_vertex"),
  chunk("defaultnormal_vertex"),

  "#ifndef FLAT_SHADED", // Normal computed with derivatives when FLAT_SHADED

  "	vNormal = normalize( transformedNormal );",

  "#endif",

  chunk("begin_vertex"),
  chunk("displacementmap_vertex"),
  chunk("morphtarget_vertex"),
  chunk("skinning_vertex"),

  " float dist = length(vec3(0.0) - center);",
  " transformed.y = transformed.y * 0.5 * (cos(0.005 * time - 0.2 * dist) + 1.0);",
	" vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );",
  " gl_Position = projectionMatrix * mvPosition;",

  chunk("logdepthbuf_vertex"),

  "	vViewPosition = - mvPosition.xyz;",

  chunk("worldpos_vertex"),
  chunk("envmap_vertex"),
  chunk("lights_phong_vertex"),
  chunk("shadowmap_vertex"),

  "}"

].join( "\n" );

var fragmentShader = [

  "#define PHONG",

  "uniform vec3 diffuse;",
  "uniform vec3 emissive;",
  "uniform vec3 specular;",
  "uniform float shininess;",
  "uniform float opacity;",

  chunk("common"),
  chunk("color_pars_fragment"),
  chunk("uv_pars_fragment"),
  chunk("uv2_pars_fragment"),
  chunk("map_pars_fragment"),
  chunk("alphamap_pars_fragment"),
  chunk("aomap_pars_fragment"),
  chunk("lightmap_pars_fragment"),
  chunk("emissivemap_pars_fragment"),
  chunk("envmap_pars_fragment"),
  chunk("fog_pars_fragment"),
  chunk("lights_phong_pars_fragment"),
  chunk("shadowmap_pars_fragment"),
  chunk("bumpmap_pars_fragment"),
  chunk("normalmap_pars_fragment"),
  chunk("specularmap_pars_fragment"),
  chunk("logdepthbuf_pars_fragment"),

  "void main() {",

  "	vec3 outgoingLight = vec3( 0.0 );",
  "	vec4 diffuseColor = vec4( diffuse, opacity );",
  "	vec3 totalAmbientLight = ambientLightColor;",
  "	vec3 totalEmissiveLight = emissive;",
  "	vec3 shadowMask = vec3( 1.0 );",

  chunk("logdepthbuf_fragment"),
  chunk("map_fragment"),
  chunk("color_fragment"),
  chunk("alphamap_fragment"),
  chunk("alphatest_fragment"),
  chunk("specularmap_fragment"),
  chunk("normal_phong_fragment"),
  chunk("lightmap_fragment"),
  chunk("hemilight_fragment"),
  chunk("aomap_fragment"),
  chunk("emissivemap_fragment"),

  chunk("lights_phong_fragment"),
  chunk("shadowmap_fragment"),

  "totalDiffuseLight *= shadowMask;",
  "totalSpecularLight *= shadowMask;",

  "#ifdef METAL",

  "	outgoingLight += diffuseColor.rgb * ( totalDiffuseLight + totalAmbientLight ) * specular + totalSpecularLight + totalEmissiveLight;",

  "#else",

  "	outgoingLight += diffuseColor.rgb * ( totalDiffuseLight + totalAmbientLight ) + totalSpecularLight + totalEmissiveLight;",

  "#endif",

  chunk("envmap_fragment"),

  chunk("linear_to_gamma_fragment"),

  chunk("fog_fragment"),

  "	gl_FragColor = vec4( outgoingLight, diffuseColor.a );",

  "}"

].join( "\n" );





export default function create()
{
  var material = new THREE.ShaderMaterial({
    uniforms:uniforms,
    vertexShader:vertexShader,
    fragmentShader:fragmentShader,
    lights:true,
    fog:true,
    shading:THREE.FlatShading
  });
  return material;
}
