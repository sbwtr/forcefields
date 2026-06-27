import { canvas, ctx } from "./src/ctx.js";
import { EntityManager } from "./src/entityManager.js";
import { Entity } from "./src/entity.js";
import { OriginController } from "./src/origin_ctrl.js";
import { OriginDraw } from "./src/origin_draw.js";
import { DotController } from "./src/dot_ctrl.js";
import { DotDraw } from "./src/dot_draw.js";
import { FieldController } from "./src/field_ctrl.js";
import { FieldDraw } from "./src/field_draw.js";

class Game {
  constructor() {
    this.entitymanager = undefined;
    this.#init();
  }
  #init() {
    this.entitymanager = new EntityManager();

    const redparams = {
      color: `206, 58, 21`,
      radius: 5,
    };
    const red = new Entity();
    this.entitymanager.Add("red", red);
    red.AddComponent(new OriginController({ x: 300, y: 300 }));
    red.AddComponent(new OriginDraw(redparams));
    red.AddComponent(new DotController());
    red.AddComponent(new DotDraw(redparams));
    red.AddComponent(new FieldController());
    red.AddComponent(new FieldDraw(redparams));
    red.AddComponent(new FieldController());
    red.AddComponent(new FieldDraw(redparams));

    const greenparams = {
      color: `6, 136, 86`,
      radius: 5,
    };
    const green = new Entity();
    this.entitymanager.Add("green", green);
    green.AddComponent(new OriginController({ x: 600, y: 700 }));
    green.AddComponent(new OriginDraw(greenparams));
    green.AddComponent(new DotController());
    green.AddComponent(new DotDraw(greenparams));
    green.AddComponent(new FieldController());
    green.AddComponent(new FieldDraw(greenparams));
    green.AddComponent(new FieldController());
    green.AddComponent(new FieldDraw(greenparams));

    const violetparams = {
      color: `68, 9, 107`,
      radius: 5,
    };
    const violet = new Entity();
    this.entitymanager.Add("violet", violet);
    violet.AddComponent(new OriginController({ x: 1000, y: 400 }));
    violet.AddComponent(new OriginDraw(violetparams));
    violet.AddComponent(new DotController());
    violet.AddComponent(new DotDraw(violetparams));
    violet.AddComponent(new FieldController());
    violet.AddComponent(new FieldDraw(violetparams));
    violet.AddComponent(new FieldController());
    violet.AddComponent(new FieldDraw(violetparams));
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
