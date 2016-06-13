import Giggle from "../glgl/bundles/Giggle";

import {
  SphereGeometry,
  Vec3,
  Color,
  Sphere,
  PointLight
} from "../glgl/glgl";



let temp = new Vec3();

class Particle
{
  constructor(mesh, radius, x, y, z){
    this.mesh = mesh;
    this.pos = new Vec3(x, y, z);
    this.oPos = new Vec3(x, y, z);
    this.force = new Vec3(0, 0, 0);
    this.mass = 1;
    this.radius = radius;
    this.mesh.scale.scale(this.radius);
  }


  update(dt)
  {
    temp.copy(this.pos);
    this.pos.scale(2).sub(this.oPos).add(this.force.scale(dt * dt / this.mass));
    this.oPos.copy(temp);
    this.mesh.position.copy(this.pos);
  }
}




class Main
{
  constructor()
  {
    this.ctx = new Giggle();
    this.nParticles = 200;
    this.boundingSphere = new Sphere(new Vec3(0, 0, 0), 3);
    this.ctx.camera.position.z = 7;
    this.initParticles();
    this.movingForce = new Vec3();
    this.changeMovingParticle();

    this.ctx.ambientLight.color.hex = 0xcccccc;

    this.ctx.directionalLight.ambient.hex = 0x555555;
    this.ctx.directionalLight.specular.hex = 0x555555;
    this.ctx.directionalLight.diffuse.hex = 0x555555;

    this.ctx.defaultMaterial.ambient.hex = 0x888888;
    this.ctx.defaultMaterial.specular.hex = 0x555555;

    let pointLight = new PointLight();
    pointLight.diffuse.hex = 0x888888;
    pointLight.specular.copy(pointLight.diffuse).scale(0.4);
    pointLight.ambient.copy(pointLight.diffuse).scale(0.4);
    this.ctx.scene.add(pointLight);


    this.ctx.start(this.update.bind(this));
  }


  initParticles()
  {
    this.particles = [];
    let geometry = new SphereGeometry(18, 18);
    for(let i = 0; i < this.nParticles; i++){
      let mesh = this.ctx.create(geometry);
      let particle = new Particle(
        mesh,
        0.05 + Math.pow(1 - i / this.nParticles, 5) * 1,
        Math.random() * this.boundingSphere.radius,
        Math.random() * this.boundingSphere.radius,
        Math.random() * this.boundingSphere.radius
      );
      this.particles[i] = particle;
    }
  }


  resetParticles()
  {
    for(let i = 0; i < this.nParticles; i++){
      this.particles[i].force.set(0, 0);
    }
  }

  separateParticles()
  {
    let diff = new Vec3();
    for(let i = 0; i < this.nParticles; i++){
      let p0 = this.particles[i];
      for(let j = i + 1; j < this.nParticles; j++){
        let p1 = this.particles[j];
        diff.copy(p1.pos).sub(p0.pos);
        let minDist = p0.radius + p1.radius;
        let d2 = diff.squaredLength;
        if(d2 < minDist * minDist){
          let dist = Math.sqrt(d2);
          let separation = diff.scale(0.5 * (minDist - dist) / dist);
          p0.force.sub(separation);
          p1.force.add(separation);
        }
      }
    }
  }


  constraintFrame()
  {
    for(let i = 0; i < this.nParticles; i++){
      let p = this.particles[i];
      if(p.pos.length > this.boundingSphere.radius){
        p.pos.length = this.boundingSphere.radius;
      }
    }
  }


  applyFriction()
  {
    let temp = new Vec3();
    for(let i = 0; i < this.nParticles; i++){
      let p = this.particles[i];
      temp.copy(p.pos).sub(p.oPos).scale(0.9);
      p.pos.copy(p.oPos).add(temp);
    }
  }


  updateParticles()
  {
    let dt = 0.1;
    for(let i = 0; i < this.nParticles; i++){
      let p = this.particles[i].update(dt);
    }
  }


  changeMovingParticle()
  {
    this.movingParticle = this.particles[Math.floor(Math.pow(Math.random(), 3) * this.nParticles)];
    this.movingForce.set(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    ).scale(3);
  }


  updateMovingParticle()
  {
    this.movingParticle.force.add(this.movingForce);
  }


  update(dt)
  {
    this.resetParticles();
    this.updateMovingParticle();
    for(var i = 0; i < 5; i++){
      this.separateParticles();
    }
    this.applyFriction();
    this.constraintFrame();
    this.updateParticles();
    if(Math.random() < 0.03)this.changeMovingParticle();
  }
}


new Main();
