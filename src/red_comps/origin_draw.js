import { Component } from "../component.js";
import { ctx, canvas } from "../ctx.js";

export class OriginDraw extends Component {
  static classname = "OriginDraw";
  #radius = 50;
  constructor() {
    super();
    this.octrlpos = undefined;
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
    const ctrl = this.owner.GetComponent("OriginController");
    this.octrlpos = ctrl.position;
  }

  Update(dt, time) {
    ctx.beginPath();
    ctx.arc(
      this.octrlpos.VECTOR.x,
      this.octrlpos.VECTOR.y,
      this.RADIUS,
      0,
      Math.PI * 2,
      false,
    );
    ctx.strokeStyle = `rgb(206, 58, 21)`;
    ctx.stroke();
  }
}
