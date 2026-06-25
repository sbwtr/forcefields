export class Component {
  static classname = "__basecomponent__";
  constructor() {
    this.owner = undefined;
  }
  get NAME() {
    throw new Error("must be implemented in drived classes");
  }
  set OWNER(entity) {
    this.owner = entity;
  }

  InitComponent() {}

  Update(dt, time) {}
}
