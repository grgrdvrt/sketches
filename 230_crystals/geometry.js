export default function create(cells)
{
  let nPts = cells.reduce((nPts, cell) => {
    return nPts + cell.halfedges.length;
  }, 0);

  let geometry = new THREE.BufferGeometry();
  let positions = new Float32Array(6 * nPts);
  let centers = new Float32Array(6 * nPts);
  let ids = new Uint32Array(3 * (3 * nPts - 2 * cells.length));
  geometry.addAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setIndex(new THREE.BufferAttribute(ids, 1));

  let vertexId = 0;
  function addPosition(x, y, z){
    let id = 3 * vertexId;
    positions[id] = x;
    positions[id + 1] = y;
    positions[id + 2] = z;
    return vertexId++;
  }

  let triangleId = 0;
  function addTriangle(a, b, c){
    let id = 3 * triangleId;
    ids[id] = a;
    ids[id + 1] = b;
    ids[id + 2] = c;
    return triangleId++;
  }


  let idBegin = 0;
  let pos = new THREE.Vector3();
  let orig = new THREE.Vector3();
  let center = new THREE.Vector3();
  let axis = new THREE.Vector3();

  let mat = new THREE.Matrix4();
  let quat = new THREE.Quaternion();
  let up = new THREE.Vector3(0, 1, 0);

  cells.forEach((cell, cellId) => {
    let n = cell.halfedges.length;
    let centerVertexId = idBegin;
    let firstVertexId = centerVertexId + 1;
    let height = Math.random() * 80 + 20;

    let ox = 0.3 * cell.site.x;
    let oy = 0.3 * cell.site.y;

    cell.halfedges.reduce((pt, he) => {
      pt.x += he.getStartpoint().x;
      pt.z += he.getStartpoint().y;
      return pt;
    }, center.set(0, 0, 0));

    center.x /= n;
    center.z /= n;

    let growthRatio = 1.2;
    let cRatio = 1.2;
    pos.set(
      growthRatio * center.x,
      cRatio * height,
      growthRatio * center.z
    );

    let offset = new THREE.Vector3(ox, 0, oy);

    quat.setFromUnitVectors(up, pos.sub(center).clone().add(offset).normalize());
    mat.makeRotationFromQuaternion(quat);
    pos.applyMatrix4(mat).add(center);

    addPosition(pos.x, pos.y, pos.z);

    for(let i = 0; i < n; i++) {
      let he = cell.halfedges[i];
      let p = he.getStartpoint();

      pos.set(
        growthRatio * p.x,
        height,
        growthRatio * p.y
      ).sub(center);
      pos.applyMatrix4(mat).add(center);
      let vertexId = addPosition(pos.x, pos.y, pos.z);
      let vertex2Id = addPosition(p.x, 0, p.y);


      let nextVertexId = firstVertexId + 2 * ((i + 1) % n);

      //side
      addTriangle(vertexId, nextVertexId + 1, nextVertexId);
      addTriangle(vertexId, vertex2Id, nextVertexId + 1);

      //top
      addTriangle(centerVertexId, vertexId, nextVertexId);
    }
    idBegin += 2 * n + 1;
  });
  geometry.computeVertexNormals();
  geometry.computeFaceNormals();
  console.log(cells[0]);
  console.log("vertices", positions.length / 3);
  console.log("triangles", ids.length / 3);
  return geometry;
}
