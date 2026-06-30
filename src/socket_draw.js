import { Component } from "./component.js";
import { ctx } from "./ctx.js";

export class SocketDraw extends Component {
  static classname = "SocketDraw";
  #radius = 50;
  constructor(params) {
    super();
    this.params = { ...params };
    this.active = true;
  }
  get NAME() {
    return SocketDraw.classname;
  }
  InitComponent() {
    this.owner.RegisterHandler("socket.draw", (msg) => this.OnSocketDraw(msg));
  }
  OnSocketDraw(msg) {
    this.active = msg.value;
  }

  Update(dt, time) {
    if (this.active) {
      ctx.beginPath();
      ctx.arc(
        this.params.spos.x,
        this.params.spos.y,
        this.#radius,
        0,
        Math.PI * 2,
        false,
      );
      const lgrad = ctx.createLinearGradient(
        this.params.spos.x + this.#radius / 2,
        this.params.spos.y + this.#radius / 2,
        this.params.spos.x - this.#radius,
        this.params.spos.y - this.#radius,
      );
      lgrad.addColorStop(0, `rgba(${this.params.color},1)`);
      lgrad.addColorStop(1, `rgba(${this.params.color},0)`);
      ctx.fillStyle = lgrad;
      ctx.fill();
    }
  }
}
