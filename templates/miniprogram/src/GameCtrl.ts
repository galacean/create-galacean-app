import {
  BlinnPhongMaterial,
  BoxColliderShape,
  Camera,
  Color,
  DirectLight,
  Entity,
  MeshRenderer,
  PrimitiveMesh,
  Scene,
  Script,
  StaticCollider,
  TextRenderer,
  Vector3,
  WebGLEngine,
} from "oasis-engine";
import { MiniAdapter } from "./adapter/MiniAdapter";
import { OrbitControl } from "@oasis-engine-toolkit/controls";
import { LitePhysics } from "@oasis-engine/physics-lite";

export enum GameState {
  // 未初始化
  NotInit = 0,
  // 初始化引擎
  InitEngine,
  // 初始化 场景
  InitScene,
  // 开始
  Start,
}

export class GameCtrl {
  // 单例
  static _ins: GameCtrl;
  // 引擎
  private _engine: WebGLEngine;
  // 当前的场景
  private _scene: Scene;
  // 当前的根节点
  private _root: Entity;
  // 当前的状态
  private _state: GameState = GameState.NotInit;

  private _tempVec30: Vector3 = new Vector3();
  private _tempVec31: Vector3 = new Vector3();

  /**
   * 获取单例
   */
  static get ins(): GameCtrl {
    if (!this._ins) {
      this._ins = new GameCtrl();
    }
    return this._ins;
  }

  /**
   * 跳转到某个状态
   * @param state - 状态
   * @param arg - 携带参数
   */
  public jump(state: GameState, ...arg) {
    if (this._state !== state) {
      switch (state) {
        case GameState.InitEngine:
          this.initEngine();
          this.jump(GameState.InitScene);
          break;
        case GameState.InitScene:
          this.initScene();
          this.jump(GameState.Start);
          break;
        case GameState.Start:
          // 开始游戏
          break;
      }
    }
  }

  /**
   * 初始化引擎
   */
  public initEngine(): void {
    const canvas = MiniAdapter.canvas;
    const engine = (this._engine = new WebGLEngine(canvas));
    engine.physicsManager.initialize(LitePhysics);
    // 初始化场景
    this._scene = engine.sceneManager.activeScene;
    // 初始化根节点
    this._root = this._scene.createRootEntity();
    // 初始化相机
    engine.run();
  }

  /**
   * 初始化场景
   */
  public initScene(): void {
    const { _root: root, _engine: engine } = this;
    const cameraEntity = root.createChild("Camera");
    cameraEntity.addComponent(Camera);
    const control = cameraEntity.addComponent(OrbitControl);
    control.minPolarAngle = (1 / 180) * Math.PI;
    control.maxPolarAngle = (179 / 180) * Math.PI;
    cameraEntity.transform.setPosition(0, 0, 5);

    // 添加方向光
    const lightEntity = root.createChild("light");
    lightEntity.addComponent(DirectLight);
    lightEntity.transform.setPosition(5, 5, 5);
    lightEntity.transform.setRotation(-30, 20, 0);

    // 添加 box
    const boxEntity = root.createChild("Box");
    const boxRenderer = boxEntity.addComponent(MeshRenderer);
    boxRenderer.mesh = PrimitiveMesh.createCuboid(engine, 1, 1, 1);
    const boxMaterial = new BlinnPhongMaterial(engine);
    boxMaterial.baseColor = new Color(0.3, 0.3, 0.3, 1);
    boxRenderer.setMaterial(boxMaterial);
    // 为这个 box 添加碰撞体
    this._addBoundingBox(boxRenderer);

    // 添加文字
    const textEntity = root.createChild("text");
    textEntity.transform.setPosition(0, 1.5, 0);
    const textRenderer = textEntity.addComponent(TextRenderer);
    textRenderer.fontSize = 30;
    textRenderer.text = "点击方块会弹出 toast !";
  }

  private _addBoundingBox(renderer: MeshRenderer): void {
    const { _tempVec30: localSize, _tempVec31: localPosition } = this;
    // Calculate the position and size of the collider.
    const boundingBox = renderer.mesh.bounds;
    const entity = renderer.entity;
    boundingBox.getCenter(localPosition);
    Vector3.subtract(boundingBox.max, boundingBox.min, localSize);
    // Add collider.
    const boxCollider = entity.addComponent(StaticCollider);
    const boxColliderShape = new BoxColliderShape();
    boxColliderShape.setPosition(
      localPosition.x,
      localPosition.y,
      localPosition.z
    );
    boxColliderShape.setSize(localSize.x, localSize.y, localSize.z);
    boxCollider.addShape(boxColliderShape);
    // Add click script.
    entity.addComponent(Script).onPointerClick = () => {
      MiniAdapter.toast("Click:" + entity.name);
    };
  }
}
