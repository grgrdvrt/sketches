
function hue2rgb(p, q, t){
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
};

class HSLColor{
    constructor(h, s, l, a){
        this.set(h, s, l, a);
    }

    set(h = 0, s = 1, l = 1, a = 1){
        this.h = h;
        this.s = s;
        this.l = l;
        this.a = a;
        return this;
    }

    copy(hslColor){
        this.h = hslColor.h;
        this.s = hslColor.s;
        this.l = hslColor.l;
        this.a = hslColor.a;
        return this;
    }

    //https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex
    toRGBColor() {
        const h = this.h / 360;
        const rgb = new RGBColor(0, 0, 0, this.a);
        if (this.s === 0) {
            rgb.r = rgb.g = rgb.b = this.l; // achromatic
        } else {
            const q = this.l < 0.5 ? this.l * (1 + this.s) : this.l + this.s - this.l * this.s;
            const p = 2 * this.l - q;
            rgb.r = hue2rgb(p, q, h + 1 / 3);
            rgb.g = hue2rgb(p, q, h);
            rgb.b = hue2rgb(p, q, h - 1 / 3);
        }
        return rgb;
    }

    clone(){
        return new HSLColor(this.h, this.s, this.l, this.a);
    }

    toString(){
        const hue = Math.round((this.h % 360 + 360) % 360);
        const sat = Math.round(100 * this.s);
        const lig = Math.round(100 * this.l);
        return `hsla(${hue}, ${sat}%, ${lig}%, ${this.a})`;
    }
}


class RGBColor{
    constructor(r, g, b, a){
        this.set(r, g, b, a);
    }

    set(r = 0, g = 0, b = 0, a = 1){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        return this;
    }

    copy(rgbColor){
        this.r = rgbColor.r;
        this.g = rgbColor.g;
        this.b = rgbColor.b;
        this.a = rgbColor.a;
        return this;
    }

    clone(){
        return new RGBColor(this.r, this.g, this.b, this.a);
    }

    add(rgbColor){
        this.r += rgbColor.r;
        this.g += rgbColor.g;
        this.b += rgbColor.b;
        return this;
    }

    sub(rgbColor){
        this.r -= rgbColor.r;
        this.g -= rgbColor.g;
        this.b -= rgbColor.b;
        return this;
    }

    lerp(rgbColor, t){
        this.r += t * (rgbColor.r - this.r);
        this.g += t * (rgbColor.g - this.g);
        this.b += t * (rgbColor.b - this.b);
        this.a += t * (rgbColor.a - this.a);
        return this;
    }

    toHSLColor() {
        let cmin = Math.min(this.r, this.g, this.b),
            cmax = Math.max(this.r, this.g, this.b),
            delta = cmax - cmin;
        const hsl = new HSLColor(0, 0, 0, this.a);

        if (delta == 0) hsl.h = 0;
        else if (cmax == this.r) hsl.h = ((this.g - this.b) / delta) % 6;
        else if (cmax == this.g) hsl.h = (this.b - this.r) / delta + 2;
        else hsl.h = (this.r - this.g) / delta + 4;

        hsl.h = Math.round(hsl.h * 60);

        if (hsl.h < 0) hsl.h += 360;

        hsl.l = (cmax + cmin) / 2;

        hsl.s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * hsl.l - 1));

        return hsl;
    }

    toString(){
        const r = Math.round(this.r * 0xff);
        const g = Math.round(this.g * 0xff);
        const b = Math.round(this.b * 0xff);
        return `rgba(${r}, ${g}, ${b}, ${this.a})`;
    }
}



function sampleGradient(colors, t){
    const sorted = colors.concat().sort((a, b) => a.weight - b.weight);
    if(t <= sorted[0].weight){
        return sorted[0].color;
    }
    else if( t >= sorted[sorted.length - 1].weight){
        return sorted[sorted.length - 1].color;
    }
    let i = 0;

    while(sorted[i] && sorted[i].weight < t){
        i++;
    }
    const prev = sorted[i - 1];
    const next = sorted[i];
    const t2 = (t - prev.weight) / (next.weight - prev.weight);
    return prev.color.clone().lerp(next.color, t2);
}

