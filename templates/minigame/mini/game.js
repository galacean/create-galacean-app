// your code here
require("./dist/my-adapter");

import {
  registerCanvas,
  registerMiniGame,
} from "./dist/my-adapter";

const canvas = my.createCanvas();

registerCanvas(canvas);
registerMiniGame();

require("./dist/oasis-app.umd.js");
