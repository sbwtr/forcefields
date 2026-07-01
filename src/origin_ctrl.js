import { Component } from "./component.js";
import { distance } from "./helpers.js";

export class OriginController extends Component {
  static classname = "OriginController";
  constructor(params) {
    super();
    this.params = { ...params };
    this.active = false;
    window.addEventListener("mousemove", (e) => this.OnMove(e));
    window.addEventListener("click", (e) => this.OnClick(e));
  }
  get NAME() {
    return OriginController.classname;
  }
  InitComponent() {
    this.owner.SetParam("o.position", this.params.opos);
  }

  OnMove(event) {
    const vec = { x: event.clientX, y: event.clientY };
    this.owner.Broadcast({
      topic: "origin.line",
      pos: { x: vec.x, y: vec.y },
    });
    if (distance(vec, this.params.opos) < 50) {
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
      this.owner.manager
        .Get("ui")
        .Broadcast({ topic: "field.spawn", value: 1 });
      this.active = false;
      this.owner.Broadcast({ topic: "origin.active", value: this.active });
    }
  }
}
