import { Script } from "@galacean/engine";
export class MyComponent extends Script {
  onUpdate() {
    this.entity.transform.rotate(0, 1, 0);
  }
}
