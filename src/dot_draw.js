import { Component } from "./component.js";
import { ctx, canvas } from "./ctx.js";

export class DotDraw extends Component {
  static classname = "DotDraw";
  constructor(params) {
    super();
    this.params = { ...params };
    this.draw = true;
  }
  get NAME() {
    return DotDraw.classname;
  }
  InitComponent() {
    this.owner.SetParam("d.radius", this.params.radius);
    this.owner.RegisterHandler("dot.active", (msg) => this.OnDotActive(msg));
  }
  OnDotActive(msg) {
    this.draw = msg.value;
  }
  Update(dt, time) {
    if (this.draw) {
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
    }
  }
}
