class State {
  constructor() {}
  Enter() {
    throw new Error("should be implemented in derived");
  }
  Exit() {
    throw new Error("should be implemented in derived");
  }
  Update() {
    throw new Error("should be implemented in derived");
  }
}

export class GameState extends State {
  constructor(parent) {
    this.parent = parent;
  }
  Enter;
  //on enter nothing happens
  //only update checks lost dots
  //and switches to pause
  Update(dt, time) {}
}

export class PauseState extends State {
  constructor(parent) {
    this.parent = parent;
    this.btn = undefined;
  }
  Enter() {
    this.btn = document.querySelector("#btn-reload");
    this.btn.addEventListener("click", () => this.Exit());
  }
  Exit() {
    window.location.reload();
  }
  Update(dt, time) {
    if (this.parent.play) {
      this.parent.play = false;
    }
  }
  //onenter update should be paused
  //onexit pressing button location.reload() should be called
}
