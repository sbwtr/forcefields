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
    //check collision?
  }
}
