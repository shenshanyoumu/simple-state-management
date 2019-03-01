import Store from "../store/store.js";

export default class Component {
  constructor(props = {}) {
    let self = this;

    // 组件基类，声明一个render接口
    this.render = this.render || function() {};

    // 将全局state对象发生变化，则根据观察者模式来触发所有subscriber的render方法执行
    if (props.store instanceof Store) {
      props.store.events.subscribe("stateChange", () => self.render());
    }

    // 在衍生类实例中，绑定element属性
    if (props.hasOwnProperty("element")) {
      this.element = props.element;
    }
  }
}
