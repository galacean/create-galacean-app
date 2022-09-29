/**
 * 小程序的 SDK
 * my 的接口写到外面标红太丑
 */
export class MiniAdapter {
  // 画布
  static canvas: HTMLCanvasElement;
  // 是否苹果
  static isIOS: boolean = false;
  // 手机型号
  static phoneModel: string;

  /**
   * 初始化
   * @param designWidth - 设计宽度
   * @param designHeight - 设计高度
   */
  static init(canvas): void {
    this.canvas = canvas;
    // 获取系统信息
    const info = this.getSystemInfoSync();
    // Wether it is IOS
    this.isIOS = info.platform === "iOS";
    // Get phoneModel
    this.phoneModel = info.model;
    // 屏幕常亮
    // @ts-ignore
    my.setKeepScreenOn({ keepScreenOn: true });
  }

  /**
   * 获取所有的缓存信息
   * @param key 缓存key
   * @param succFun 成功回调
   * @param failFun 失败回调
   */
  static getStorage(key: string, succFun: Function, failFun?: Function) {
    // @ts-ignore
    my.getStorage({
      key: key,
      success: function (res) {
        console.log("请求缓存数据success:", res);
        succFun && succFun(res.data);
      },
      fail: function (res) {
        console.log("请求缓存数据fail:", res);
        failFun && failFun(res);
      },
    });
  }

  /**
   * 设置缓存信息
   * @param key 缓存key
   * @param data 缓存的值
   * @param succFun 成功回调
   * @param failFun 失败回调
   */
  static setStorage(
    key: string,
    data: any,
    success?: Function,
    fail?: Function
  ) {
    // @ts-ignore
    my.setStorage({
      key: key,
      data: data,
      success: success,
      fail: fail,
    });
  }

  /**
   * 小游戏的 toast 提示
   * @param content
   */
  static toast(content: string, succ?: Function) {
    // @ts-ignore
    my.alert({
      content: content,
      success: succ,
    });
  }

  /**
   * 获取系统信息
   */
  static getSystemInfoSync() {
    // @ts-ignore
    return my.getSystemInfoSync();
  }
}
