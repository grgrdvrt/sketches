
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

var vertexShader = `
  #define PHONG

varying vec3 vViewPosition;
attribute vec3 center;
uniform float time;

#ifndef FLAT_SHADED

	varying vec3 vNormal;

#endif

${chunk("common")}
${chunk("uv_pars_vertex")}
${chunk("uv2_pars_vertex")}
${chunk("displacementmap_pars_vertex")}
${chunk("envmap_pars_vertex")}
${chunk("color_pars_vertex")}
${chunk("fog_pars_vertex")}
${chunk("morphtarget_pars_vertex")}
${chunk("skinning_pars_vertex")}
${chunk("shadowmap_pars_vertex")}
${chunk("logdepthbuf_pars_vertex")}
${chunk("clipping_planes_pars_vertex")}

void main() {

	${chunk("uv_vertex")}
	${chunk("uv2_vertex")}
	${chunk("color_vertex")}

	${chunk("beginnormal_vertex")}
	${chunk("morphnormal_vertex")}
	${chunk("skinbase_vertex")}
	${chunk("skinnormal_vertex")}
	 ${chunk("defaultnormal_vertex")}

#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED

	vNormal = normalize( transformedNormal );

#endif

	${chunk("begin_vertex")}
	${chunk("morphtarget_vertex")}
	${chunk("skinning_vertex")}
	${chunk("displacementmap_vertex")}
	${chunk("project_vertex")}
	${chunk("logdepthbuf_vertex")}
	${chunk("clipping_planes_vertex")}

  float dist = length(vec3(0.0) - center);
  transformed.y = transformed.y * 0.5 * (cos(0.005 * time - 0.2 * dist) + 1.0);
	mvPosition = modelViewMatrix * vec4( transformed, 1.0 );
  gl_Position = projectionMatrix * mvPosition;

	vViewPosition = - mvPosition.xyz;

	${chunk("worldpos_vertex")}
	${chunk("envmap_vertex")}
	${chunk("shadowmap_vertex")}
	${chunk("fog_vertex")}

} `;

var fragmentShader = `
  #define PHONG

uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;

${chunk("common")}
${chunk("packing")}
${chunk("dithering_pars_fragment")}
${chunk("color_pars_fragment")}
${chunk("uv_pars_fragment")}
${chunk("uv2_pars_fragment")}
${chunk("map_pars_fragment")}
${chunk("alphamap_pars_fragment")}
${chunk("aomap_pars_fragment")}
${chunk("lightmap_pars_fragment")}
${chunk("emissivemap_pars_fragment")}
${chunk("envmap_pars_fragment")}
${chunk("gradientmap_pars_fragment")}
${chunk("fog_pars_fragment")}
${chunk("bsdfs")}
${chunk("lights_pars")}
${chunk("lights_phong_pars_fragment")}
${chunk("shadowmap_pars_fragment")}
${chunk("bumpmap_pars_fragment")}
${chunk("normalmap_pars_fragment")}
${chunk("specularmap_pars_fragment")}
${chunk("logdepthbuf_pars_fragment")}
${chunk("clipping_planes_pars_fragment")}

void main() {

	${chunk("clipping_planes_fragment")}

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	${chunk("logdepthbuf_fragment")}
	${chunk("map_fragment")}
	${chunk("color_fragment")}
	${chunk("alphamap_fragment")}
	${chunk("alphatest_fragment")}
	${chunk("specularmap_fragment")}
	${chunk("normal_fragment")}
	${chunk("emissivemap_fragment")}

	// accumulation
	${chunk("lights_phong_fragment")}
	${chunk("lights_template")}

	// modulation
	${chunk("aomap_fragment")}

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;

	${chunk("envmap_fragment")}

	gl_FragColor = vec4( outgoingLight, diffuseColor.a );

	${chunk("tonemapping_fragment")}
	${chunk("encodings_fragment")}
	${chunk("fog_fragment")}
	${chunk("premultiplied_alpha_fragment")}
	${chunk("dithering_fragment")}

}
`;






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
