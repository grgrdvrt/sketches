geom = function()
{
	function Vertex(x, y)
	{
		this.x = x || 0;
		this.y = y || 0;
	}
	return {Vertex:Vertex};
}();