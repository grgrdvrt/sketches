const w = 700;
const h = 700;

const canvas = document.createElement("canvas");
canvas.width = w;
canvas.height = h;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.strokeStyle = "black";

const noise = new SimplexNoise();

const scale = Math.random() * 0.005 + 0.005;

let time = 0;

const bubbles = [];
for(let i = 0; i < 500; i++){
    bubbles[i] = {
        visibleRadius:5,
        radius:10,
        positions:[],
        pos:new Vector2(
            Math.random() * w,
            Math.random() * h,
        )
    };
}



function applyConstraints(paddingRatio){
    const n = bubbles.length;
    for(let i = 0; i < n; i++){
        const b1 = bubbles[i];
        const paddingRatio2 = 1 + 0.3 * (1 - i / (n - 1))**2;
        const r1 = b1.radius * paddingRatio2;
        for(let j = 0; j < i; j++){
            const b2 = bubbles[j];
            const d = b1.pos.clone().sub(b2.pos);
            if(d.getLength() < r1 + b2.radius){
                d.setLength((r1 + b2.radius) - (d.getLength()));
                b1.pos.add(d);
                b2.pos.sub(d);
            }
        }
    }
}


const centerAttraction = 0.002;
const noiseStrength = 5;
const center = new Vector2(0.5 * w, 0.5 * h);

function update(){
    time += 0.005;
    ctx.clearRect(0, 0, w, h);
    bubbles.forEach(b => {
        b.pos.add(center.clone().sub(b.pos).multiplyScalar(centerAttraction));
        const vel = new Vector2(
            noise.noise3d(b.pos.x * scale + 10000, b.pos.y * scale, time),
            noise.noise3d(b.pos.x * scale, b.pos.y * scale, time),
        ).multiplyScalar(noiseStrength);
        b.positions.unshift(b.pos.clone());
        if(b.positions.length > 40){
            b.positions.pop();
        }
        b.pos.add(vel);
        // const target = 1 + 70 * (0.5 + 0.5 * noise.noise3d(b.pos.x * scale, b.pos.y * scale, time))**2.5;
        // b.radius += 0.05 * (target - b.radius);
    });
    const n = 5;
    for(let i = 0; i < n; i++){
        applyConstraints(2);
    }
    ctx.beginPath();
    bubbles.forEach(b => {
        ctx.moveTo(b.pos.x, b.pos.y);
        b.positions.forEach(pos => {
            ctx.lineTo(pos.x, pos.y);
        });
    });
    ctx.stroke();
    ctx.beginPath();
    bubbles.forEach(b => {
        ctx.moveTo(b.pos.x + b.visibleRadius, b.pos.y);
        ctx.arc(b.pos.x, b.pos.y, b.visibleRadius, 0, 2 * Math.PI);
    });
    ctx.fill();
    ctx.stroke();
    requestAnimationFrame(update);
}

update();

