export default function create(cells)
{
  var nPts = cells.reduce(function(nPts, cell){
    return nPts + cell.halfedges.length;
  }, 0);

  var geometry = new THREE.BufferGeometry();
  var positions = new Float32Array(6 * nPts);
  var centers = new Float32Array(6 * nPts);
  var ids = new Uint32Array(3 * (3 * nPts - 2 * cells.length));
  geometry.addAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.addAttribute("center", new THREE.BufferAttribute(centers, 3));
  geometry.setIndex(new THREE.BufferAttribute(ids, 1));


  var idBegin = 0;
  cells.forEach(function(cell, cellId){
    var n = cell.halfedges.length;
    var nIds = 0;
    var firstVertexId = 2 * idBegin;
    var firstIndexId = 3 * (3 * idBegin - 2 * cellId);
    var height = Math.random();
    for(var i = 0; i < n; i++)
    {
      var he = cell.halfedges[i];
      var p = he.getStartpoint();
      var pId0 = 3 * (firstVertexId + i);
      positions[pId0] = p.x;
      positions[pId0 + 1] = height;
      positions[pId0 + 2] = p.y;

      var pId1 = 3 * (firstVertexId + i + n);
      positions[pId1] = p.x;
      positions[pId1 + 1] = 0;
      positions[pId1 + 2] = p.y;

      centers[pId0] = cell.site.x;
      centers[pId0 + 1] = 0;
      centers[pId0 + 2] = cell.site.y;

      centers[pId1] = cell.site.x;
      centers[pId1 + 1] = 0;
      centers[pId1 + 2] = cell.site.y;


      var vertexId = firstVertexId + i;
      var nextVertexId = firstVertexId + ((i + 1) % n);
      var indexId = firstIndexId + nIds;
      //sideA
      ids[indexId] = vertexId;
      ids[indexId + 1] = nextVertexId + n;
      ids[indexId + 2] = nextVertexId;
      nIds += 3;

      //sideB
      indexId += 3;
      ids[indexId] = vertexId;
      ids[indexId + 1] = vertexId + n;
      ids[indexId + 2] = nextVertexId + n;
      nIds += 3;

      //top
      if(i !== 0 && i !== n - 1){
        indexId += 3;
        ids[indexId] = firstVertexId;
        ids[indexId + 1] = vertexId;
        ids[indexId + 2] = nextVertexId;
        nIds += 3;
      }
    }
    idBegin += n;
  });
  geometry.computeVertexNormals();
  geometry.computeFaceNormals();
  console.log(cells[0]);
  console.log("vertices", positions.length / 3);
  console.log("triangles", ids.length / 3);
  return geometry;
}
