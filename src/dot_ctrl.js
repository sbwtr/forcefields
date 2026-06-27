import { Component } from "./component.js";
import { canvas } from "./ctx.js";

export class DotController extends Component {
  static classname = "DotController";
  constructor() {
    super();
    this.force = undefined;
    this.velocity = undefined;
    this.position = undefined;
    this.collide = false;
  }
  get NAME() {
    return DotController.classname;
  }
  InitComponent() {
    const x = Math.random() * 20 - 10 + canvas.width / 2;
    const y = Math.random() * 20 - 10 + canvas.height / 2;
    this.force = { x: 0, y: 0 };
    this.velocity = { x: x * 0.1, y: y * 0.1 };
    this.position = { x: x, y: y };
    this.owner.SetParam("d.position", this.position);
    this.owner.RegisterHandler("dot.collide", (msg) => this.OnCollide(msg));
  }
  OnCollide(msg) {
    this.collide = msg.value;
  }
  Update(dt, time) {
    if (
      this.position.x > canvas.width - this.owner.GetParam("d.radius") ||
      this.position.x < this.owner.GetParam("d.radius")
    ) {
      this.velocity.x *= -1;
    }
    if (
      this.position.y > canvas.height - this.owner.GetParam("d.radius") ||
      this.position.y < this.owner.GetParam("d.radius")
    ) {
      this.velocity.y *= -1;
    }
    if (this.collide) {
      this.velocity.x += this.force.x * dt;
      this.velocity.y += this.force.y * dt;
    }
    this.velocity.x *= 0.9995;
    this.velocity.y *= 0.9995;
    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;

    this.owner.SetParam("d.position", this.position);
  }
}
