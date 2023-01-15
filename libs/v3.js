function lerp(a, b, t){
    return a + t * (b - a);
}

class V3{
    static dist(a, b){
        return Math.hypot(
            a.x - b.x,
            a.y - b.y,
            a.z - b.z,
        );
    }
    constructor(x, y, z){
        this.set(x, y, z);
    }

    set(x = 0, y = 0, z = 0){
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    add(v){
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    sub(v){
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }

    multiplyScalar(s){
        this.x *= s;
        this.y *= s;
        this.z *= s;
        return this;
    }

    cross(v){
        return this.set(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        );
    }

    lerp(v, t){
        return this.set(
            this.x = lerp(this.x, v.x, t),
            this.y = lerp(this.y, v.y, t),
            this.z = lerp(this.z, v.z, t),
        );
    }

    dot(v){
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    getLength(){
        return Math.hypot(this.x, this.y, this.z);
    }

    setLength(length){
        const s = length / Math.hypot(this.x, this.y, this.z);
        this.x *= s;
        this.y *= s;
        this.z *= s;
        return this;
    }

    normalize(){
        return this.setLength(1);
    }

    negate(){
        return this.multiplyScalar(-1);
    }

    clone(){
        return new V3(this.x, this.y, this.z);
    }
}
