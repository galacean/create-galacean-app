import { start } from "../../dist/galacean-app.umd";
import {
  registerCanvas,
  dispatchPointerDown,
  dispatchPointerMove,
  dispatchPointerUp,
  dispatchPointerLeave,
  dispatchPointerCancel,
} from "@galacean/engine-miniprogram-adapter";
Page({
  onCanvasReady() {
    my._createCanvas({
      id: "canvas",
      success: (canvas) => {
        if (canvas) {
          const info = my.getSystemInfoSync();
          let { windowWidth, windowHeight, pixelRatio } = info;
          // 屏幕常亮
          my.setKeepScreenOn({
            keepScreenOn: true,
          });
          if (pixelRatio >= 1.6) {
            canvas.width = windowWidth * 1.6;
            canvas.height = windowHeight * 1.6;
          } else {
            canvas.width = windowWidth * pixelRatio;
            canvas.height = windowHeight * pixelRatio;
          }
          registerCanvas(canvas);
          start(canvas);
        } else {
          throw "success but no canvas";
        }
      },
    });
  },

  onTouchEnd(e) {
    dispatchPointerUp(e);
    dispatchPointerLeave(e);
  },
  onTouchStart(e) {
    dispatchPointerDown(e);
  },
  onTouchMove(e) {
    dispatchPointerMove(e);
  },
  onTouchCancel(e) {
    dispatchPointerCancel(e);
  },
});
