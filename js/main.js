import store from "./store/index.js";

// Load up components
import Count from "./components/count.js";
import List from "./components/list.js";
import Status from "./components/status.js";

// 查找真实的DOM节点
const formElement = document.querySelector(".js-form");
const inputElement = document.querySelector("#new-item-field");

// 页面点击“保存”按钮
formElement.addEventListener("submit", evt => {
  evt.preventDefault();

  let value = inputElement.value.trim();

  //   触发store实例的dispatch行为，修改state状态，并触发相应的监听事件，作为单项数据流动又反馈页面的修改
  if (value.length) {
    store.dispatch("addItem", value);
    inputElement.value = "";
    inputElement.focus();
  }
});

const countInstance = new Count();
const listInstance = new List();
const statusInstance = new Status();

// 页面组件的render初始化
countInstance.render();
listInstance.render();
statusInstance.render();
