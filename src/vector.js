export class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  set VECTOR(value) {
    this.x = value.x;
    this.y = value.y;
  }
  get VECTOR() {
    return { x: this.x, y: this.y };
  }
}
