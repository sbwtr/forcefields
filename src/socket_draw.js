import { Component } from "./component.js";
import { ctx } from "./ctx.js";
import { LinearSpline } from "./helpers.js";

export class SocketDraw extends Component {
  static classname = "SocketDraw";
  #radius = 50;
  constructor(params) {
    super();
    this.params = { ...params };
    this.action = false;
    this.sizespl = undefined;
    this.life = undefined;
    this.maxlife = undefined;
  }
  get NAME() {
    return SocketDraw.classname;
  }
  InitComponent() {
    this.sizespl = new LinearSpline((t, a, b) => a + t * (b - a));
    this.sizespl.AddPoint(0.0, 50.0);
    this.sizespl.AddPoint(0.25, 55.0);
    this.sizespl.AddPoint(0.5, 70.0);
    this.sizespl.AddPoint(0.75, 55);
    this.sizespl.AddPoint(1.0, 50.0);
    this.life = 2.0;
    this.maxlife = 2.0;
    this.owner.RegisterHandler("particles.spawn", (msg) =>
      this.OnParticlesSpawn(msg),
    );
  }
  OnParticlesSpawn(msg) {
    this.life = 2.0;
    this.maxlife = 2.0;
    this.action = msg.value;
  }
  Update(dt, time) {
    if (this.action && this.life > 0) {
      this.life -= dt * 5;
      const t = 1 - this.life / this.maxlife;
      this.#radius = this.sizespl.GetPoint(t);
    } else {
      this.action = false;
    }
    ctx.beginPath();
    ctx.arc(
      this.params.spos.x,
      this.params.spos.y,
      this.#radius,
      0,
      Math.PI * 2,
      false,
    );
    ctx.strokeStyle = `rgba(${this.params.color},1)`;
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.closePath();
  }
}

/* const lgrad = ctx.createLinearGradient(
  this.params.spos.x + this.#radius / 2,
  this.params.spos.y + this.#radius / 2,
  this.params.spos.x - this.#radius,
  this.params.spos.y - this.#radius,
);
lgrad.addColorStop(0, `rgba(${this.params.color},1)`);
lgrad.addColorStop(1, `rgba(${this.params.color},0)`); */
