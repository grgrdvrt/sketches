class Vector2{
  constructor(x = 0, y = 0){
    this.set(x, y);
  }

  set(x = 0, y = 0){
    this.x = x;
    this.y = y;
    return this;
  }

  add(v){
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v){
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  multiplyScalar(s){
    this.x *= s;
    this.y *= s;
    return this;
  }

  scale(v){
    this.x *= v.x;
    this.y *= v.y;
    return this;
  }

  copy(v){
    return this.set(v.x, v.y);
  }

  clone(){
    return new Vector2(this.x, this.y);
  }

  normalize(){
    return this.multiplyScalar(1 / this.getLength());
  }

  getLength(){
    // return Math.hypot(this.x, this.y);
    return Math.sqrt(this.x**2 + this.y**2);
  }

  setLength(len){
    return this.normalize().multiplyScalar(len);
  }

  cross(v){
    return this.x * v.y - this.y * v.x;
  }

  dot(v){
    return this.x * v.x + this.y * v.y;
    // return this.x * v.x + this.y * v.y + this.z * v.z;//3d
  }
}
