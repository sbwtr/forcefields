export class EntityManager {
  constructor() {
    this.entityMap = {};
  }
  Add(name, entity) {
    if (!(name in this.entityMap)) {
      this.entityMap[name] = entity;
      entity.NAME = name;
      entity.MANAGER = this;
    }
  }
  Get(name) {
    return this.entityMap[name];
  }
  Update(dt, time) {
    for (const entity in this.entityMap) {
      this.entityMap[entity].Update(dt, time);
    }
  }
}
