import { Vector } from "./vector.js";

export class Entity {
  constructor() {
    this.name = undefined;
    this.manager = undefined;
    this.components = {};
    this.handlers = [];
    this.position = new Vector(0, 0);
  }

  set NAME(name) {
    this.name = name;
  }
  get NAME() {
    return this.name;
  }
  set MANAGER(manager) {
    this.manager = manager;
  }

  RegisterHandler(name, handler) {
    if (!(name in this.handlers)) {
      this.handlers[name] = [];
    }
    this.handlers[name].push(handler);
  }

  Broadcast(msg) {
    if (!(msg.topic in this.handlers)) {
      return;
    }
    for (const handler of this.handlers[msg.topic]) {
      handler(msg);
    }
  }
  AddComponent(comp) {
    if (!(comp.NAME in this.components)) {
      this.components[comp.NAME] = comp;
      comp.OWNER = this;
      comp.InitComponent();
    }
  }
  GetComponent(name) {
    return this.components[name];
  }
  FindEntity(name) {
    this.manager.Get(name);
  }
  SetPosition(position) {
    this.position.VECTOR = position;
  }
  Update(dt, time) {
    for (const comp in this.components) {
      this.components[comp].Update(dt, time);
    }
  }
}
