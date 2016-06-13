export default function create(nSites, w, h)
{
  var w2 = 0.5 * w;
  var h2 = 0.5 * h;
  var bbox = {xl:-w2, xr:w2, yt:-h2, yb:h2};


  console.time("sites");
  var sites = [];
  for(var i = 0; i < nSites; i++) {
    var ang = Math.random() * 2 * Math.PI;
    var ran = Math.random();
    var r = Math.sqrt(Math.sqrt(ran)) * w2;
    sites[i] = {
      x : r * Math.cos(ang),
      y : r * Math.sin(ang),
    };
  }
  console.timeEnd("sites");


  var voronoi = new Voronoi();
  console.time("cells");
  var diagram = voronoi.compute(sites, bbox);
  console.timeEnd("cells");

  var cells = diagram.cells.filter(function(cell){
    return true;
    return !cell.halfedges.reduce(function(onEdge, he){
      var pt = he.getEndpoint();
      return onEdge || pt.x <= -0.9 * w2 || pt.x >= 0.9 * w2 || pt.y <= -0.9 * h2 || pt.y >= 0.9 * h2;
    }, false);
  });

  return cells;
}
