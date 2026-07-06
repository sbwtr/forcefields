import { Component } from "./component.js";
import { ctx, canvas } from "./ctx.js";

export class DotDraw extends Component {
  static classname = "DotDraw";
  constructor(params) {
    super();
    this.params = { ...params };
    this.active = true;
  }
  get NAME() {
    return DotDraw.classname;
  }
  InitComponent() {
    this.owner.SetParam("d.radius", this.params.radius);
    this.owner.RegisterHandler("dot.velocity", (msg) =>
      this.OnDotVelocity(msg),
    );
  }
  OnDotVelocity(msg) {
    this.active = !msg.value;
  }
  Update(dt, time) {
    if (this.active) {
      ctx.beginPath();
      ctx.arc(
        this.owner.GetParam("d.position").x,
        this.owner.GetParam("d.position").y,
        this.params.radius,
        0,
        Math.PI * 2,
        false,
      );
      ctx.fillStyle = `rgb(${this.params.color})`;
      ctx.fill();
      ctx.fillStyle = `rgb(0,0,0,.7)`;
      ctx.font = `10px "Major Mono Display"`;
      ctx.textBaseline = "middle";
      ctx.fillText(
        `v: ${this.owner.GetParam("d.velocity").x.toFixed(3)}/${this.owner.GetParam("d.velocity").y.toFixed(3)}`,
        this.owner.GetParam("d.position").x + 10,
        this.owner.GetParam("d.position").y,
      );
    }
  }
}
