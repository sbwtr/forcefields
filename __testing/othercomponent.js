import { Component } from "../src/component.js";

export class OtherComponent extends Component {
  static classname = "Other";
  constructor() {
    super();
  }
  get NAME() {
    return OtherComponent.classname;
  }
  InitComponent() {
    this.owner.RegisterHandler("from.fake", (msg) => this.fromfake(msg));
  }
  fromfake(msg) {
    console.log(msg.value);
  }
}
