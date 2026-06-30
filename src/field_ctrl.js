import { Component } from "./component.js";
import { distance } from "./helpers.js";

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
  }
  OnFieldSpawn(msg) {
    this.position = { ...msg.pos };
    /*     this.owner.SetParam("f.position", this.position);
     */
  }

  Update(dt, time) {
    if (this.position) {
      const dot = this.owner.GetComponent("DotController");
      const fieldradius = this.owner.GetComponent("FieldDraw");
      if (distance(dot.position, this.position) < fieldradius.params.radius) {
        const dir = {
          x: (dot.position.x - this.position.x) * fieldradius.params.radius,
          y: (dot.position.y - this.position.y) * fieldradius.params.radius,
        };
        this.owner.Broadcast({
          topic: "dot.collide",
          force: dir,
        });
      }
    }
  }
}
