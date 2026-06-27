import { Component } from "./component.js";
import { ctx, canvas } from "./ctx.js";

export class DotDraw extends Component {
  static classname = "DotDraw";
  constructor(params) {
    super();
    this.params = { ...params };
  }
  get NAME() {
    return DotDraw.classname;
  }
  InitComponent() {
    this.owner.SetParam("d.radius", this.params.radius);
  }
  Update(dt, time) {
    ctx.beginPath();
    ctx.arc(
      this.owner.GetParam("d.position").x,
      this.owner.GetParam("d.position").y,
      this.params.radius,
      0,
      Math.PI * 2,
      false,
    );
    ctx.fillStyle = this.params.color;
    ctx.fill();
  }
}
