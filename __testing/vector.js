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
  Add(other) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }
  MultScalar(value) {
    this.x *= value;
    this.y *= value;
    return this;
  }
}
