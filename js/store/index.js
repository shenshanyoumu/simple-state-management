import actions from "./actions.js";
import mutations from "./mutations.js";
import state from "./state.js";
import Store from "./store.js";

// 构建Store实例
export default new Store({
  actions,
  mutations,
  state
});
