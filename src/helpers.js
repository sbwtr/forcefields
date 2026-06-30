import { canvas } from "./ctx.js";

export function cells(xstart, ystart, divnum) {
  const opos = [];
  for (let i = 0; i < divnum; i++) {
    for (let j = 0; j < divnum; j++) {
      opos.push({
        x: xstart + xstart / 2 + (canvas.width / divnum) * i,
        y: ystart + xstart / 2 + (canvas.height / divnum) * j,
        prob: Math.random(),
      });
    }
  }
  return opos;
}

export function distance(a, b) {
  const sub = { x: a.x - b.x, y: a.y - b.y };
  return Math.sqrt(sub.x * sub.x + sub.y * sub.y);
}
