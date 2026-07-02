import { Component } from "./component.js";
import { ctx } from "./ctx.js";

export class FieldDraw extends Component {
  static classname = "FieldDraw";
  constructor(params) {
    super();
    this.params = { ...params };
    this.active = false;
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
    this.active = msg.draw;
    this.params.radius = msg.radius;
    this.alpha = msg.alpha;
    this.position = { ...msg.pos };
  }
  Update(dt, time) {
    if (this.active) {
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
      ctx.strokeStyle = `rgba(${this.params.color},${this.alpha})`;
      ctx.lineWidth = 6;
      ctx.stroke();
      if (this.alpha < 0) {
        this.owner.Broadcast({
          topic: "field.spawn",
          pos: undefined,
          draw: false,
          radius: 5,
          alpha: 1,
        });
      }
      ctx.font = `10px "Major Mono Display"`;
      ctx.textBaseline = "middle";
      ctx.fillText(
        `f: ${Math.floor(this.params.radius)}`,
        this.position.x + this.params.radius + 20,
        this.position.y,
      );
    }
  }
}
