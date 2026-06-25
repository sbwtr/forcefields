import { Component } from "./component.js";
import { Vector } from "./vector.js";

export class OriginController extends Component {
  static classname = "OriginController";
  constructor() {
    super();
    this.position = new Vector(0, 0);
    this.active = false;
    window.addEventListener("mousemove", (e) => this.OnMove(e));
    window.addEventListener("click", (e) => this.OnClick(e));
  }

  get NAME() {
    return OriginController.classname;
  }
  InitComponent() {
    this.position.VECTOR = { x: 300, y: 300 };
  }

  OnMove(event) {
    const draw = this.owner.GetComponent("OriginDraw");
    if (
      event.offsetX > this.position.VECTOR.x &&
      event.offsetX < this.position.VECTOR.x + draw.RADIUS &&
      event.offsetY > this.position.VECTOR.y &&
      event.offsetY < this.position.VECTOR.y + draw.RADIUS
    ) {
      this.active = true;
    }
  }
  OnClick(event) {
    this.owner.Broadcast({ topic: "field.spawn", value: true });
    this.active = false;
  }
}
