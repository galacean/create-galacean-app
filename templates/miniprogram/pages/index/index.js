import { registerCanvas } from "@oasis-engine/miniprogram-adapter";
import * as o3 from "oasis-engine/dist/miniprogram";


Page({
  onCanvasReady() {
    my._createCanvas({
      id: "canvas",
      success: (canvas) => {
        if (canvas) {
          const info = my.getSystemInfoSync();
          const {
            windowWidth,
            windowHeight,
            pixelRatio,
            titleBarHeight,
          } = info;
          canvas.width = windowWidth * pixelRatio;
          canvas.height = (windowHeight - titleBarHeight) * pixelRatio;
          registerCanvas(canvas);


          const engine = new o3.WebGLEngine(canvas);
          // engine.canvas.resizeByClientSize();
          const rootEntity = engine.sceneManager.activeScene.createRootEntity();

          // init camera
          const cameraEntity = rootEntity.createChild("camera");
          cameraEntity.addComponent(o3.Camera);
          const pos = cameraEntity.transform.position;
          pos.setValue(10, 10, 10);
          cameraEntity.transform.position = pos;
          cameraEntity.transform.lookAt(new o3.Vector3(0, 0, 0));

          // init cube
          const cubeEntity = rootEntity.createChild("cube");
          const renderer = cubeEntity.addComponent(o3.GeometryRenderer);
          renderer.mesh = new o3.PrimitiveMesh.createCuboid(engine);
          const material = new o3.BlinnPhongMaterial(engine, "blinn");
          material.baseColor = new o3.Vector4(1, 0.25, 0.25, 1);
          renderer.setMaterial(material);

          engine.run();

        } else {
          throw "success but no canvas";
        }
      },
    });
  },
});
