export default function create(nSites, w, h)
{
  let w2 = 0.5 * w;
  let h2 = 0.5 * h;
  let bbox = {xl:-w2, xr:w2, yt:-h2, yb:h2};


  console.time("sites");
  let sites = [];
  for(let i = 0; i < nSites; i++) {
    let ang = Math.random() * 2 * Math.PI;
    let ran = Math.random();
    let r = Math.sqrt(Math.sqrt(ran)) * w2;
    sites[i] = {
      x : r * Math.cos(ang),
      y : r * Math.sin(ang)
    };
  }
  console.timeEnd("sites");


  let voronoi = new Voronoi();
  console.time("cells");
  let diagram = voronoi.compute(sites, bbox);
  console.timeEnd("cells");

  let cells = diagram.cells.filter(cell => {
    return !cell.halfedges.reduce((onEdge, he) => {
      let pt = he.getEndpoint();
      return onEdge || pt.x <= -0.9 * w2 || pt.x >= 0.9 * w2 || pt.y <= -0.9 * h2 || pt.y >= 0.9 * h2;
    }, false);
  });

  return cells;
}
