import { canvas, ctx } from "./src/ctx.js";
import { EntityManager } from "./src/entityManager.js";
import { Entity } from "./src/entity.js";
import { FakeComponent } from "./__testing/fakecomponent.js";
import { OtherComponent } from "./__testing/othercomponent.js";

class Game {
  constructor() {
    this.entitymanager = undefined;
    this.#init();
  }
  #init() {
    this.entitymanager = new EntityManager();

    const red = new Entity();
    this.entitymanager.Add("red", red);
    red.AddComponent(new FakeComponent());
    red.AddComponent(new OtherComponent());
    red.Broadcast({ topic: "fake", value: "here goes message" });
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
