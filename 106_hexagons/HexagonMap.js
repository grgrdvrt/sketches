function HexagonMap(w, h)
{
	this.width = w;
	this.height = h;


	this.hexagons = [];

	var n = 200;
	var nx = Math.floor(0.5 * Math.sqrt(n));
	this.maxRadius = 40;
	this.maxHeight = 50;
	this.hexScale = 0.5 * Math.sqrt(2);
	for(var i = 0; i < n; i++)
	{

		var posX = i % nx;
		var posY = Math.floor(i / nx);

		var offset = posY % 2 ? 1.5 * this.maxRadius: 0;

		var hex = new Hexagon(posX * 3 * this.maxRadius + offset,
							  posY * this.maxRadius * Hexagon.RATIO * this.hexScale);
		hex.setRadius(this.maxRadius);
		hex.setHeight(this.maxHeight);
		hex.setScale(this.hexScale);
		this.hexagons[i] = hex;
	}

	this.ditherPattern;
	this.time = 0;


}

HexagonMap.prototype = {

	update : function()
	{
		var n = this.hexagons.length;
		for(var i = 0; i < n; i++)
		{
			var hex = this.hexagons[i];
			//hex.setHeight(this.maxHeight * 0.5 * (Math.cos(0.05 * this.time + 0.5 * i) + 1));
			hex.setHeight(this.maxHeight * 0.5 * (Math.cos(0.05 * this.time + 0.5 * (hex.x + hex.y)) + 1));
			hex.setRadius(this.maxRadius * (0.25 * Math.sin(0.05 * this.time + 0.5 * (hex.x + hex.y)) + 0.75));
			//hex.setHeight(this.maxHeight * Math.random());
		}
	},


	draw : function(out)
	{
		if(!this.ditherPattern)
			this.ditherPattern = out.createPattern(Hexagon.PATTERN.canvas, "repeat");;

		var n = this.hexagons.length;
		for(var i = 0; i < n; i++)
		{
			var hex = this.hexagons[i];
			if(hex.display)
				hex.draw(out, this.ditherPattern);
		}

		this.time++;
	}
}