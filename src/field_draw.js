import { Component } from "./component.js";
import { ctx } from "./ctx.js";

export class FieldDraw extends Component {
  static classname = "FieldDraw";
  constructor(params) {
    super();
    this.params = { ...params };
    this.draw = false;
    this.alpha = 1;
  }
  get NAME() {
    return FieldDraw.classname;
  }
  InitComponent() {
    this.owner.SetParam("f.radius", this.params.radius);
    this.owner.RegisterHandler("field.spawn", (msg) => this.OnFieldDraw(msg));
  }
  OnFieldDraw(msg) {
    this.draw = true;
    this.params.radius = 5;
    this.alpha = 1;
  }
  Update(dt, time) {
    if (this.draw) {
      ctx.beginPath();
      ctx.arc(
        this.owner.GetParam("f.position").x,
        this.owner.GetParam("f.position").y,
        (this.params.radius += dt * 20),
        0,
        Math.PI * 2,
        false,
      );
      this.alpha -= dt * 0.1;
      ctx.fillStyle = `rgba(206,58,21,${this.alpha})`;
      ctx.fill();
      if (this.alpha < 0) {
        this.draw = false;
        this.params.radius = 5;
        this.alpha = 1;
      }
    }
  }
}
