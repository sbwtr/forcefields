import { Component } from "./component.js";
import { ctx } from "./ctx.js";

export class UIController extends Component {
  static classname = "UIController";
  constructor(params) {
    super();
    this.params = { ...params };
    this.data = undefined;
    this.b = undefined;
    this.s = undefined;
    this.f = undefined;
  }
  get NAME() {
    return UIController.classname;
  }

  InitComponent() {
    this.owner.RegisterHandler("dot.score", (msg) => this.OnDotScore(msg));
    this.owner.RegisterHandler("dot.bounce", (msg) => this.OnDotBounce(msg));
    this.owner.RegisterHandler("field.spawn", (msg) => this.OnFieldSpawn(msg));
    this.data = { bounce: 0, score: 0, field: 0 };
    this.s = document.querySelector("#svalue");
    this.b = document.querySelector("#sbounce");
    this.f = document.querySelector("#sfield");
  }

  OnDotScore(msg) {
    this.data.score += msg.value;
    this.s.innerText = this.data.score;
  }

  OnDotBounce(msg) {
    this.data.bounce += msg.value;
    this.b.innerText = this.data.bounce;
  }

  OnFieldSpawn(msg) {
    this.data.field += msg.value;
    this.f.innerText = this.data.field;
  }
  /* Update(dt, time) {
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
  } */
}
