export class StateStack {
  constructor() {
    this.states = {};
    this.current = undefined;
    this.play = true;
  }
  AddState(name, state) {
    this.states[name] = state;
  }
  SetState(name) {
    if (this.current.name === name) {
      return;
    }
    this.current = new this.states[name](this);
    this.current.Enter();
  }
  Update(dt, time) {
    if (this.current) {
      this.current.Update(dt, time);
    }
  }
}
