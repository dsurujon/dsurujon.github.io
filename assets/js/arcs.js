// bursts 

/*
Will make a pattern made up of bezier curves 
Left click clears the canvas and starts again

the bezier curves are anchored on the left and 
right side of the canvas, and the control points
will be the mouse location
*/


var t;
var x_center = 400;
var y_center = 400;

function setup() {
  createCanvas(800, 800);
  background(0);

	noFill();
  t = 0;
}

function draw() {
  var x1 = 200;
  var y1 = 400;
	strokeWeight(5);
stroke("black");
	point(x1, y1);
  var x4 = 600;
  var y4 = 400;
	point(x4,y4);
	
	strokeWeight(1);
  stroke(255,x1/2,y1/2,50);
  bezier(x1, y1, 
		 mouseX, mouseY, 
		 mouseX, mouseY, 
		 x4, y4);

  t += 0.01;
}

function mouseClicked(){
	clear();
	background(0);
}