import { canvas, ctx } from "./src/ctx.js";
import { EntityManager } from "./src/entityManager.js";
import { Entity } from "./src/entity.js";
import { OriginController } from "./src/origin_ctrl.js";
import { OriginDraw } from "./src/origin_draw.js";
import { DotController } from "./src/dot_ctrl.js";
import { DotDraw } from "./src/dot_draw.js";
import { FieldController } from "./src/field_ctrl.js";
import { FieldDraw } from "./src/field_draw.js";
import { cells, randindex, randpick } from "./src/helpers.js";
import { SocketController } from "./src/socket_ctrl.js";
import { SocketDraw } from "./src/socket_draw.js";
import { UIController } from "./src/ui_ctrl.js";
import { Particles } from "./src/particles.js";

class Game {
  constructor() {
    this.entitymanager = undefined;
    this.#init();
  }
  #init() {
    this.entitymanager = new EntityManager();

    const uiparams = {
      pos: { x: canvas.width / 2, y: canvas.height / 2 },
      gap: 30,
    };
    const ui = new Entity();
    this.entitymanager.Add("ui", ui);
    ui.AddComponent(new UIController(uiparams));

    const data = cells(150, 50, 3);
    console.log(data);

    const redparams = {
      color: `255, 25, 77`,
      radius: 5,
      opos: data.splice(randindex(data), 1)[0],
      spos: data.splice(randindex(data), 1)[0],
    };

    const red = new Entity();
    this.entitymanager.Add("red", red);
    red.AddComponent(new OriginController(redparams));
    red.AddComponent(new OriginDraw(redparams));
    red.AddComponent(new DotController());
    red.AddComponent(new DotDraw(redparams));
    red.AddComponent(new FieldController());
    red.AddComponent(new FieldDraw(redparams));
    red.AddComponent(new FieldController());
    red.AddComponent(new FieldDraw(redparams));
    red.AddComponent(new SocketController(redparams));
    red.AddComponent(new SocketDraw(redparams));
    red.AddComponent(new Particles(redparams));

    const greenparams = {
      color: `21, 47, 36`,
      radius: 5,
      opos: data.splice(randindex(data), 1)[0],
      spos: data.splice(randindex(data), 1)[0],
    };
    const green = new Entity();
    this.entitymanager.Add("green", green);
    green.AddComponent(new OriginController(greenparams));
    green.AddComponent(new OriginDraw(greenparams));
    green.AddComponent(new DotController());
    green.AddComponent(new DotDraw(greenparams));
    green.AddComponent(new FieldController());
    green.AddComponent(new FieldDraw(greenparams));
    green.AddComponent(new FieldController());
    green.AddComponent(new FieldDraw(greenparams));
    green.AddComponent(new SocketController(greenparams));
    green.AddComponent(new SocketDraw(greenparams));
    green.AddComponent(new Particles(greenparams));

    const yellowparams = {
      color: `254, 204, 13`,
      radius: 5,
      opos: data.splice(randindex(data), 1)[0],
      spos: data.splice(randindex(data), 1)[0],
    };
    const yellow = new Entity();
    this.entitymanager.Add("yellow", yellow);
    yellow.AddComponent(new OriginController(yellowparams));
    yellow.AddComponent(new OriginDraw(yellowparams));
    yellow.AddComponent(new DotController());
    yellow.AddComponent(new DotDraw(yellowparams));
    yellow.AddComponent(new FieldController());
    yellow.AddComponent(new FieldDraw(yellowparams));
    yellow.AddComponent(new FieldController());
    yellow.AddComponent(new FieldDraw(yellowparams));
    yellow.AddComponent(new SocketController(yellowparams));
    yellow.AddComponent(new SocketDraw(yellowparams));
    yellow.AddComponent(new Particles(yellowparams));
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
