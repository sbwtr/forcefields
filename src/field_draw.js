import { Component } from "./component.js";
import { ctx } from "./ctx.js";

export class FieldDraw extends Component {
  static classname = "FieldDraw";
  constructor(params) {
    super();
    this.params = { ...params };
    this.draw = false;
    this.alpha = 0;
    this.position = undefined;
  }
  get NAME() {
    return FieldDraw.classname;
  }
  InitComponent() {
    this.owner.SetParam("f.radius", this.params.radius);
    this.owner.RegisterHandler("field.spawn", (msg) => this.OnFieldSpawn(msg));
  }
  OnFieldSpawn(msg) {
    console.log(msg);
    this.draw = msg.draw;
    this.params.radius = msg.radius;
    this.alpha = msg.alpha;
    this.position = { ...msg.pos };
  }
  Update(dt, time) {
    if (this.draw) {
      ctx.beginPath();
      ctx.arc(
        this.position.x,
        this.position.y,
        (this.params.radius += dt * 20),
        0,
        Math.PI * 2,
        false,
      );
      this.owner.SetParam("f.radius", this.params.radius);
      this.alpha -= dt * 0.1;
      ctx.fillStyle = `rgba(${this.params.color},${this.alpha})`;
      ctx.fill();
      if (this.alpha < 0) {
        this.owner.Broadcast({
          topic: "field.spawn",
          pos: undefined,
          draw: false,
          radius: 5,
          alpha: 1,
        });
      }
    }
  }
}
