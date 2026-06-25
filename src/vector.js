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
  get LENGTH() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}
