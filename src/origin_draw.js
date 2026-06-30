import { Component } from "./component.js";
import { ctx, canvas } from "./ctx.js";

export class OriginDraw extends Component {
  static classname = "OriginDraw";
  #radius = 50;
  constructor(params) {
    super();
    this.params = { ...params };
    this.tippos = undefined;
    this.drawline = false;
  }
  get NAME() {
    return OriginDraw.classname;
  }
  set RADIUS(radius) {
    this.#radius = radius;
  }
  get RADIUS() {
    return this.#radius;
  }
  InitComponent() {
    this.owner.RegisterHandler("origin.line", (msg) => this.OnLineDraw(msg));
    this.owner.RegisterHandler("origin.active", (msg) =>
      this.OnOriginActive(msg),
    );
    this.tippos = { x: 0, y: 0 };
    this.owner.SetParam("o.radius", this.#radius);
  }
  OnLineDraw(msg) {
    this.tippos = { ...msg.pos };
  }

  OnOriginActive(msg) {
    this.drawline = msg.value;
  }
  Update(dt, time) {
    if (this.drawline) {
      const origin = this.owner.GetComponent("OriginController");
      ctx.beginPath();
      ctx.moveTo(
        this.owner.GetParam("o.position").x,
        this.owner.GetParam("o.position").y,
      );
      ctx.lineTo(this.tippos.x, this.tippos.y);
      ctx.strokeStyle = `rgb(${this.params.color})`;
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(
      this.owner.GetParam("o.position").x,
      this.owner.GetParam("o.position").y,
      this.RADIUS,
      0,
      Math.PI * 2,
      false,
    );
    ctx.strokeStyle = `rgb(${this.params.color})`;
    /*ctx.fillStyle = `rgb(211, 211, 211)`;
    ctx.fill(); */
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(
      this.owner.GetParam("o.position").x - this.RADIUS,
      this.owner.GetParam("o.position").y + this.RADIUS,
    );
    ctx.lineTo(
      this.owner.GetParam("o.position").x - 10,
      this.owner.GetParam("o.position").y - this.RADIUS,
    );
    ctx.moveTo(
      this.owner.GetParam("o.position").x - 10,
      this.owner.GetParam("o.position").y - this.RADIUS,
    );
    ctx.lineTo(
      this.owner.GetParam("o.position").x - 10,
      this.owner.GetParam("o.position").y + this.RADIUS,
    );
    ctx.moveTo(
      this.owner.GetParam("o.position").x - 10,
      this.owner.GetParam("o.position").y + this.RADIUS,
    );
    ctx.lineTo(
      this.owner.GetParam("o.position").x + 25,
      this.owner.GetParam("o.position").y - this.RADIUS,
    );
    ctx.moveTo(
      this.owner.GetParam("o.position").x + 25,
      this.owner.GetParam("o.position").y - this.RADIUS,
    );
    ctx.lineTo(
      this.owner.GetParam("o.position").x + 25,
      this.owner.GetParam("o.position").y + this.RADIUS,
    );
    ctx.moveTo(
      this.owner.GetParam("o.position").x + 25,
      this.owner.GetParam("o.position").y + this.RADIUS,
    );
    ctx.lineTo(
      this.owner.GetParam("o.position").x + 65,
      this.owner.GetParam("o.position").y - this.RADIUS,
    );
    ctx.strokeStyle = `rgb(${this.params.color})`;
    ctx.stroke();
  }
}
