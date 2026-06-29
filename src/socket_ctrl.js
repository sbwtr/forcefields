import { Component } from "./component.js";

export class SocketController extends Component {
  static classname = "SocketController";
  constructor() {
    super();
  }
  get NAME() {
    return SocketController.classname;
  }
}
