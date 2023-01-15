const w = 700;
const h = 700;
const canvas = document.createElement("canvas");
canvas.width = w;
canvas.height = h;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");


function lerp(a, b, t){
    return (1 - t) * a + t * b;
}

function makeLine(n, x, y){
    const line = [];
    for(let i = 0; i < n; i++){
        line[i] = {
            line:line,
            vx:0,
            vy:0,
            x:x + Math.random(),
            y:y + Math.random(),
        };
    }
    return line;
}

const fr = 0.98;
const vel = 0.4;
const centerAttraction = 0.0001;
function moveLine(line){
    const pt = line[0];
    pt.vx = fr * pt.vx + vel * (Math.random() * 2 - 1);
    pt.vy = fr * pt.vy + vel * (Math.random() * 2 - 1);
    const dx = 0.5 * w - pt.x;
    const dy = 0.5 * h - pt.y;
    pt.vx += centerAttraction * dx;
    pt.vy += centerAttraction * dy;
    pt.x += pt.vx;
    pt.y += pt.vy;
}

function applyLineConstraint(line, dist){
    const n = line.length;
    for(let i = 1; i < n; i++){
        const prev = line[i - 1];
        const pt = line[i];
        const dx = pt.x - prev.x;
        const dy = pt.y - prev.y;
        const d = Math.hypot(dx, dy);
        const s = dist / d;
        pt.x = prev.x + s * dx;
        pt.y = prev.y + s * dy;

    }
}

function applyRepulsion(points, minDist){
    const n = points.length;
    for(let i = 0; i < n; i++){
        const p1 = points[i];
        for(let j = i + 1; j < n; j++){
            const p2 = points[j];
            if(p1.line === p2.line){
                continue;
            }
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const d = Math.hypot(dx, dy);
            if(d !== 0 && d < minDist){
                const diff = minDist - d;
                const s = 0.5 * diff / d;
                p1.x -= s * dx;
                p1.y -= s * dy;
                p2.x += s * dx;
                p2.y += s * dy;
            }
        }
    }
}

function drawLine(ctx, line){
    if(line.length === 1){
        drawPoint(ctx, line[0]);
    }
    else{
        drawCurve(ctx, line);
    }
}


function drawCurve(ctx, line){
    ctx.beginPath();
    ctx.moveTo(line[0].x, line[0].y);
    const n = line.length;
    for(let i = 2; i < n; i++){
        const prev = line[i - 1];
        ctx.quadraticCurveTo(
            prev.x,
            prev.y,
            0.5 * (prev.x + line[i].x),
            0.5 * (prev.y + line[i].y),
        );
    }
    ctx.quadraticCurveTo(
        line[n - 2].x,
        line[n - 2].y,
        line[n - 1].x,
        line[n - 1].y
    );
    ctx.lineWidth = 10;
    ctx.strokeStyle = "black";
    ctx.lineJoin = ctx.lineCap = "round";
    ctx.stroke();
}

function drawPoint(ctx, point){
    const r = 5;
    ctx.beginPath();
    ctx.moveTo(point.x + r, point.y);
    ctx.arc(point.x, point.y, r, 0, 2 * Math.PI);
    ctx.fill();
}


const lines = [];
for(let i = 0; i < 50; i++){
    lines[i] = makeLine(Math.floor(lerp(1, 15, Math.random()**3)), Math.random() * w, Math.random() * h);
}

const points = lines.reduce((pts, line) => {
    pts.push(...line);
    return pts;
}, []);


function update(){
    requestAnimationFrame(update);
    ctx.clearRect(0, 0, w, h);

    lines.forEach(line => {
        moveLine(line);
        applyLineConstraint(line, 15);
    });
    applyRepulsion(points, 20);

    lines.forEach(line => drawLine(ctx, line));
}
update();



