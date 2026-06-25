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
    this.tippos = new Vector(0, 0);
  }
  OnLineDraw(msg) {
    this.tippos.VECTOR = { ...msg.pos };
  }
  Update(dt, time) {
    const ctrl = this.owner.GetComponent("OriginController");
    if (ctrl.active) {
      ctx.beginPath();
      ctx.moveTo(ctrl.position.VECTOR.x, ctrl.position.VECTOR.y);
      ctx.lineTo(this.tippos.VECTOR.x, this.tippos.VECTOR.y);
      ctx.strokeStyle = this.params.color;
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(
      ctrl.position.VECTOR.x,
      ctrl.position.VECTOR.y,
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
      ctrl.position.VECTOR.x - this.RADIUS,
      ctrl.position.VECTOR.y + this.RADIUS,
    );
    ctx.lineTo(
      ctrl.position.VECTOR.x - 10,
      ctrl.position.VECTOR.y - this.RADIUS,
    );
    ctx.moveTo(
      ctrl.position.VECTOR.x - 10,
      ctrl.position.VECTOR.y - this.RADIUS,
    );
    ctx.lineTo(
      ctrl.position.VECTOR.x - 10,
      ctrl.position.VECTOR.y + this.RADIUS,
    );
    ctx.moveTo(
      ctrl.position.VECTOR.x - 10,
      ctrl.position.VECTOR.y + this.RADIUS,
    );
    ctx.lineTo(
      ctrl.position.VECTOR.x + 25,
      ctrl.position.VECTOR.y - this.RADIUS,
    );
    ctx.moveTo(
      ctrl.position.VECTOR.x + 25,
      ctrl.position.VECTOR.y - this.RADIUS,
    );
    ctx.lineTo(
      ctrl.position.VECTOR.x + 25,
      ctrl.position.VECTOR.y + this.RADIUS,
    );
    ctx.moveTo(
      ctrl.position.VECTOR.x + 25,
      ctrl.position.VECTOR.y + this.RADIUS,
    );
    ctx.lineTo(
      ctrl.position.VECTOR.x + 65,
      ctrl.position.VECTOR.y - this.RADIUS,
    );
    ctx.strokeStyle = this.params.color;
    ctx.stroke();
  }
}
