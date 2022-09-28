import { Logger } from "oasis-engine";
import { MiniAdapter } from "./adapter/MiniAdapter";
import { GameCtrl, GameState } from "./GameCtrl";

export function start(canvas) {
  Logger.enable();
  MiniAdapter.init(canvas);
  GameCtrl.ins.jump(GameState.InitEngine);
}
