import { canvas } from "./ctx.js";

export function distance(a, b) {
  const sub = { x: a.x - b.x, y: a.y - b.y };
  return Math.sqrt(sub.x * sub.x + sub.y * sub.y);
}

export function maprange(value, in_min, in_max, out_min, out_max) {
  return out_max + ((out_max - out_min) / (in_max - in_min)) * (value - in_min);
}

export const randrange = (lo, hi) => lo + Math.random() * (hi - lo);

export const randpick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const randindex = (arr) => Math.floor(Math.random() * arr.length);

export function cells(xstart, ystart, divnum) {
  const opos = [];
  for (let i = 0; i < divnum; i++) {
    for (let j = 0; j < divnum; j++) {
      opos.push({
        x: xstart + xstart / 2 + (canvas.width / divnum) * i,
        y: ystart + xstart / 2 + (canvas.height / divnum) * j,
      });
    }
  }
  opos.splice(Math.floor((divnum * divnum) / 2), 1);
  return opos;
}

export class LinearSpline {
  constructor(lerpfunc) {
    this.points = [];
    this.lerp = lerpfunc;
  }
  AddPoint(t, d) {
    this.points.push([t, d]);
  }
  GetPoint(t) {
    let p1 = 0;
    for (let i = 0; i < this.points.length; i++) {
      if (this.points[i][0] >= t) {
        break;
      }
      p1 = i;
    }

    const p2 = Math.min(this.points.length - 1, p1 + 1);

    if (p1 === p2) {
      return this.points[p1][1];
    }
    return this.lerp(
      (t - this.points[p1][0]) / (this.points[p2][0] - this.points[p1][0]),
      this.points[p1][1],
      this.points[p2][1],
    );
  }
}

//t = 1-life/maxlife
/**const t = 1 - 6.17 / 6.25;
 * t: 0.012800000000000034
points:  0
p1:  0
points:  0.1
0 --- 1
lerp: 0.12800000000000034
 */

/**
 * const t = 1 - 4.17 / 6.25;
 * t: 0.3328
points:  0
p1:  0
points:  0.1
p1:  1
points:  0.6
1 --- 2
lerp: 1
 */

/**
 * const t = 1 - 1.17 / 6.25;
 * t: 0.8128
points:  0
p1:  0
points:  0.1
p1:  1
points:  0.6
p1:  2
points:  1
2 --- 3
lerp: 0.4680000000000001
 */
