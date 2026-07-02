import { Component } from "./component.js";
import { ctx, canvas } from "./ctx.js";

export class OriginDraw extends Component {
  static classname = "OriginDraw";
  #radius = 20;
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
      ctx.moveTo(this.params.opos.x, this.params.opos.y);
      ctx.lineTo(this.tippos.x, this.tippos.y);
      ctx.strokeStyle = `rgb(${this.params.color})`;
      ctx.lineWidth = 3;
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(
      this.params.opos.x,
      this.params.opos.y,
      this.RADIUS,
      0,
      Math.PI * 2,
      false,
    );
    ctx.lineWidth = 6;
    ctx.fillStyle = `rgb(${this.params.color})`;
    ctx.fill();
    ctx.closePath();
  }
}

/* ctx.beginPath();
ctx.moveTo(
  this.params.opos.x - this.RADIUS,
  this.params.opos.y + this.RADIUS,
);
ctx.lineTo(this.params.opos.x - 10, this.params.opos.y - this.RADIUS);
ctx.moveTo(this.params.opos.x - 10, this.params.opos.y - this.RADIUS);
ctx.lineTo(this.params.opos.x - 10, this.params.opos.y + this.RADIUS);
ctx.moveTo(this.params.opos.x - 10, this.params.opos.y + this.RADIUS);
ctx.lineTo(this.params.opos.x + 25, this.params.opos.y - this.RADIUS);
ctx.moveTo(this.params.opos.x + 25, this.params.opos.y - this.RADIUS);
ctx.lineTo(this.params.opos.x + 25, this.params.opos.y + this.RADIUS);
ctx.moveTo(this.params.opos.x + 25, this.params.opos.y + this.RADIUS);
ctx.lineTo(this.params.opos.x + 65, this.params.opos.y - this.RADIUS);
ctx.strokeStyle = `rgb(${this.params.color})`;
ctx.lineWidth = 1;
ctx.stroke(); */
