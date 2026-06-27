import { Component } from "./component.js";

export class FieldController extends Component {
  static classname = "FieldController";
  constructor() {
    super();
    this.position = undefined;
  }
  get NAME() {
    return FieldController.classname;
  }
  InitComponent() {
    this.owner.RegisterHandler("field.spawn", (msg) => this.OnFieldSpawn(msg));
    this.position = { x: 0, y: 0 };
  }
  OnFieldSpawn(msg) {
    this.position = { ...msg.pos };
    this.owner.SetParam("f.position", this.position);
  }
  Update(dt, time) {
    const dotposition = this.owner.GetParam("d.position");
    const fieldradius = this.owner.GetParam("f.radius");
    const maxX = this.position.x + fieldradius;
    const maxY = this.position.y + fieldradius;
    const minX = this.position.x - fieldradius;
    const minY = this.position.y - fieldradius;
    //const length = Math.sqrt(())
    if (
      dotposition.x < maxX &&
      dotposition.y < maxY &&
      dotposition.x > minX &&
      dotposition.y > minY
    ) {
      this.owner.Broadcast({
        topic: "dot.collide",
        force: { x: -100, y: 100 },
      });
    }
  }
}
