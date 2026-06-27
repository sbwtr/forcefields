import { Component } from "./component.js";

export class OriginController extends Component {
  static classname = "OriginController";
  constructor(params) {
    super();
    this.position = { ...params };
    this.active = false;
    window.addEventListener("mousemove", (e) => this.OnMove(e));
    window.addEventListener("click", (e) => this.OnClick(e));
  }
  get NAME() {
    return OriginController.classname;
  }
  InitComponent() {
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
      this.active = true;
      this.owner.Broadcast({ topic: "origin.active", value: this.active });
    }
  }
  OnClick(event) {
    /*   this.owner.Broadcast({
      topic: "field.spawn",
      pos: undefined,
      draw: false,
      radius: 5,
      alpha: 1,
    }); */
    if (this.active) {
      this.owner.Broadcast({
        topic: "field.spawn",
        pos: { x: event.offsetX, y: event.offsetY },
        draw: true,
        radius: 5,
        alpha: 1,
      });
      this.active = false;
      this.owner.Broadcast({ topic: "origin.active", value: this.active });
    }
  }
}
