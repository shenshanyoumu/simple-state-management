import PubSub from "../lib/pubsub.js";

// 简单版全局状态管理库
export default class Store {
  constructor(params) {
    let self = this;

    // 用于跟踪事件和修改状态，在时间旅行中常用
    self.actions = {};
    self.mutations = {};
    self.state = {};

    // 触发actions到state修改的状态，防止同一时刻的修改行为
    self.status = "resting";

    // 基于订阅模式的事件列表
    self.events = new PubSub();

    // 在创建Store实例时的初始化过程
    if (params.hasOwnProperty("actions")) {
      self.actions = params.actions;
    }

    if (params.hasOwnProperty("mutations")) {
      self.mutations = params.mutations;
    }

    // 基于属性代理机制，在state发生变化时触发事件队列
    self.state = new Proxy(params.state || {}, {
      set: function(state, key, value) {
        state[key] = value;

        console.log(`stateChange: ${key}: ${value}`);

        self.events.publish("stateChange", self.state);

        // 必须使用mutation才能修改state状态，而禁止直接修改state属性
        if (self.status !== "mutation") {
          console.warn(`You should use a mutation to set ${key}`);
        }

        // 当前store对象处于闲置状态，可以发起下一轮action
        self.status = "resting";

        return true;
      }
    });
  }

  //简化的action触发行为，对异步行为无法处理
  dispatch(actionKey, payload) {
    let self = this;

    //  action生成函数必须存在
    if (typeof self.actions[actionKey] !== "function") {
      console.error(`Action "${actionKey} doesn't exist.`);
      return false;
    }

    // 日志
    console.groupCollapsed(`ACTION: ${actionKey}`);

    // 修改store实例当前状态
    self.status = "action";

    // 触发action函数执行
    self.actions[actionKey](self, payload);

    console.groupEnd();

    return true;
  }

  /**
   * Look for a mutation and modify the state object
   * if that mutation exists by calling it
   *
   * @param {string} mutationKey
   * @param {mixed} payload
   * @returns {boolean}
   * @memberof Store
   */
  commit(mutationKey, payload) {
    let self = this;

    // mutation用于修改state状态
    if (typeof self.mutations[mutationKey] !== "function") {
      console.log(`Mutation "${mutationKey}" doesn't exist`);
      return false;
    }

    // 更新store当前状态
    self.status = "mutation";

    // 下面两步会修改store实例中的state对象，并通知监听的事件回调
    let newState = self.mutations[mutationKey](self.state, payload);
    self.state = Object.assign(self.state, newState);

    return true;
  }
}
