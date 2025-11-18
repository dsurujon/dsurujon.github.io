let objs = [];
let objsNum = 360;
const noiseScale = 0.1;
let R;
let maxR;
let t = 0;
let nt = 0;
let nR = 0;
let nTheta = 1000;
const palette = ["#F2D8A7","#D991A4", "#8C6485", "#EECBB2", "#443D73", "#F2845C", "#D96055"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noStroke();

  maxR = max(width, height) * 0.45;

  background("#B2EDDE");
}

function draw() {

  if (mouseIsPressed) {
	  if (mouseButton === LEFT){
		  objs.push(new Obj(mouseX, mouseY));
	  }
    
  }

  for (let i = 0; i < objs.length; i++) {
    objs[i].move();

    objs[i].display();
  }

  for (let j = objs.length - 1; j >= 0; j--) {
    if (objs[j].isFinished()) {
      objs.splice(j, 1);
    }
  }

  // t++;
  nt++;
}

class Obj {
  constructor(ox, oy) {
    this.init(ox, oy);
  }

  init(ox, oy) {
    this.vel = createVector(0, 0);
    this.pos = createVector(ox, oy);
    this.t = random(0, noiseScale);
    this.lifeMax = random(50, 80);
    this.life = this.lifeMax;
    this.step = 0.3;
    this.dMax = random(20,90);
    this.d = this.dMax;
    this.c = color(random(palette));
  }

  move() {
    let theta = map(noise(this.pos.x * noiseScale, this.pos.y * noiseScale, this.t), 0, 1, 0, 360);
    this.vel.x = cos(theta);
    this.vel.y = sin(theta);
    this.pos.add(this.vel);
  }

  isFinished() {
    this.life -= this.step;
    this.d = map(this.life, 0, this.lifeMax, 0, this.dMax);
    if (this.life < 0) {
      return true;
    } else {
      return false;
    }
  }

  display() {
    fill(this.c);

    circle(this.pos.x, this.pos.y, this.d);
  }
}

function func(t, num) {
  let a = 360 / num;
  let A = cos(a);
  let b = acos(cos(num * t));
  let B = cos(a - b / num);

  return A / B;
}

function mousePressed() {
  if (mouseButton === RIGHT) {
    // Re-run setup() to restore original canvas state
    setup();
    objs = [];
  }
}