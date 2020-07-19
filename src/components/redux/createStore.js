export default (reducer) => {
  // 状态
  let state;
  // 监听队列
  let listeners = [];
  let getState = () => state;
  // 派发action
  let dispatch = (action) => {
    // 更新state
    state = reducer(state, action);
    // 触发监听回调更新视图
    listeners.forEach(l => l());
  }
  let subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l !== listener);
    }
  }
  dispatch();
  return {
    getState,
    dispatch,
    subscribe
  }
}