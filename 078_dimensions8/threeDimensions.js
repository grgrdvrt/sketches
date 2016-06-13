var threeDimensions = function()
{
	
	function Vector4(x, y, z, w)
	{
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
		this.w = w || 1;
	}
	
	Vector4.prototype = {
		normalize : function()
		{
			var ratio = 1 / Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
			this.x *= ratio;
			this.y *= ratio;
			this.z *= ratio;
		},
		cloneTo : function(target)
		{
			if(!target)target = new Vector4();
			target.x = this.x;
			target.y = this.y;
			target.z = this.z;
			target.w = this.w;
			return target;
		},
		reciprocalDivide : function()
		{
			var ratio = 1 / this.w;
			this.x = this.x *= ratio;
			this.y = this.y *= ratio;
			this.z = this.z *= ratio;
			this.w = 1;
		},
		scale : function(scale)
		{
			this.x *= scale;
			this.y *= scale;
			this.z *= scale;
			this.w *= scale;
		}
	}

	function Matrix4()
	{
		this.data = new Float32Array(16);
		this.identity();
	}


	Matrix4.prototype = {

		identity : function()
		{
			var t = this.data;
			t[0] = t[5] = t[10] = t[15] = 1;
			t[1] = t[2] = t[3] = t[4] = t[6] = t[7] = t[8] = t[9] = t[11] = t[12] = t[13] = t[14] = 0;
		},

		transformVector : function(v, out)
		{
			if(!out) out = v;
			var t = this.data;
			out.x = t[0] * v.x + t[1] * v.y + t[2] * v.z + t[3] * v.w;
			out.y = t[4] * v.x + t[5] * v.y + t[6] * v.z + t[7] * v.w;
			out.z = t[8] * v.x + t[9] * v.y + t[10] * v.z + t[11] * v.w;
			out.w = t[12] * v.x + t[13] * v.y + t[14] * v.z + t[15] * v.w;
		},
			
		appendTransform : function(mat)
		{
			var t = mat.data;
			this.append(t[0], t[1], t[2], t[3], 
						t[4], t[5], t[6], t[7], 
						t[8], t[9], t[10], t[11], 
						t[12], t[13], t[14], t[15]);
		},

		scale : function(sx, sy, sz)
		{
			this.append(sx, 0, 0, 0,
						0, sy, 0, 0,
						0, 0, sz, 0,
						0, 0, 0, 1);
		},

		translate : function(tx, ty, tz)
		{
			this.append(1, 0, 0, tx,
						0, 1, 0, ty,
						0, 0, 1, tz,
						0, 0, 0, 1);
			
		},

		//http://jeux.developpez.com/faq/math/?page=quaternions
		rotate : function(x, y, z, angle)
		{
			angle *= 0.5;
			var sin = Math.sin(angle);

			x *= sin; y *= sin; z *= sin;
			w = Math.cos(angle);

			var len2 = x * x + y * y + z * z + w * w;
			if(len2 == 0) X = len2 = 1;
			var r = 1 / len2;

			var xx = x * x * r, xy = x * y * r;
			var xz = x * z * r, xw = x * w * r;
			var yy = y * y * r, yz = y * z * r;
			var yw = y * w * r;
			var zz = z * z * r, zw = z * w * r;

			var a = 1 - 2 * (yy + zz), b = 2 * (xy + zw), c = 2 * (xz - yw);
			var e = 2 * (xy - zw), f = 1 - 2 * (xx + zz), g = 2 * (yz + xw);
			var i = 2 * (xz + yw), j = 2 * (yz - xw), k = 1 - 2 * (xx + yy);

			var t = this.data;
			var d0 = t[0], d1 = t[1], d2 = t[2], d3 = t[3];
			var d4 = t[4], d5 = t[5], d6 = t[6], d7 = t[7];
			var d8 = t[8], d9 = t[9], d10 = t[10], d11 = t[11];
			var d12 = t[12], d13 = t[13], d14 = t[14], d15 = t[15];


			t[0] = a * d0 + e * d1 + i * d2;
			t[1] = b * d0 + f * d1 + j * d2;
			t[2] = c * d0 + g * d1 + k * d2;

			t[4] = a * d4 + e * d5 + i * d6;
			t[5] = b * d4 + f * d5 + j * d6;
			t[6] = c * d4 + g * d5 + k * d6;

			t[8] = a * d8 + e * d9 + i * d10;
			t[9] = b * d8 + f * d9 + j * d10;
			t[10] = c * d8 + g * d9 + k * d10;

			t[12] = a * d12 + e * d13 + i * d14;
			t[13] = b * d12 + f * d13 + j * d14;
			t[14] = c * d12 + g * d13 + k * d14;
		},

		append : function (a, b, c, d, e, f, g, h, i, j , k, l, m, n, o, p)
		{
			var t = this.data;
			var a1 = t[0], b1 = t[1], c1 = t[2], d1 = t[3];
			var e1 = t[4], f1 = t[5], g1 = t[6], h1 = t[7];
			var i1 = t[8], j1 = t[9], k1 = t[10], l1 = t[11];
			var m1 = t[12], n1 = t[13], o1 = t[14], p1 = t[15];

			t[0] = a * a1 + b * e1 + c * i1 + d * m1;
			t[1] = a * b1 + b * f1 + c * j1 + d * n1;
			t[2] = a * c1 + b * g1 + c * k1 + d * o1;
			t[3] = a * d1 + b * h1 + c * l1 + d * p1;
			
			t[4] = e * a1 + f * e1 + g * i1 + h * m1;
			t[5] = e * b1 + f * f1 + g * j1 + h * n1;
			t[6] = e * c1 + f * g1 + g * k1 + h * o1;
			t[7] = e * d1 + f * h1 + g * l1 + h * p1;
			
			t[8] = i * a1 + j * e1 + k * i1 + l * m1;
			t[9] = i * b1 + j * f1 + k * j1 + l * n1;
			t[10] = i * c1 + j * g1 + k * k1 + l * o1;
			t[11] = i * d1 + j * h1 + k * l1 + l * p1;
			
			t[12] = m * a1 + n * e1 + o * i1 + p * m1;
			t[13] = m * b1 + n * f1 + o * j1 + p * n1;
			t[14] = m * c1 + n * g1 + o * k1 + p * o1;
			t[15] = m * d1 + n * h1 + o * l1 + p * p1;
			
		},
		
		toString : function()
		{
			var t = this.data;
			var str = "";
			str += t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + "\n";
			str += t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + "\n";
			str += t[8] + ", " + t[9] + ", " + t[10] + ", " + t[11] + "\n";
			str += t[12] + ", " + t[13] + ", " + t[14] + ", " + t[15] + "\n";
			return str;
		},

		clone : function()
		{
			var clone = new Matrix4();
			for(var i = 0; i < 16; i++)
				clone.data[i] = this.data[i];
		}
	}

	//http://www.songho.ca/opengl/gl_projectionmatrix.html
	Matrix4.projection = function(fov, aspect, near, far)
	{
		var d = 1 / Math.tan( 0.5 * fov);
		var proj = new Matrix4();
		var t = proj.data;
		
		var inf = 1 / (far - near);
		t[0] = d / aspect;
		t[5] = d;
		t[10] = far * inf;
		t[11] = -near * far * inf;
		t[14] = 1;
		t[15] = 0;
		return proj;
	}
		
	Matrix4.getToScreen = function(width, height, sx, sy)
	{
		var mat = new Matrix4();
		var t = mat.data;
		var d = 1;
		t[0] = 0.5 * width;
		t[3] = 0.5 * width + sx;
		t[5] = -0.5 * height;
		t[7] = 0.5 * height + sy;
		t[10] = t[11] = 0.5 * d;
		return mat;
	}

	return {Vector4:Vector4,
			Matrix4:Matrix4}
}();
