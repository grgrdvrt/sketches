let w, h;
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

let mouseInfluence = 0.4 * h;
const nLines = 30;

const lines = [];
const colors = [];

resize();

window.addEventListener("resize", resize);

function resize(){
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    mouseInfluence = 0.4 * h;
    resetLines(nLines);
}


const v2 = {
    add:(a, b) => [a[0] + b[0], a[1] + b[1]],
    sub:(a, b) => [a[0] - b[0], a[1] - b[1]],
    scale:(v, s) => [v[0] * s, v[1] * s],
    length:v => Math.hypot(v[0], v[1]),
    setLength:(v, l) => v2.scale(v, l / v2.length(v)),
    normalize: v => v2.setLength(v, 1),
    cross : (a, b) => a[0] * b[1] - a[1] * b[0],
    dot : (a, b) => a[0] * b[0] + a[1] * b[1],
    lerp : (a, b, t) => [
        lerp(a[0], b[0], t),
        lerp(a[1], b[1], t),
    ],
    dist:(a, b) => Math.hypot(a[0] - b[0], a[1] - b[1])
};

function lerp(a, b, t){
    return a + t * (b - a);
}



const geom = {
    line:(a, b) => {
        return {
            p:a.concat(),
            dir:v2.normalize(v2.sub(b, a))
        };
    },
    intersection:(l1, l2) => {
        const divisor = v2.cross(l1.dir, l2.dir);
        if(divisor === 0){
            return undefined;
        }
        else {
            const t = (l2.dir[0] * (l1.p[1] - l2.p[1]) + l2.dir[1] * (l2.p[0] - l1.p[0])) / divisor;
            return v2.add(v2.scale(l1.dir, t), l1.p);
        }
    },

    bissector:(a, b) => {
        const diff = v2.sub(b, a);
        return {
            p:v2.lerp(a, b, 0.5),
            dir:[-diff[1], diff[0]]
        };
    },

    tangentCircle:(c1, c2, r2, p) => {
        const center = geom.intersection(
            geom.line(c1, p),
            geom.bissector(c2, v2.add(v2.setLength(v2.sub(c1, p), r2), p))
        );

        return {
            center,
            radius:v2.dist(center, c2) - r2
        };
    }
};



function makeLine(nPts, w, y){
    if(nPts % 2 === 0){
        throw new Error("nPts should not be even");
    }
    const pts = [];
    const circles = [];
    const step = w / nPts;
    // const offset = 0.3 * lerp(-1, 1, Math.random()) * step;
    const offset = 0;
    for(let i = 0; i < nPts; i++){
        const x = i * step + offset + 0.3 * step * lerp(-1, 1, Math.random());
        pts.push(x);
        circles.push({center:[x + 0.5 * step, y], radius:0.5 * step});
    }
    pts.push(w);

    return {pts, circles, y:y};
}

function renderLine(ctx, line){
    ctx.moveTo(line.pts[0], line.y);
    const nCircles = line.circles.length;
    for(let i = 0; i < nCircles; i++){
        const circle = line.circles[i];
        const x = circle.center[0];
        const y = circle.center[1];
        const a = i === 0 ? [0, line.y] : line.circles[i - 1].center;
        const b = i === nCircles - 1 ? [w, line.y] : line.circles[i + 1].center;
        const angleBegin = Math.atan2(a[1] - y, a[0] - x);
        const angleEnd = Math.atan2(b[1] - y, b[0] - x);
        ctx.arc(x, y, Math.abs(circle.radius), angleBegin, angleEnd, i%2 == 1);
    }
}

function setActiveCircles(line, yFunc){
    const nCircles = line.circles.length;
    for(let i = 0; i < nCircles; i+= 2){
        const circle = line.circles[i];
        const a = line.pts[i];
        const b = line.pts[i + 1];
        const x = lerp(a, b, 0.5);
        const y = yFunc(a, b, line.y);
        circle.center[0] = x;
        TweenLite.to(circle.center, y > circle.center[1] ? 5.0 : 0.2, {1:y, onUpdate: _ => {
            circle.radius = Math.hypot(x - a, circle.center[1] - line.y);
        }});
    }
}

function computePassiveCircles(line){
    const nCircles = line.circles.length;
    for(let i = 1; i < nCircles; i+= 2){
        const c1 = line.circles[i - 1];
        const c2 = line.circles[i + 1];
        const a = line.pts[i];
        const b = line.pts[i + 1];
        line.circles[i] = geom.tangentCircle(c1.center, c2.center, c2.radius, [a, line.y]);
    }
}

function drawPoint(ctx, x, y, color="red"){
    const c = 2;
    ctx.fillStyle = color;
    ctx.fillRect(x - c, y - c, 2 * c, 2 * c);
}

let mousePos = [0.5 * w, 0.5 * h];
canvas.addEventListener("mousemove", e => mousePos = [e.clientX, e.clientY]);

function resetLines(nLines){
    for(let i = 0; i < nLines; i++){
        const line = makeLine(35, w, (i + 0.5) / nLines * h);
        lines[i] = line;
        const baseHue = 60;
        const hue = Math.round(baseHue + 20 * lerp(-1, 1, Math.random()));
        const sat = 100;
        const lig = Math.round(lerp(90, 100, Math.random()));
        colors[i] = `hsl(${hue}, ${sat}%, ${lig}%)`;
    }
}

function update(){
    ctx.fillStyle = "#103050";
    ctx.fillRect(0, 0, w, h);
    for(let i = 0; i < nLines; i++){
        const line = lines[i];
        setActiveCircles(line, (a, b, y) => {
            const mouseDist = v2.dist(mousePos, v2.lerp([a, y], [b, y], 0.5));
            const r = Math.min(mouseDist / mouseInfluence, 1);
            const dy = lerp(-0.02 * h, 0.1 * h, r**2);
            return y + dy;
        });
        computePassiveCircles(line);
        ctx.beginPath();
        renderLine(ctx, line);
        ctx.strokeStyle = ctx.fillStyle;
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.strokeStyle = colors[i];
        ctx.lineWidth = 3;
        ctx.stroke();

        // line.pts.forEach(pt => drawPoint(ctx, pt, line.y));
        // line.circles.forEach((c, i) => drawPoint(ctx, c.center[0], c.center[1], i % 2 ? "green" : "blue"));
    }
    requestAnimationFrame(update);
}

resetLines(nLines);
update();
