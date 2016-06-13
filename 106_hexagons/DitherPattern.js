function DitherPattern(step)
{
	this.step = step;

	this.stage = new tools.Stage(this.step, this.step, false);
	this.canvas = this.stage.canvas;

	this.draw();
}

DitherPattern.prototype = {
	draw : function()
	{
		var out = this.stage.out;

		out.fillStyle = "white";
		out.fillRect(0, 0, this.step, this.step);
		out.strokeStyle = "black";
		out.beginPath();
		for(var i = 0; i < 2 * this.step; i += this.step)
		{
			out.moveTo(0, i);
			out.lineTo(this.step, i - this.step);
		}
		out.stroke();
	}
}