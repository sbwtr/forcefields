//import { canvas } from "./ctx.js";
const cw = 1920;
const ch = 1080;

function cells(xstart, ystart, divnum) {
  const opos = [];
  for (let i = 0; i < divnum; i++) {
    for (let j = 0; j < divnum; j++) {
      opos.push({
        x: xstart + xstart / 2 + (cw / divnum) * i,
        y: ystart + xstart / 2 + (ch / divnum) * j,
        prob: Math.random(),
      });
    }
  }
  return opos;
}

console.log(cells(100, 100, 3));
