const w = 1000;
const h = 1000;

const canvas = document.createElement("canvas");
canvas.width = w;
canvas.height = h;
document.body.appendChild(canvas);


const ctx = canvas.getContext("2d");

const bgCanvas = document.createElement("canvas");
bgCanvas.width = w;
bgCanvas.height = h;


const bgCtx = bgCanvas.getContext("2d");


const squares = [];
const nx = 80;
const ny = 80;
const margin = 0.1;


function randomColor(){
    return {
        h: Math.floor(Math.random() * 360),
        s: Math.round(Math.random() * 100),
        l: Math.round(Math.random() * 100),
    };
}

function colorToString(c){
    return `hsl(${c.h}, ${c.s}%, ${c.l}%)`;
}

function paletteToString(p){
    const r = Math.round(p[0] * 255);
    const g = Math.round(p[1] * 255);
    const b = Math.round(p[2] * 255);
    return `rgba(${r}, ${g}, ${b})`;
}

function palette1(a, b, c, d, t){
    return a + b * Math.cos( 2 * Math.PI *(c * t + d));
}

function palette3(p, t){
    return p.map((p, i) => {
        return palette1(p.a, p.b, p.c, p.d, t);
    });
}

function randomPalette1(){
    return {
        a:Math.random(),
        b:Math.random() * 2 - 1,
        c:Math.floor(Math.random() * 5),
        d:Math.random(),
    };
}

function randomPalette3(){
    return [
        randomPalette1(),
        randomPalette1(),
        randomPalette1(),
    ];
}

const sx = w * (1 - 2 * margin) / nx;
const sy = h * (1 - 2 * margin) / ny;
for(let j = 0; j < ny; j++){
    for(let i = 0; i < nx; i++){
        const x = i * sx + w * margin;
        const y = j * sy + h * margin;
        const color = colorToString(randomColor());
        squares.push({
            xMin:x, xMax:x + sx,
            yMin:y, yMax:y + sy,
            color:color,
        });
    }
}


const balls = [];
const color = randomColor();
const palette = randomPalette3();
for(let i = 0; i < 10; i++){
    const vx = Math.random() * 2 - 1;
    const vy = Math.random() * 2 - 1;
    const v = 0.9 * sx / Math.hypot(vx, vy);

    const ball = {
        size: 10,
        color: {...color},
        vx:vx * v,
        vy:vy * v,
        palette:palette,
        t:Math.random(),
        vt:(Math.random() < 0.5 ? 1 : -1) * 0.001,
    };
    // ball.x = 0.5 * w;
    // ball.y = 0.5 * h;
    // ball.x = Math.random() * w;
    // ball.y = Math.random() * h;
    ball.x = Math.random() * (w - 2 * w * margin) + w * margin;
    ball.y = Math.random() * (h - 2 * h * margin) + h * margin;
    balls[i] = ball;
}


function drawSquare(ctx, square, color){
    ctx.fillStyle = color;
    ctx.fillRect(
        Math.floor(square.xMin),
        Math.floor(square.yMin),
        Math.ceil(sx),
        Math.ceil(sy));
}


function drawBall(ball){

    const p = ball.palette;
    ctx.fillStyle = paletteToString(palette3(p, ball.t));
    // ctx.fillStyle = colorToString(ball.color);
    ctx.fillRect(
        ball.x - 0.5 * ball.size,
        ball.y - 0.5 * ball.size,
        ball.size,
        ball.size
    );
}


function checkBordersCollisions(ball){
    if(ball.x < ball.size){
        ball.x = ball.size;
        ball.vx *= -1;
    }
    else if(ball.x > w - ball.size){
        ball.x = w - ball.size;
        ball.vx *= -1;
    }
    if(ball.y < ball.size){
        ball.y = ball.size;
        ball.vy *= -1;
    }
    else if(ball.y > h - ball.size){
        ball.y = h - ball.size;
        ball.vy *= -1;
    }
}


function checkSquaresCollisions(ball){
    const bXMin = ball.x - ball.size;
    const bXMax = ball.x + ball.size;
    const bYMin = ball.y - ball.size;
    const bYMax = ball.y + ball.size;
    let nvx = ball.vx;
    let nvy = ball.vy;
    for(let i = 0; i < squares.length; i++){
        const s = squares[i];
        const isOut = bXMin > s.xMax || bXMax < s.xMin
              || bYMin > s.yMax || bYMax < s.yMin;
        if(!isOut){
            squares.splice(i, 1);
            if(bXMin - ball.vx > s.xMax || bXMax - ball.vx < s.xMin){
                nvx = ball.vx * -1;
            }
            if(bYMin - ball.vy > s.yMax || bYMax - ball.vy < s.yMin){
                nvy = ball.vy * -1;
            }
            ball.t += ball.vt;
            if(ball.t > 1){
                ball.t = 0;
            }
            else if(ball.t < 0){
                ball.t = 1;
            }
            const r = Math.random();
            if(r < 1/3){
                ball.color.h += Math.round(4 * (Math.random() * 2 - 1));
                if(ball.color.h > 360){
                    ball.color.h = 0;
                }
                else if(ball.color.h < 0){
                    ball.color.h = 360;
                }

            }
            else if(r < 2/3){
                // ball.color.s += Math.round(Math.random()) * 2 - 1;
                ball.color.s += 1;
                if(ball.color.s > 100){
                    ball.color.s = 20;
                }
                else if(ball.color.s < 20){
                    ball.color.s = 100;
                }
            }
            else{
                // ball.color.l += Math.round(Math.random()) * 2 - 1;
                ball.color.l += 1;
                if(ball.color.l > 90){
                    ball.color.l = 10;
                }
                else if(ball.color.l < 10){
                    ball.color.l = 90;
                }
            }
            // drawSquare(bgCtx, s, colorToString(ball.color));
            drawSquare(bgCtx, s, paletteToString(palette3(ball.palette, ball.t)));
        }
    }
    ball.vx = nvx;
    ball.vy = nvy;
}

bgCtx.fillStyle = "black";
bgCtx.fillRect(0, 0, w, h);

function update(){
    requestAnimationFrame(update);

    ctx.drawImage(bgCanvas, 0, 0);
    balls.forEach(ball => {
        ball.x += ball.vx;
        ball.y += ball.vy;
        checkBordersCollisions(ball);
        checkSquaresCollisions(ball);
        drawBall(ball);
    });
    squares.forEach(s=> drawSquare(ctx, s, "black"));
}

update();

