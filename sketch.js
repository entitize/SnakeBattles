var snake;
var snake2; 
var scl = 20;
var food;
var team1score = 0;
var team2score = 0;

function setup(){
	
	var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;


	createCanvas(x - 100,y - 130);
	frameRate(12);

	setupSnakes();
	
	pickFoodLocation();
	
}
function setupSnakes(){

	var cols = floor(width/scl);
	var rows = floor(height/scl);

	var x1 = floor(cols*3/4)*scl;
	var y1 = floor(rows*3/4)*scl;
	var color1 = [153,204,255];	

	var x2 = floor(cols/4)*scl;
	var y2 = floor(rows/4)*scl;	 
	var color2 = [204,255,153];

	snake = new Snake(x1,y1,-1,0,color1,1,"blue");
	snake2 = new Snake(x2,y2,1,0,color2,2,"green");
}

function draw(){

	background(51);

	snake.update();
	snake.show();

	snake2.update();
	snake2.show();

	if (snake.eat(food) || snake2.eat(food)) {
		pickFoodLocation();
	}

	if (snake.checkCollision() || snake.checkCollisionOthers(snake2.tail))  {
		incrementScore(2);
		snake2.die();
	}
	if (snake2.checkCollision() || snake2.checkCollisionOthers(snake.tail)) {
		incrementScore(1);
		snake.die();
	}

	for (var i = 0; i < snake.launchers.length; i += 1) {

		var l = snake.launchers[i];

		if (snake2.checkCollisionOthers(l.tail)) {
			incrementScore(1);
			snake.die();
		}

	}
	for (var i = 0; i < snake2.launchers.length; i += 1) {

		var l = snake2.launchers[i];

		if (snake.checkCollisionOthers(l.tail)) {
			incrementScore(2);
			snake2.die();
		}

	}

	fill(255,0,100);
	rect(food.x,food.y,scl,scl);

}
function pickFoodLocation() { 

	var cols = floor(width/scl);
	var rows = floor(height/scl);
	food = createVector(floor(random(cols)),floor(random(rows)));
	food.mult(scl);

}
function incrementScore(teamNum) {

	if (teamNum == 1) {
		team1score += 1;
	} else if (teamNum == 2) {
		team2score += 1;
	}
	document.getElementById("team1").innerHTML = String(team1score);
	document.getElementById("team2").innerHTML = String(team2score);



}
function keyPressed(){

	//Snake 1
	if (keyCode==UP_ARROW) {
		snake.dir(0,-1);
	} else if (keyCode==DOWN_ARROW) {
		snake.dir(0,1);
	} else if (keyCode==RIGHT_ARROW) {
		snake.dir(1,0);
	} else if (keyCode==LEFT_ARROW) {
		snake.dir(-1,0);
	} else if (keyCode==191) {
		snake.shootTail();
	}


	//Snake 2
	if (keyCode==87) {
		snake2.dir(0,-1);
	} else if (keyCode==83) {
		snake2.dir(0,1);
	} else if (keyCode==68) {
		snake2.dir(1,0);
	} else if (keyCode==65) {
		snake2.dir(-1,0);
	} else if (keyCode==88) {
		snake2.shootTail();
	}


}