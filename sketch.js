var bird;
var walls;
var wall_vx = -2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  initialize();
}
function draw() {
  background(0);
  if (bird.dead)
  {
    stroke(255);
    textSize(50);
    textAlign(CENTER, BASELINE)
    text('You died!', windowWidth/2,windowHeight/2);
    return;
  }
  bird.draw();
  bird.update();
  for (let index = 0; index < walls.length; index++) {
    walls[index].update();
    walls[index].draw();
    
  }

  // walls[0].update();
  // walls[0].draw();
}
function initialize() {
  bird = new Bird(width/3,height/2);
  var delta = (width+30.0)/3;
  walls = [new Wall(width,random(0,height-100)),
    new Wall(width+delta,random(0,height-100)),
    new Wall(width+2*delta,random(0,height-100))];
}
function mouseClicked() {
  if (bird.dead) {
    initialize();
  }
  bird.up();
}
var g = .05;
var UP_Y = 50;
class Bird {
  constructor(x,y) {
    this.x = x
    this.y = y
    this.vy = 0
    this.dead = 0
  }
  update() {
    if (this.dead)
    {
      return;
    }
    this.y += this.vy;
    if (this.vy < 0) {
      this.vy += 2*g;
    }
    this.vy += g;
    if (this.y > height+50 || this.y < -50) {
      this.dead = 1;
    }

    for (var i=0; i<walls.length; i++) {
      if (this.x >= walls[i].x 
      && this.x <= walls[i].x+30
      && (this.y >= walls[i].y+100 || this.y <= walls[i].y))
      {
        this.dead = 1;
        return;
      }
    }



  }
  draw() {
    if (this.dead)
    {
      stroke(255);
      textSize(50);
      textAlign(CENTER, BASELINE)
      text('You died!', 300,200);
    }
    stroke(255);
    fill(255);
    ellipse(this.x, this.y, 10);
  }
  up() {
    // this.y -= UP_Y;
    this.vy = -4;
  }
}
class Wall {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  update() {
    this.x += wall_vx;
    if (this.x < -30)
    {
      this.x = width;
      this.y = random(0,height-100);
    }
  }
  draw() {
    fill(255);
    rect(this.x,0,30,this.y);
    rect(this.x,this.y+100,30,height-this.y);
  }
}