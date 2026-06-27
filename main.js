import { canvas, ctx } from "./src/ctx.js";
import { EntityManager } from "./src/entityManager.js";
import { Entity } from "./src/entity.js";
import { OriginController } from "./src/origin_ctrl.js";
import { OriginDraw } from "./src/origin_draw.js";
import { DotController } from "./src/dot_ctrl.js";
import { DotDraw } from "./src/dot_draw.js";

class Game {
  constructor() {
    this.entitymanager = undefined;
    this.#init();
  }
  #init() {
    this.entitymanager = new EntityManager();

    const redparams = {
      color: `rgb(206, 58, 21)`,
      radius: 5,
    };
    const red = new Entity();
    this.entitymanager.Add("red", red);
    red.AddComponent(new OriginController());
    red.AddComponent(new OriginDraw(redparams));
    red.AddComponent(new DotController());
    red.AddComponent(new DotDraw(redparams));
  }
  Update(dt, time) {
    this.entitymanager.Update(dt, time);
  }
}

let APP = undefined;

window.addEventListener("DOMContentLoaded", () => {
  APP = new Game();
});

let prevT = window.performance.now();
function gameloop(time) {
  const dt = (time - prevT) * 0.001;
  prevT = time;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  APP.Update(dt, time);
  window.requestAnimationFrame(gameloop);
}
window.requestAnimationFrame(gameloop);
