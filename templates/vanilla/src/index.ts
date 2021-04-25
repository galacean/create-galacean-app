import {
	AmbientLight,
	BlinnPhongMaterial,
	Camera,
	MeshRenderer,
	PrimitiveMesh,
	Vector3,
	WebGLEngine,
} from "oasis-engine";

const engine = new WebGLEngine("canvas");
engine.canvas.resizeByClientSize();
const rootEntity = engine.sceneManager.activeScene.createRootEntity();

// init camera
const cameraEntity = rootEntity.createChild("camera");
cameraEntity.addComponent(Camera);
const pos = cameraEntity.transform.position;
pos.setValue(10, 10, 10);
cameraEntity.transform.position = pos;
cameraEntity.transform.lookAt(new Vector3(0, 0, 0));

// init light
const light = rootEntity.addComponent(AmbientLight);
light.intensity = 1.2;

// init cube
const cubeEntity = rootEntity.createChild("cube");
const renderer = cubeEntity.addComponent(MeshRenderer);
const mtl = new BlinnPhongMaterial(engine);
const color = mtl.baseColor;
color.r = 0.0;
color.g = 0.8;
color.b = 0.5;
color.a = 1.0;
renderer.mesh = PrimitiveMesh.createCuboid(engine);
renderer.setMaterial(mtl);

engine.run();
