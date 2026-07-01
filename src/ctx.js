export const canvas = document.querySelector("canvas");
const canvbox = document.querySelector("#canvasbox");
export const ctx = canvas.getContext("2d");
canvas.width = canvbox.clientWidth - 20;
canvas.height = canvbox.clientHeight - 20;
