var ground;
var smallBox;
var bigBox;
var wall;

var period;
var counter = 0;
var counterDiv;
var digits = 5;
function setup() {
  createCanvas(1000, 300);
  ground = height*.618;
  smallBox = new Box(200, 50,0,1);
  bigBox = new Box(400, 100, -1, 100**digits);
  wall = new Box(10-300, 300, 0, Infinity);
  period = 1;
  counterDiv = createDiv(counter);
  counterDiv.style('font-size: 72pt');
}
function draw() {
  background(0);
  stroke(255);
  line(0,ground, width, ground);

  let timePassed = 0;
  while (true) {
    let sb = smallBox.nextBounceTime(bigBox);
    let ws = wall.nextBounceTime(smallBox);
    let delta = min(sb,ws);
    if (timePassed + delta < period) {
      counter += 1;
      smallBox.update(delta);
      bigBox.update(delta);
      if (sb < ws) {
        smallBox.bounceWith(bigBox);
      } else {
        wall.bounceWith(smallBox);
      }
      wall.update(delta);
      timePassed += delta;
    } else {
      break;
    }
  }
  smallBox.update(period-timePassed);
  bigBox.update(period-timePassed);
  wall.update(period-timePassed);
  counterDiv.html(counter);

  smallBox.show();
  bigBox.show();
  wall.show();
}

class Box {
  constructor(x, w, v, m) {
    this.x = x;
    this.w = w;
    this.v = v;
    this.m = m;
  }

  update(timeDelta) {
    this.x += this.v*timeDelta;
  }

  nextBounceTime(other) {
    let dist = other.x - this.x-this.w;
    let vel = this.v - other.v;
    return vel>0 ? dist / vel : Infinity;
  }

  bounceWith(other) {
    if (this.m === Infinity)
    {
      other.v *= -1;
      return;
    }
    let v1 = ((this.m-other.m)*this.v + 2*other.m*other.v)/(this.m+other.m);
    let v2 = ((other.m-this.m)*other.v + 2*this.m*this.v)/(this.m+other.m);
    this.v = v1;
    other.v = v2;
  }

  show() {
    push();
    strokeWeight(2);
    fill(100);
    rect(this.x,ground-this.w, this.w, this.w);
    pop();
  }
}
