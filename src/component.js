export class Component {
  static classname = "__basecomponent__";
  constructor() {
    this.owner = undefined;
  }
  get NAME() {
    throw new Error("should be implemented in derived");
  }
  set OWNER(entity) {
    this.owner = entity;
  }

  InitComponent() {}

  Update(dt, time) {}
}
