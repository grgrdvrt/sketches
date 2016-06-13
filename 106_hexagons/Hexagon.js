function Hexagon(x, y)
{
	this.x = x;
	this.y = y;

	this.height;
	this.radius;

	this.scale;

	this.display = true;
}

Hexagon.RATIO = Math.sqrt(0.75);
Hexagon.PATTERN = new DitherPattern(3);

Hexagon.prototype = {
	setRadius : function(radius)
	{
		this.radius = radius;
	},

	setScale : function(scale)
	{
		this.scale = scale;
	},


	setHeight : function(height)
	{
		this.height = height;
	},


	draw : function(out, pattern)
	{
		if(!this.display) return;
		var r = this.radius;
		var h = this.scale * r * Hexagon.RATIO;
		var r2 = 0.5 * this.radius;
		var y = -this.height;

		out.save();
		out.translate(this.x, this.y);

		out.strokeStyle = "black";

		out.beginPath()
		out.moveTo(r, y);
		out.lineTo(r, 0);
		out.lineTo(r2, h);
		out.lineTo(r2, y + h);
		out.closePath();
		out.fillStyle = "black";
		out.fill();

		out.fillStyle = pattern;
		out.fillRect(-r2, y + h, r, this.height);

		out.beginPath();
		out.moveTo(-r2, y + h);
		out.lineTo(-r2, h);
		out.lineTo(-r, h);
		out.lineTo(-r, y);
		out.closePath();
		out.fillStyle = "white";
		out.fill();

		out.beginPath();
		out.moveTo(r, y);
		out.lineTo(r2, y + h);
		out.lineTo(-r2, y + h);
		out.lineTo(-r, y);
		out.lineTo(-r2, y - h);
		out.lineTo(r2, y - h);
		out.lineTo(r, y);
		out.fillStyle = "white";
		out.fill();


		out.lineTo(r, 0);
		out.lineTo(r2, h);
		out.lineTo(-r2, h);
		out.lineTo(-r, 0);
		out.lineTo(-r, y);

		out.moveTo(r2, y + h);
		out.lineTo(r2, h);
		out.moveTo(-r2, y + h);
		out.lineTo(-r2, h);

		out.stroke();

		out.restore();
	}
}