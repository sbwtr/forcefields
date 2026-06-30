import { Component } from "./component.js";
import { distance } from "./helpers.js";

export class SocketController extends Component {
  static classname = "SocketController";
  constructor(params) {
    super();
    this.params = { ...params };
    this.active = true;
  }
  get NAME() {
    return SocketController.classname;
  }
  Update(dt, time) {
    if (this.active) {
      const dot = this.owner.GetComponent("DotController");
      const socket = this.owner.GetComponent("SocketDraw");
      if (distance(dot.position, this.params.spos) < 35) {
        this.active = false;
        this.owner.Broadcast({ topic: "socket.draw", value: this.active });
        this.owner.Broadcast({ topic: "particles.spawn", value: true });
        this.owner.Broadcast({ topic: "dot.active", value: false });
      }
    }
  }
}
