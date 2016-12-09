function Snake(x,y,dx,dy,color,teamId,teamName){

	this.x = x;
	this.y = y;
	
	this.initialX = x;
	this.initialY = y;

	this.xSpeed = dx;
	this.ySpeed = dy;

	this.initialXSpeed = dx;
	this.initialYSpeed = dy;

	this.teamId = teamId;
	this.teamName = teamName;

	this.color = color;

	this.initialTotal = 4;
	this.total = this.initialTotal;

	this.tail = [];
	this.tailIncrement = 9;

	this.launchers = [];
	this.boostTime = 1;

	this.dir = function(x,y) {

		
		if (x == this.xSpeed || y == this.ySpeed) {
			this.boost();
		}
		//For no backwards movement

		if (x == this.xSpeed * -1) {
			return
		}
		if (y == this.ySpeed * -1) {
			return
		}
		

		this.xSpeed = x;
		this.ySpeed = y;

	}
	this.eat = function(pos) {

		var d = dist(this.x,this.y,pos.x,pos.y);
		
		if (d<1) {
			this.total += this.tailIncrement;
			return true;
		} else {
			return false;
		}


	}
	this.checkCollision = function() {

		for (var i = 0; i < this.tail.length; i += 1) {

			if (this.tail[i] != undefined) {

				if (this.tail[i].x == this.x && this.tail[i].y == this.y) {
					this.die();
					return true;
				}	
			
			}	

		}

		return false;
	
	}
	this.checkCollisionOthers = function(o) {

		for (var i = 0; i < o.length; i += 1) {

			if (o[i] != undefined) {

				if (this.x == o[i].x && this.y == o[i].y) {

					//Collision
					this.die();
					return true;

				}	

			}	

		}

		return false;

	}
	this.die = function() {

		this.total = this.initialTotal;
		this.tail = [];
		this.xSpeed = this.initialXSpeed;
		this.ySpeed = this.initialYSpeed; 
		this.tail = [];
		this.x = this.initialX;
		this.y = this.initialY;


	}
	this.update = function() {

		if (this.boostTime > 2) {

			for (var j = 0; j < 2; j += 1) {

				this.updateSnake();
				this.show();
			}
			
			this.boostTime -= 1;

		} else {

			this.updateSnake();

		}

	}
	this.updateSnake = function() {

		for (var i = 0; i < this.launchers.length; i += 1) {
			this.launchers[i].update();
		}

		if (this.total === this.tail.length) {
			for (var i = 0; i < this.total-1; i += 1) {
				this.tail[i] = this.tail[i+1]; 
			}	
		}
		
		this.tail[this.total-1] = createVector(this.x,this.y); 

		this.x += this.xSpeed*scl;
		this.y += this.ySpeed*scl;

		this.x = constrain(this.x,0,width-scl);
		this.y = constrain(this.y,0,height-scl);
	}

	this.show = function() {

		fill(color[0],color[1],color[2]);
		rect(this.x,this.y,scl,scl);
		
		for (var i = 0; i < this.tail.length; i++) {
			if (this.tail[i] != undefined) {

				rect(this.tail[i].x,this.tail[i].y,scl,scl);
			}
			
		}

	}
	this.boost = function() {
			
		if (this.total > 5) {
			this.boostTime = 10;
			this.cutSnake(1);
		}
		
	}
	this.cutSnake = function(amount) {

		for (var i = 0; i < amount; i += 1) {

			this.tail.shift();
			this.total -= 1;

		}


	}
	this.shootTail = function() {

		var cost = 3;

		if (this.total > cost + 4) {

			this.cutSnake(cost);

			var launcher = new Launcher(this.x,this.y,this.xSpeed,this.ySpeed,this.color,1);
			this.launchers.push(launcher);

		}

	}


}