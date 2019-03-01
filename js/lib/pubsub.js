// 订阅者模式的经典实现
export default class PubSub {
  constructor() {
    this.events = {};
  }

  /**
   * 在特定事件上的注册
   * @param {*} event 事件类型
   * @param {*} callback 回调
   */
  subscribe(event, callback) {
    let self = this;
    if (!self.events.hasOwnProperty(event)) {
      self.events[event] = [];
    }
    return self.events[event].push(callback);
  }

  /**
   * 当某个事件发生，手动触发相应的观察者回调
   * @param {*} event
   * @param {*} data
   */
  publish(event, data = {}) {
    let self = this;

    if (!self.events.hasOwnProperty(event)) {
      return [];
    }

    return self.events[event].map(callback => callback(data));
  }
}
