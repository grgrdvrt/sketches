var threeDimensions = function()
{
	function Vertex(x, y, z)
	{
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;

		this.tx;
		this.ty;
		this.tz;

		this.scale = 1;
		this.px;
		this.py;

	}

	function Edge(a, b)
	{
		this.a = a;
		this.b = b;
	}

	function Triangle(a, b, c)
	{
		this.a = a;
		this.b = b;
		this.c = c;

		this.face;
	}

	function Face(triangles, vertices)
	{
		this.triangles = triangles;
		this.vertices = vertices;

		var n = this.triangles.length;
		for(var i = 0; i < n; i++)
			this.triangles[i].face = this;
	}

	function TriangleUV()
	{
		this.u;
		this.v;
		this.triangle;
	}

	function Engine()
	{
		this.rotationX = 0;
		this.rotationY = 0;
		this.scaleX = 1;
		this.scaleY = 1;
		this.scaleZ = 1;
		this.tx = 0;
		this.ty = 0;
		this.tz = 0;
		this._matrix = [1, 0, 0, 0,
						0, 1, 0, 0,
						0, 0, 1, 0,
						0, 0, 0, 1];
		this.focal = 300;
	}

	var ep = Engine.prototype;

	ep.scale = function(scaleX, scaleY, scaleZ)
	{
		this.scaleX = scaleX;
		this.scaleY = scaleY;
		this.scaleZ = scaleZ;
	}
	ep.translate = function(tx, ty, tz)
	{
		this.tx = tx;
		this.ty = ty;
		this.tz = tz;
	}

	ep.computeProjections =  function(vertices)
	{
		this._computeRotations();
		var n = vertices.length;
		var m = this._matrix;
		for(var i = 0; i < n; i++)
		{
			var v = vertices[i];
			
			var sx = this.scaleX;
			var sy = this.scaleY;
			var sz = this.scaleZ;

			//appliquer la rotation
			v.tx = sx * m[0] * v.x + sz * m[2] * v.z + this.tx;
			v.ty = sx * m[4] * v.x + sy * m[5] * v.y + sz * m[6] * v.z + this.ty;
			v.tz = sx * m[8] * v.x + sy * m[9] * v.y + sz * m[10] * v.z + this.tz;
			v.scale = this.focal / (v.tz + this.focal);
			v.px = v.tx * v.scale;
			v.py = v.ty * v.scale;
		}
	}
	
	
	ep._computeRotations = function()
	{
		var a = Math.cos(this.rotationX);
		var b = Math.sin(this.rotationX);
		var c = Math.cos(this.rotationY);
		var d = Math.sin(this.rotationY);
		
		this._matrix[0] = c;
		this._matrix[2] = -d;
		this._matrix[4] = -b * d;
		this._matrix[5] = a;
		this._matrix[6] = -b * c;
		this._matrix[8] = a * d;
		this._matrix[9] = b;
		this._matrix[10] = a * c;
	}



	function Cube()
	{
		var v = this.vertices = [];
		v[0] = new Vertex(-150, -150, -150);
		v[1] = new Vertex(150, -150, -150);
		v[2] = new Vertex(150, 150, -150);
		v[3] = new Vertex(-150, 150, -150);

		v[4] = new Vertex(150, -150, 150);
		v[5] = new Vertex(-150, -150, 150);
		v[6] = new Vertex(-150, 150, 150);
		v[7] = new Vertex(150, 150, 150);

		var e = this.edges = [];
		e[0] = new Edge(v[0], v[1]);
		e[1] = new Edge(v[1], v[2]);
		e[2] = new Edge(v[2], v[3]);
		e[3] = new Edge(v[3], v[0]);

		e[4] = new Edge(v[4], v[5]);
		e[5] = new Edge(v[5], v[6]);
		e[6] = new Edge(v[6], v[7]);
		e[7] = new Edge(v[7], v[4]);

		e[8] = new Edge(v[0], v[5]);
		e[9] = new Edge(v[1], v[4]);
		e[10] = new Edge(v[2], v[7]);
		e[11] = new Edge(v[3], v[6]);

		var t = this.triangles = [];
		t[0] = new Triangle(v[0], v[1], v[2]);
		t[1] = new Triangle(v[0], v[2], v[3]);

		t[2] = new Triangle(v[1], v[4], v[7]);
		t[3] = new Triangle(v[1], v[7], v[2]);

		t[4] = new Triangle(v[5], v[4], v[1]);
		t[5] = new Triangle(v[5], v[1], v[0]);

		t[6] = new Triangle(v[4], v[5], v[6]);
		t[7] = new Triangle(v[4], v[6], v[7]);

		t[8] = new Triangle(v[5], v[0], v[3]);
		t[9] = new Triangle(v[5], v[3], v[6]);

		t[10] = new Triangle(v[3], v[2], v[7]);
		t[11] = new Triangle(v[3], v[7], v[6]);

		var f = this.faces = [];
		f[0] = new Face([t[0], t[1]], [v[0], v[1], v[2], v[3]]);
		f[1] = new Face([t[2], t[3]], [v[1], v[4], v[7], v[2]]);
		f[2] = new Face([t[4], t[5]], [v[5], v[4], v[1], v[0]]);
		f[3] = new Face([t[6], t[7]], [v[4], v[5], v[6], v[7]]);
		f[4] = new Face([t[8], t[9]], [v[5], v[0], v[3], v[6]]);
		f[5] = new Face([t[10], t[11]], [v[3], v[2], v[7], v[6]]);
	}

	function EdgesRenderer(ctx, w, h, focal)
	{
		this.ctx = ctx;
		this.w = w;
		this.h = h;
		this.focal = focal
	}

	EdgesRenderer.prototype.render = function(edges)
	{
		var n = edges.length;
		this.ctx.beginPath();
		this.ctx.strokeStyle = "black";
		for(var i = 0; i < n; i++)
		{
			var e = edges[i];
			if(e.a.tz < -this.focal || e.b.tz < -this.focal) continue;
			this.ctx.moveTo(e.a.px + 0.5 * this.w, e.a.py + 0.5 * this.h);
			this.ctx.lineTo(e.b.px + 0.5 * this.w, e.b.py + 0.5 * this.h);
		}
		this.ctx.stroke();
		this.ctx.closePath();
	}

	function FaceRenderer(ctx, w, h)
	{
		this.ctx = ctx;
		this.w = w;
		this.h = h;
	}

	FaceRenderer.prototype.render = function(face)
	{
		this.ctx.fillStyle = "black";
		var v = face.vertices;
		var n = v.length;
		this.ctx.beginPath();
		this.ctx.moveTo(v[0].px + 0.5 * this.w, v[0].py + 0.5 * this.h);
		for(var i = 0; i < n; i++)
			this.ctx.lineTo(v[i].px + 0.5 * this.w, v[i].py + 0.5 * this.h);
		this.ctx.fill();
		this.ctx.closePath();
	}

	function RollManager() { }

	var rmp = RollManager.prototype;
	rmp.getTriangleAt = function(x, y, triangles)
	{
		var selectedTriangle;
		var selectedZ;
		var n = triangles.length;
		for(var i = 0; i < n; i++)
		{
			var t = triangles[i];
			var xab = t.b.px - t.a.px;
			var xac = t.c.px - t.a.px;
			var n2 = (t.c.py - t.a.py) / xac;
			var a = (y - t.a.py - n2 * (x - t.a.px)) / (t.b.py - t.a.py - n2 * xab);
			var b = (x - t.a.px - a * xab) / xac;
			if(a > 0 && b > 0 && a + b < 1)
			{
				console.log("BOUM")
				var z = t.a.tz + a * (t.b.tz - t.a.tz) + b * (t.c.tz - t.a.tz);
				if(!selectedTriangle || selectedZ > z)
				{
					selectedZ = z;
					selectedTriangle = t;
				}
			}
		}
		return selectedTriangle;
	}

	function JellyRenderer(ctx, w, h)
	{
		this.ctx = ctx;
		this.w = w;
		this.h = h;
		this.vertices;
		this.edges;

		this.mouseRadius = 150;
		this.mouseRadius2 = this.mouseRadius * this.mouseRadius;
		this.friction = 0.9;
		this.mouseSpring = 0.05;
		this.vertexSpring = 0.03;
		this.edgeSpring = 0.01;
	}

	var jrp = JellyRenderer.prototype;

	jrp.init = function(mesh)
	{
		var v = this.vertices = [];
		var i, n = mesh.vertices.length;
		for(i = 0; i < n; i++)
		{
			v[i] = new JellyVertex();
			v[i].vertex = mesh.vertices[i];
		}

		this.edges = [];
		var n2 = mesh.edges.length;
		for(var j = 0; j < n2; j++)
		{
			var e = mesh.edges[j];
			var edge = new JellyEdge();
			for(i = 0; i < n; i++)
			{
				if(v[i].vertex == e.a) edge.a = v[i];
				else if(v[i].vertex == e.b) edge.b = v[i];
				if(edge.a && edge.b) break;
			}
			this.edges[j] = edge;
		}
	}

	jrp.render = function(mouseX, mouseY)
	{
		var i, n = this.vertices.length;
		for(i = 0; i < n; i++)
		{
			var v = this.vertices[i];
			var dx = mouseX - v.x;
			var dy = mouseY - v.y;
			var dist = dx * dx + dy * dy
			if(dist < this.mouseRadius2)
			{
				dist = this.mouseRadius / Math.sqrt(dist);
				v.spring(mouseX - dx * dist, mouseY - dy * dist, this.mouseSpring);
			}
			v.spring(v.vertex.px, v.vertex.py, this.vertexSpring);
			v.vx *= this.friction;
			v.vy *= this.friction;
			v.x += v.vx;
			v.y += v.vy;
		}

		n = this.edges.length;
		this.ctx.beginPath();
		this.ctx.strokeStyle = "black";
		var w5 = this.w * 0.5;
		var h5 = this.h * 0.5;
		for(i = 0; i < n; i++)
		{
			var e = this.edges[i];
			e.control.spring(0.5 * (e.a.x + e.b.x), 0.5 * (e.a.y + e.b.y), this.edgeSpring);
			e.control.vx *= this.friction;
			e.control.vy *= this.friction;
			e.control.x += e.control.vx;
			e.control.y += e.control.vy;
			this.ctx.moveTo(e.a.x + w5, e.a.y + h5);
			this.ctx.quadraticCurveTo(e.control.x + w5, e.control.y + h5,
									 e.b.x + w5, e.b.y + h5);
		}
		this.ctx.stroke();
		this.ctx.closePath();

	}


	function JellyVertex()
	{
		this.x = this.y = 0;
		this.vx = this.vy = 0;
		this.vertex;
	}

	JellyVertex.prototype.spring = function(x, y, spring)
	{
		this.vx += (x - this.x) * spring;
		this.vy += (y - this.y) * spring;
	}

	function JellyEdge()
	{
		this.a, this.b;
		this.control = new JellyVertex();
	}

	return {Vertex:Vertex,
			Edge:Edge,
			Triangle:Triangle,
			Face:Face,
			Cube:Cube,
			Engine:Engine,
			EdgesRenderer:EdgesRenderer,
			RollManager:RollManager,
			FaceRenderer:FaceRenderer,
			JellyRenderer:JellyRenderer}
}();


/*Matrix.set = function(src, out)
{
	if(src.length != out.length) throw new Error("size error");
	for(var i = 0; i < src.length; i++) out[i] = src[i]
}

Matrix.multiply = function (a, b)
{

}

Matrix4x4.identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
Matrix3x3.identity = [1, 0, 0, 0, 1, 0, 0, 0, 1];*/
