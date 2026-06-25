import { Component } from "..component.js/";
import { Vector } from "../vector.js";

export class OriginController extends Component {
  static classname = "OriginController";
  constructor() {
    super();
    this.position = new Vector(0, 0);
    this.active = false;
    window.addEventListener("mousemove", (e) => this.OnMove(e));
  }
  InitComponent() {
    this.position.VECTOR = { x: 300, y: 300 };
  }
  OnMove(event) {
    const draw = this.owner.GetComponent("OriginDraw");
    this.active = false;
    if (
      event.offsetX > this.position.VECTOR.x &&
      event.offsetX < this.position.VECTOR.x + draw.WIDTH &&
      event.offsetY > this.position.VECTOR.y &&
      event.offsetY < this.position.VECTOR.y + draw.HEIGHT
    ) {
      this.active = true;
    }
  }
}
