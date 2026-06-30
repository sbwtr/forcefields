import { Component } from "./component.js";
import { ctx } from "./ctx.js";

export class UIController extends Component {
  static classname = "UIController";
  constructor(params) {
    super();
    this.params = { ...params };
    this.data = undefined;
  }
  get NAME() {
    return UIController.classname;
  }

  InitComponent() {
    this.owner.RegisterHandler("dot.bounce", (msg) => this.OnDotBounce(msg));
    this.owner.RegisterHandler("dot.score", (msg) => this.OnDotScore(msg));
    this.data = { bounce: 0, score: 0 };
  }

  OnDotBounce(msg) {
    this.data.bounce += msg.value;
  }

  OnDotScore(msg) {
    this.data.score += msg.value;
  }

  Update(dt, time) {
    ctx.font = `25px "Major Mono Display"`;
    ctx.fillStyle = `rgb(0,0,0,.7)`;
    const twidth = ctx.measureText("Bounce: 10");
    ctx.fillText(
      `bounce: ${this.data.bounce}`,
      this.params.pos.x - twidth.width / 2,
      this.params.pos.y + 100,
    );
    ctx.fillText(
      `score: ${this.data.score}`,
      this.params.pos.x - twidth.width / 2,
      this.params.pos.y + this.params.gap + 100,
    );
  }
}
