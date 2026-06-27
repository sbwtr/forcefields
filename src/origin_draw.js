import { Component } from "./component.js";
import { ctx, canvas } from "./ctx.js";
import { Vector } from "./vector.js";

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
    this.tippos = new Vector(0, 0);
    this.owner.SetParam("o.radius", this.#radius);
  }
  OnLineDraw(msg) {
    this.tippos.VECTOR = { ...msg.pos };
  }

  OnOriginActive(msg) {
    this.drawline = msg.value;
  }
  Update(dt, time) {
    if (this.drawline) {
      ctx.beginPath();
      ctx.moveTo(
        this.owner.params["o.position"].VECTOR.x,
        this.owner.params["o.position"].VECTOR.y,
      );
      ctx.lineTo(this.tippos.VECTOR.x, this.tippos.VECTOR.y);
      ctx.strokeStyle = this.params.color;
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(
      this.owner.params["o.position"].VECTOR.x,
      this.owner.params["o.position"].VECTOR.y,
      this.RADIUS,
      0,
      Math.PI * 2,
      false,
    );
    ctx.strokeStyle = this.params.color;
    ctx.fillStyle = `rgb(211, 211, 211)`;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(
      this.owner.params["o.position"].VECTOR.x - this.RADIUS,
      this.owner.params["o.position"].VECTOR.y + this.RADIUS,
    );
    ctx.lineTo(
      this.owner.params["o.position"].VECTOR.x - 10,
      this.owner.params["o.position"].VECTOR.y - this.RADIUS,
    );
    ctx.moveTo(
      this.owner.params["o.position"].VECTOR.x - 10,
      this.owner.params["o.position"].VECTOR.y - this.RADIUS,
    );
    ctx.lineTo(
      this.owner.params["o.position"].VECTOR.x - 10,
      this.owner.params["o.position"].VECTOR.y + this.RADIUS,
    );
    ctx.moveTo(
      this.owner.params["o.position"].VECTOR.x - 10,
      this.owner.params["o.position"].VECTOR.y + this.RADIUS,
    );
    ctx.lineTo(
      this.owner.params["o.position"].VECTOR.x + 25,
      this.owner.params["o.position"].VECTOR.y - this.RADIUS,
    );
    ctx.moveTo(
      this.owner.params["o.position"].VECTOR.x + 25,
      this.owner.params["o.position"].VECTOR.y - this.RADIUS,
    );
    ctx.lineTo(
      this.owner.params["o.position"].VECTOR.x + 25,
      this.owner.params["o.position"].VECTOR.y + this.RADIUS,
    );
    ctx.moveTo(
      this.owner.params["o.position"].VECTOR.x + 25,
      this.owner.params["o.position"].VECTOR.y + this.RADIUS,
    );
    ctx.lineTo(
      this.owner.params["o.position"].VECTOR.x + 65,
      this.owner.params["o.position"].VECTOR.y - this.RADIUS,
    );
    ctx.strokeStyle = this.params.color;
    ctx.stroke();
  }
}
