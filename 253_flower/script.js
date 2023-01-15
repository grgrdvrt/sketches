const w = 700;
const h = 700;
const d = 700;

const canvas = document.createElement("canvas");
canvas.width = w;
canvas.height = h;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

const center = new V3(0.5 * w, 0.5 * h, 0.5 * d);
const sphereRadius = 100;
const attractorDist = 200;
const minDist = 30;

const spr1 = 0.0005;

const vel = 0.2;
const fr = 0.90;

function randV(v){
    return v.set(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
    );
}

const pts = [];
for(let i = 0; i < 200; i++){
    pts[i] = {
        vel:new V3(),
        pos:randV(new V3())
            .setLength(sphereRadius)
            .add(center),
        radius:5,
        maxSphereRadius:sphereRadius * lerp(0.9, 1.1, Math.random()),
        c1:lerp(0.4, 0.6, Math.random()),
        c2:lerp(0.4, 0.6, Math.random()),
    };
}


function drawPts(ctx, pts){
    ctx.save();
    pts.forEach(pt => {
        ctx.beginPath();
        ctx.moveTo(pt.pos.x + pt.radius, pt.pos.y);
        ctx.arc(pt.pos.x, pt.pos.y, pt.radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = "white";
        ctx.fill();
    });
    ctx.restore();
}

const attractor = {
    pos:new V3(
        Math.random() * w,
        Math.random() * 0.5 * h,
        (Math.random() * 2 - 1) * d
    ).sub(center).setLength(attractorDist).add(center),
    vel:new V3(),
};

function simulate(){
    const rand = new V3();


    // attractor.vel.multiplyScalar(fr);
    // attractor.vel.add(attractor.pos.clone().sub(attractor.pos).multiplyScalar(spr1));
    // attractor.vel.y -= 0.01;
    // attractor.vel.add(randV(rand).multiplyScalar(5 * vel));
    // attractor.pos.add(attractor.vel);
    // attractor.pos.sub(center).setLength(attractorDist).add(center),

    pts.forEach(pt => {
        pt.vel.multiplyScalar(fr);
        pt.vel.add(attractor.pos.clone().sub(pt.pos).multiplyScalar(spr1));
        pt.vel.add(randV(rand).multiplyScalar(vel));
        pt.pos.add(pt.vel);
    });
    const n = pts.length;
    for(let i = 0; i < n; i++){
        const a = pts[i];
        for(let j = i + 1; j < n; j++){
            const b = pts[j];

            const diff = b.pos.clone().sub(a.pos);
            const l = diff.getLength();
            if(l < minDist){
                diff.multiplyScalar(0.5 * (l - minDist) / l);
                a.pos.add(diff);
                b.pos.sub(diff);
            }
        }
    }
    pts.forEach(pt => {
        if(V3.dist(pt.pos, center) > pt.maxSphereRadius){
            pt.pos.sub(center).setLength(pt.maxSphereRadius).add(center);
        }
    });
}


function update(){
    requestAnimationFrame(update);
    ctx.clearRect(0, 0, w, h);
    simulate();

    pts.sort((a, b) => b.z - a.z);
    const f = pts.filter(p => p.pos.z <= center.z);
    const b = pts.filter(p => p.pos.z > center.z);
    drawPts(ctx, b);
    const rand = new V3();
    const root = attractor.pos.clone().sub(center).negate().setLength(0.5 * (attractorDist + sphereRadius)).add(center);
    const up = new V3(0, -0.5 * (attractorDist + sphereRadius), 0);
    pts.forEach(pt => {
        ctx.beginPath();
        ctx.moveTo(root.x, root.y);
        const ctrl1 = root.clone().sub(center).lerp(up, 0.5).add(center);
        const ctrl2 = pt.pos.clone().lerp(root, pt.c2);
        ctx.bezierCurveTo(
            ctrl1.x, ctrl1.y,
            ctrl2.x, ctrl2.y,
            pt.pos.x,
            pt.pos.y,
        );
        ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
        ctx.stroke();
    });
    drawPts(ctx, f);


}

update();

