export class Entity {
  #params = {};
  constructor() {
    this.name = undefined;
    this.manager = undefined;
    this.components = {};
    this.handlers = [];
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

  SetParam(name, data) {
    this.#params[name] = data;
  }
  GetParam(name) {
    if (!(name in this.#params)) return;
    return this.#params[name];
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

  Update(dt, time) {
    for (const comp in this.components) {
      this.components[comp].Update(dt, time);
    }
  }
}
