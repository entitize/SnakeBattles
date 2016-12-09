function Launcher(x,y,dx,dy,color,teamId) {

	this.x = x;
	this.y = y;

	this.dx = dx;
	this.dy = dy;

	this.color = color;
	this.teamId = teamId;

	this.tail = [];
	this.total = 10;

	this.update = function() {

		for (var j = 0; j < 3; j += 1) {

			this.x += scl*this.dx;
			this.y += scl*this.dy;

			if (this.total === this.tail.length) {
				for (var i = 0; i < this.total-1; i += 1) {
					this.tail[i] = this.tail[i+1]; 
				}	
			}

			this.tail[this.total-1] = createVector(this.x,this.y);

			this.show();	
		}
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

}