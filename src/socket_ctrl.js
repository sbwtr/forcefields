import { Component } from "./component.js";
import { distance } from "./helpers.js";

export class SocketController extends Component {
  static classname = "SocketController";
  constructor(params) {
    super();
    this.params = { ...params };
    this.position = undefined;
  }
  get NAME() {
    return SocketController.classname;
  }
  InitComponent() {
    this.position = { ...this.params.spos };
    /* this.owner.RegisterHandler("socket.active", (msg) =>
      this.OnSocketActive(msg),
    ); */
  }
  /*OnSocketActive(msg) {
    this.active = msg.value;
  } */
  Update(dt, time) {
    const dot = this.owner.GetComponent("DotController");
    const socket = this.owner.GetComponent("SocketDraw");
    if (distance(dot.position, this.params.spos) < 47) {
      this.owner.Broadcast({
        topic: "particles.spawn",
        value: true,
      });

      this.owner.manager.Get("ui").Broadcast({ topic: "dot.score", value: 10 });

      this.owner.Broadcast({ topic: "dot.score", value: null });
    }
  }
}
