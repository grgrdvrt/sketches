const w = 700;
const h = 700;

const canvas = document.querySelector(".js-mainCanvas");
canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext("2d");

const scoreElt = document.querySelector(".js-score");
const lastScoreElt = document.querySelector(".js-lastScore");
const highScoresElt = document.querySelector(".js-highScores");

const keyboard = new tools.Keyboard(document.body);
const upCodes = [38, 90, 87, 75];
const downCodes = [40, 83, 74];
keyboard.preventDefault([...upCodes, ...downCodes]);

const ballVxInit = 3;
const ballAcc = 0.2;
const ballMaxVel = 10;
const padFriction = 0.995;
let padAcc = 0.5;
let padMaxVel = 3;


const ballBounceIncrease = 1.2;
const padAccIncrease = 1.2;
const padvelIncrease = 1.2;



let highScores = [];
let score = 0;


const ball = {
  size:0.02 * w,
  x:0,
  y:0,
  vx:0,
  vy:0,
};

const padWidth = 0.03 * w;
const padHeight = 0.25 * h;

const leftPad = {
  x:0.5 * padWidth,
  y:0.5 * h,
  vy:0,
  w:padWidth,
  h:padHeight
};

const rightPad = {
  x:w - 0.5 * padWidth,
  y:0.5 * h,
  vy:0,
  w:padWidth,
  h:padHeight
};


function lerp(a, b, t){
  return a + t * (b - a);
}

function resetBall(ball){
  ball.x = 0.5 * w;
  ball.y = 0.5 * h;
  ball.size = 0.02 * w;
  ball.vx = (Math.random() < 0.5 ? -1  :  1) * ballVxInit;
  ball.vy = 0;
}

function resetPad(pad){
  pad.vy = 0;
  pad.y = 0.5 * h;
}

function reset(){
  resetBall(ball);
  resetPad(leftPad);
  resetPad(rightPad);
  padAcc = 0.5;
  padMaxVel = 3;
  setScore(0);
}


function displayHighScores(highScores, last){
  highScoresElt.innerHTML = highScores.map((s, i) => `<li ${s === last ? 'class="last"' : ''}>
<span class="hightscore-rank">${i + 1}</span>
<span class="highscore-date">${s.date}</span>
<span class="hightscore-value">${s.value}</span>
</li>`).join("");
}

function endGame(){
  lastScoreElt.innerHTML = score;
  const last = {value:score, date:(new Date()).toLocaleString()};
  highScores.push(last);
  highScores = highScores.sort((a, b) => b.value - a.value).slice(0, 10);
  displayHighScores(highScores, last);
  saveScores();
  reset();
}


function draw(ctx, ball, leftPad, rightPad){
  ctx.fillStyle = "red";
  ctx.fillRect(
    ball.x - 0.5 * ball.size,
    ball.y - 0.5 * ball.size,
    ball.size,
    ball.size
  );

  ctx.fillStyle = "black";
  ctx.fillRect(
    leftPad.x - 0.5 * leftPad.w,
    leftPad.y - 0.5 * leftPad.h,
    leftPad.w,
    leftPad.h
  );

  ctx.fillRect(
    rightPad.x - 0.5 * rightPad.w,
    rightPad.y - 0.5 * rightPad.h,
    rightPad.w,
    rightPad.h
  );
}

function saveScores(){
  localStorage.pong = JSON.stringify({highScores});
}


function retreiveScores(){
  if(localStorage.pong){
    highScores = JSON.parse(localStorage.pong).highScores;
  }
}


function updateBall(ball){
  ball.x += ball.vx;
  ball.y += ball.vy;
}


function checkHorizontalWallsCollisions(ball, w, h){
  if(ball.y < 0.5 * ball.size){
    ball.y = 0.5 * ball.size;
    ball.vy *= -1;
  }
  else if(ball.y > h - 0.5 * ball.size){
    ball.y = h - 0.5 * ball.size;
    ball.vy *= -1;
  }
}


function checkVerticalWallsCollisions(ball, w, h){
  return ball.x < 0.5 * ball.size ||
    ball.x > w - 0.5 * ball.size;
}


function checkPadCollision(ball, pad, bounceDirection){
  if(ball.x + 0.5 * ball.size > pad.x - 0.5 * pad.w &&
     ball.x - 0.5 * ball.size < pad.x + 0.5 * pad.w &&
     ball.y + 0.5 * ball.size > pad.y - 0.5 * pad.h &&
     ball.y - 0.5 * ball.size < pad.y + 0.5 * pad.h){
    ball.x = pad.x + 0.5 * bounceDirection * (pad.w + ball.size);
    ball.vx *= -1;

    ball.vx *= ballBounceIncrease;
    padAcc *= padAccIncrease;
    padMaxVel *= padvelIncrease;
    setScore(score + 1);
  }
}


function updatePad(pad){
  pad.vy = padFriction * pad.vy + padAcc * (Math.random() * 2 - 1);
  pad.vy = Math.min(Math.max(-padMaxVel, pad.vy), padMaxVel);
  pad.y += pad.vy;
  if(pad.y < 0.5 * pad.h){
    pad.y = 0.5 * pad.h;
    pad.vy *= -1;
  }
  else if(pad.y > h - 0.5 * pad.h){
    pad.y = h - 0.5 * pad.h;
    pad.vy *= -1;
  }
}


function setScore(newScore){
  score = newScore;
  scoreElt.innerHTML = score;
}



function update(){

  updateBall(ball);
  checkHorizontalWallsCollisions(ball, w, h);
  const isOut = checkVerticalWallsCollisions(ball, w, h);
  if(upCodes.some(c => keyboard.isDown(c))){
    ball.vy -= ballAcc;
  }
  else if(downCodes.some(c => keyboard.isDown(c))){
    ball.vy += ballAcc;
  }
  ball.vy = Math.min(Math.max(-ballMaxVel, ball.vy), ballMaxVel);

  if(isOut){
    endGame();
  }

  updatePad(leftPad);
  updatePad(rightPad);

  checkPadCollision(ball, leftPad, 1);
  checkPadCollision(ball, rightPad, -1);

  ctx.clearRect(0, 0, w, h);
  draw(ctx, ball, leftPad, rightPad);
  requestAnimationFrame(update);
}

retreiveScores();
displayHighScores(highScores, undefined);
reset();
update();
