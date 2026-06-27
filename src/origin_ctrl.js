import { Component } from "./component.js";
import { Vector } from "./vector.js";

export class OriginController extends Component {
  static classname = "OriginController";
  constructor() {
    super();
    this.position = undefined;
    window.addEventListener("mousemove", (e) => this.OnMove(e));
    window.addEventListener("click", (e) => this.OnClick(e));
  }
  get NAME() {
    return OriginController.classname;
  }
  InitComponent() {
    this.position = new Vector(300, 300);
    this.owner.SetParam("o.position", this.position);
  }

  OnMove(event) {
    this.owner.Broadcast({
      topic: "origin.line",
      pos: { x: event.offsetX, y: event.offsetY },
    });
    if (
      event.offsetX > this.position.VECTOR.x &&
      event.offsetX < this.position.VECTOR.x + this.owner.params["o.radius"] &&
      event.offsetY > this.position.VECTOR.y &&
      event.offsetY < this.position.VECTOR.y + this.owner.params["o.radius"]
    ) {
      this.owner.Broadcast({ topic: "origin.active", value: true });
    }
  }
  OnClick(event) {
    this.owner.Broadcast({
      topic: "field.spawn",
      pos: { x: event.offsetX, y: event.offsetY },
    });
    this.owner.Broadcast({ topic: "origin.active", value: false });
  }
}
