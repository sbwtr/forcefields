import { Component } from "../src/component.js";

export class FakeComponent extends Component {
  static classname = "Fake";
  constructor() {
    super();
  }
  get NAME() {
    return FakeComponent.classname;
  }
  InitComponent() {
    this.owner.RegisterHandler("fake", (msg) => this.fake(msg));
  }
  fake(msg) {
    this.owner.Broadcast({ topic: "from.fake", value: msg.value });
  }
}
