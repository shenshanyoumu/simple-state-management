import Component from "../lib/component.js";
import store from "../store/index.js";

export default class Status extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector(".js-status")
    });
  }

  // 其实react组件的render与这个简单的render区别在于，react为了性能考虑在操作真实DOM之前进行了抽象层虚拟比较
  render() {
    let self = this;
    let suffix = store.state.items.length !== 1 ? "s" : "";

    // 直接修改真实DOM节点内容
    self.element.innerHTML = `${store.state.items.length} item${suffix}`;
  }
}
