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
          const scene = engine.sceneManager.activeScene;
          const rootEntity = scene.createRootEntity();

          // init camera
          const cameraEntity = rootEntity.createChild("camera");
          cameraEntity.addComponent(o3.Camera);
          const pos = cameraEntity.transform.position;
          pos.setValue(10, 10, 10);
          cameraEntity.transform.position = pos;
          cameraEntity.transform.lookAt(new o3.Vector3(0, 0, 0));

          // init light
          scene.ambientLight.diffuseSolidColor.setValue(1, 1, 1, 1);
	        scene.ambientLight.diffuseIntensity = 1.2;

          // init cube
          const cubeEntity = rootEntity.createChild("cube");
          const renderer = cubeEntity.addComponent(o3.MeshRenderer);
          const mtl = new o3.BlinnPhongMaterial(engine);
          const color = mtl.baseColor;
          color.r = 0.0;
          color.g = 0.8;
          color.b = 0.5;
          color.a = 1.0;
          renderer.mesh = o3.PrimitiveMesh.createCuboid(engine);
	        renderer.setMaterial(mtl);
          engine.run();

        } else {
          throw "success but no canvas";
        }
      },
    });
  },
});
