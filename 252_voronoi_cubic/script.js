tools.mixin(tools, this);

const w = 700;
const h = 700;

const stage = new Stage(w, h);
const ctx = stage.out;

const bbox = {xl:0, xr:w, yt:0, yb:h};

const nSites = 50;
const sites = [];

let diagram;


let time = 0;
const maxTime = 50;
init();


function makePerms(){
    const base = [];
    for(let i = 0; i < 50; i++){
        base[i] = i;
    }
    shuffle2(base);
    // shuffle(base);

    const perms = [];
    for(let i = 0; i < 50; i++){
        perms[i] = base.concat();
        const max = Math.max.apply(undefined, base);
        base.splice(base.indexOf(max), 1);
    }
    perms.push([]);
    perms.reverse();
    return perms;
}

function makePermutation(count){
    const arr = [];
    for(let i = 0; i < count; i++){
        arr[i] = i;
    }
    return shuffle(arr);
}
const permutations = new Map();
sites.forEach(site => permutations.set(site, makePerms()));

function getPermutation(site, count){
    const perms = permutations.get(site);

    let perm = perms[count];
    if(!perm){
        perm = perms[count] = makePermutation(count);
    }
    return perm;
}

const fr = 0.98;
const vel = 0.5;
const voronoi = new Voronoi();
new Loop(function(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    sites.forEach(site => {
        site.vx = fr * site.vx + vel * (Math.random() * 2 - 1);
        site.vy = fr * site.vy + vel * (Math.random() * 2 - 1);
        site.x += site.vx;
        site.y += site.vy;
        if(site.x < 0){
            site.x = 0;
            site.vx *= -1;
        }
        else if(site.x > w){
            site.x = w;
            site.vx *= -1;
        }
        if(site.y < 0){
            site.y = 0;
            site.vy *= -1;
        }
        else if(site.y > h){
            site.y = h;
            site.vy *= -1;
        }
    });
    const minDist = 50;
    for(let i = 0; i < nSites; i++){
        const a = sites[i];
        for(let j = i + 1; j < nSites; j++){
            const b = sites[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const d = Math.hypot(dx, dy);
            if(d < minDist){
                const s = 0.5 * (minDist - d) / d;
                a.x -= s * dx;
                a.y -= s * dy;
                b.x += s * dx;
                b.y += s * dy;
            }
        }
    }
    diagram = voronoi.compute(sites, bbox);

    var n = diagram.cells.length;
    for(var i = 0 ; i < n; i++){
        var t = diagram.cells[i];
        if(!t)continue;
        t.color = "hsl(0, 0%, " + Math.round(Math.random() * 100) + "%)";;
    }
    drawCells(ctx, diagram.cells);
});



function init(){
    time = 0;
    createSites(sites);

}

function createSites(v){
    for(var i = 0; i < nSites; i++){
        v[i] = {
            x : Math.random() * w,
            y : Math.random() * h,
            vx:0,
            vy:0,
        };
    }
}

function drawCells(ctx, cells){
    var n = cells.length;

    for(var i = 0; i < n; i++){
        var c = cells[i];
        if(!c) continue;
        // drawCell(ctx, c, c.color , true);
        drawLines(ctx, c);
        drawCell(ctx, c, "#888888");
    }
}


function drawCell(ctx, cell, color, fill){
    ctx.beginPath();
    var x = cell.site.x;
    var y = cell.site.y;

    var n = cell.halfedges.length;
    var he = cell.halfedges[0];
    var p = he.getStartpoint();
    ctx.moveTo(p.x, p.y);
    for(var i = 0; i < n; i++){
        he = cell.halfedges[i];
        p = he.getEndpoint();
        ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.strokeStyle = color;
    // ctx.moveTo(x + 20, y);
    // ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.stroke();
    if(fill){
        ctx.fillStyle = color;
        ctx.fill();
    }
}

function drawLines(ctx, cell, thickness, color){
    ctx.save();
    const pts = [];
    const site = cell.site;
    cell.halfedges.forEach(he => {
        let a, b;
        if(he.edge.lSite === site){
            a = he.edge.vb;
            b = he.edge.va;
        }
        else{
            a = he.edge.va;
            b = he.edge.vb;
        }
        // if(Math.hypot(a.x - b.x, a.y - b.y) < 30){
        //     return;
        // }
        const p1 = lerpPt(a, b, 1/3);
        const p2 = lerpPt(a, b, 2/3);
        const dir = normalize({
            x:-(b.y - a.y),
            y:b.x - a.x,
        });

        pts.push({pos:p1, norm:dir});
        pts.push({pos:p2, norm:dir});
    });
    const permutation = getPermutation(site, pts.length);
    const permuted = permute(pts, permutation);
    const n = permuted.length / 2;
    let s = 30;
    for(let i = 0; i < n; i++){
        const a = permuted[2 * i];
        const b = permuted[2 * i + 1];
        const s = 0.7 * Math.hypot(a.pos.x - b.pos.x, a.pos.y - b.pos.y);
        ctx.beginPath();
        ctx.moveTo(a.pos.x, a.pos.y);
        ctx.bezierCurveTo(
            a.pos.x + s * a.norm.x,
            a.pos.y + s * a.norm.y,
            b.pos.x + s * b.norm.x,
            b.pos.y + s * b.norm.y,
            b.pos.x, b.pos.y
        );
        ctx.lineJoint = ctx.lineCap = "round";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 13;
        ctx.stroke();
        ctx.moveTo(a.pos.x - 2 * a.norm.x, a.pos.y - 2 * a.norm.y);
        ctx.bezierCurveTo(
            a.pos.x + s * a.norm.x,
            a.pos.y + s * a.norm.y,
            b.pos.x + s * b.norm.x,
            b.pos.y + s * b.norm.y,
            b.pos.x - 2 * b.norm.x, b.pos.y - 2 * b.norm.y
        );
        ctx.strokeStyle = "black";
        ctx.lineWidth = 10;
        ctx.stroke();
    }
    ctx.restore();
}

function lerp(a, b, t){
    return a + t * (b - a);
}
function lerpPt(a, b, t){
    return {
        x:lerp(a.x, b.x, t),
        y:lerp(a.y, b.y, t)
    };
}

function normalize(pt){
    const s = 1 / Math.hypot(pt.x, pt.y);
    return {
        x:pt.x * s,
        y:pt.y * s,
    };
}

function permute(pts, permutation){
    const result = [];
    for(let i = 0; i < pts.length; i++){
        result[i] = pts[permutation[i]];
    }
    return result;
}

function shuffle(arr){
    for(let i = 0; i < arr.length; i++){
        const id = Math.floor(Math.random() * arr.length);
        const tmp = arr[id];
        arr[id] = arr[i];
        arr[i] = tmp;
    }
    return arr;
}


function shuffle2(arr){
    const range = Math.floor(arr.length / 5);
    for(let i = 0; i < arr.length; i++){
        const id = Math.min(Math.max(0, i + Math.floor(Math.random() * range) - Math.floor(0.5 * range)), arr.length - 1);
        const tmp = arr[id];
        arr[id] = arr[i];
        arr[i] = tmp;
    }
    return arr;
}
