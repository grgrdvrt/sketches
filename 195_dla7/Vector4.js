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
    if(target === undefined) {
      target = new Vector4();
    }
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
  },


  toString : function()
  {
    return "[Vector4 x:" + this.x + " y:" + this.y +" z:" + this.z + " w:" + this.w + "]";
  }
};

