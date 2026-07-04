const cw = 1000;
const ch = 1000;

export function cells(xstart, ystart, divnum) {
  const opos = [];
  for (let i = 0; i < divnum; i++) {
    for (let j = 0; j < divnum; j++) {
      opos.push({
        x: xstart + xstart / 2 + (cw / divnum) * i,
        y: ystart + xstart / 2 + (ch / divnum) * j,
      });
    }
  }
  opos.splice(Math.floor((divnum * divnum) / 2), 1);
  return opos;
}

console.log(cells(150, 50, 3));
