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
    this.owner.RegisterHandler("dot.velocity", (msg) =>
      this.OnDotVelocity(msg),
    );
    this.owner.RegisterHandler("field.spawn", (msg) => this.OnFieldSpawn(msg));
    this.data = { bounce: 0, score: 0, field: 0, lost: 0 };
  }

  OnDotScore(msg) {
    this.data.score += msg.value;
  }

  OnDotBounce(msg) {
    this.data.bounce += msg.value;
  }
  OnDotVelocity(msg) {
    this.data.lost += msg.value;
    if (this.data.lost > 2) {
      this.PauseMenu();
    }
  }
  OnFieldSpawn(msg) {
    this.data.field += msg.value;
  }

  PauseMenu() {
    // document.querySelector("canvas").style.visibility = "hidden";
    document.querySelector(".back").style.visibility = "visible";
    document.querySelector(".score").innerText = `${this.data.score}`;
    document.querySelector(".bounce").innerText = `${this.data.bounce}`;
    document.querySelector(".field").innerText = `${this.data.field}`;
    const total = this.data.score - this.data.bounce - this.data.field;
    document.querySelector(".total").innerText = `${total}`;
    document.querySelector(".menu-btn").addEventListener("click", (e) => {
      e.preventDefault();
      window.location.reload();
    });
  }

  Update(dt, time) {
    ctx.font = `25px "Major Mono Display"`;
    ctx.fillStyle = `rgb(0,0,0,.7)`;
    const twidth = ctx.measureText(`Bounce: 100`);
    ctx.fillText(
      `score: ${this.data.score}`,
      this.params.pos.x - twidth.width / 2,
      this.params.pos.y - 100 + this.params.gap,
    );
    ctx.fillText(
      `bounces: ${this.data.bounce}`,
      this.params.pos.x - twidth.width / 2,
      this.params.pos.y - 100 + this.params.gap * 2,
    );
    ctx.fillText(
      `fields: ${this.data.field}`,
      this.params.pos.x - twidth.width / 2,
      this.params.pos.y - 100 + this.params.gap * 3,
    );
    /* ctx.fillText(
      `lost: ${this.data.lost}`,
      this.params.pos.x - twidth.width / 2,
      this.params.pos.y - 100 + this.params.gap * 4,
    ); */
  }
}
