import { Component } from "./component.js";

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
    this.position = { x: 300, y: 300 };
    this.owner.SetParam("o.position", this.position);
  }

  OnMove(event) {
    this.owner.Broadcast({
      topic: "origin.line",
      pos: { x: event.offsetX, y: event.offsetY },
    });
    if (
      event.offsetX > this.position.x &&
      event.offsetX < this.position.x + this.owner.GetParam("o.radius") &&
      event.offsetY > this.position.y &&
      event.offsetY < this.position.y + this.owner.GetParam("o.radius")
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
