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
    this.active = true;
  }
  get NAME() {
    return DotController.classname;
  }
  SetPosition() {
    const xvalue = canvas.width / 2 + (Math.random() * 2 - 1) * 20;
    const yvalue = canvas.height / 2 + (Math.random() * 2 - 1) * 20;
    this.position = { x: xvalue, y: yvalue };
  }
  SetVelocity() {
    this.velocity = {
      x: (Math.random() * 2 - 1) * 80,
      y: (Math.random() * 2 - 1) * 80,
    };
  }
  SetForce() {
    this.force = { x: 0, y: 0 };
  }
  InitComponent() {
    this.SetForce();
    this.SetVelocity();
    this.SetPosition();
    this.owner.SetParam("d.position", this.position);
    this.owner.RegisterHandler("dot.collide", (msg) => this.OnCollide(msg));
    this.owner.RegisterHandler("dot.score", (msg) => this.OnDotScore(msg));
  }

  OnCollide(msg) {
    this.collide = true;
    this.force = { ...msg.force };
  }

  OnDotScore(msg) {
    this.SetForce();
    this.SetVelocity();
    this.SetPosition();
  }

  Update(dt, time) {
    if (this.active) {
      if (
        this.position.x > canvas.width - this.owner.GetParam("d.radius") ||
        this.position.x < this.owner.GetParam("d.radius")
      ) {
        this.owner.manager
          .Get("ui")
          .Broadcast({ topic: "dot.bounce", value: 1 });
        this.velocity.x *= -1;
      }
      if (
        this.position.y > canvas.height - this.owner.GetParam("d.radius") ||
        this.position.y < this.owner.GetParam("d.radius")
      ) {
        this.owner.manager
          .Get("ui")
          .Broadcast({ topic: "dot.bounce", value: 1 });
        this.velocity.y *= -1;
      }
      if (this.collide) {
        this.velocity.x += this.force.x * dt;
        this.velocity.y += this.force.y * dt;
        this.collide = false;
      }
      this.velocity.x *= 0.998;
      this.velocity.y *= 0.998;
      this.position.x += this.velocity.x * dt;
      this.position.y += this.velocity.y * dt;
      if (
        Math.sqrt(
          this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y,
        ) < 4.0
      ) {
        this.owner.Broadcast({
          topic: "dot.velocity",
          pos: this.position,
          value: true,
        });
        this.owner.manager
          .Get("ui")
          .Broadcast({ topic: "dot.velocity", value: 1 });
        this.active = false;
      }
      //not sure if use these anymore
      this.owner.SetParam("d.position", this.position);
      this.owner.SetParam("d.velocity", this.velocity);
    }
  }
}
