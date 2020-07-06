function setup() {
  let w = min(displayWidth,displayHeight);
  // w=400;
  let s = 0.95/(4*sqrt(3));
  createCanvas(w, w);
  background(0);
  stroke(255);
  strokeWeight(0.5);
  translate(width/2,height/2);
  push();
  translate(0,-s*sqrt(3)*height);
  snow(s);
  pop();
  push();
  rotate(2*PI/3);
  translate(0,-s*sqrt(3)*height);
  snow(s);
  pop();
  push();
  rotate(-2*PI/3);
  translate(0,-s*sqrt(3)*height);
  snow(s);
  pop();

  noLoop();

}

function draw() {
}

function snow(scale) {
  let cst = scale*width;
  if (3*cst<1) {
    line(-3*cst,0,3*cst,0);
    return;
  }
  push();
  translate(-2*cst,0);
  snow(scale/3);
  pop();
  push()
  translate(2*cst,0);
  snow(scale/3);
  pop();
  push();
  translate(cst,0);
  rotate(PI/3);
  translate(-cst,0);
  snow(scale/3);
  pop();
  push();
  translate(-cst,0);
  rotate(-PI/3);
  translate(cst,0);
  snow(scale/3);
  pop();
}