import { Component } from "./component.js";
import { LinearSpline, maprange } from "./helpers.js";
import { ctx } from "./ctx.js";

export class Particles extends Component {
  static classname = "Particles";
  constructor(params) {
    super();
    this.params = { ...params };
    this.particles = [];
    this.sizespl = undefined;
    this.active = false;
  }

  get NAME() {
    return Particles.classname;
  }

  InitComponent() {
    this.sizespl = new LinearSpline((t, a, b) => {
      return a + t * (b - a);
    });
    this.sizespl.AddPoint(0.0, 0.0);
    this.sizespl.AddPoint(0.5, 3.0);
    this.sizespl.AddPoint(1.0, 0.0);
    this.#SetParticles();

    this.owner.RegisterHandler("particles.spawn", (msg) =>
      this.OnParticlesSpawn(msg),
    );
  }

  #SetParticles() {
    for (let i = 0; i < 100; i++) {
      const life = (Math.random() * 0.6 + 0.4) * 2;
      const ang = maprange(i, 0, 100, 0, Math.PI * 2);
      const speed = Math.random() * 100 + 10;

      this.particles.push({
        position: {
          x: this.params.spos.x + Math.cos(ang),
          y: this.params.spos.y + Math.sin(ang),
        },
        size: 0,
        alpha: 1,
        color: this.params.color,
        life: life,
        maxlife: life,
        velocity: {
          x: Math.cos(ang) * speed,
          y: Math.sin(ang) * speed,
        },
      });
    }
  }

  OnParticlesSpawn(msg) {
    this.active = msg.value;
  }

  Update(dt, time) {
    if (this.active) {
      this.particles.forEach((p) => {
        p.life -= dt;
      });
      this.particles = this.particles.filter((p) => p.life > 0.0);
      if (this.particles.length <= 0) {
        this.active = false;
        this.particles = [];
        this.#SetParticles();
      }
      this.particles.forEach((p, idx) => {
        const t = 1 - p.life / p.maxlife;

        p.size = this.sizespl.GetPoint(t);

        p.position.x += p.velocity.x * dt;
        p.position.y += p.velocity.y * dt;
        ctx.beginPath();
        ctx.arc(p.position.x, p.position.y, p.size, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
        ctx.closePath();
      });
    }
  }
}
