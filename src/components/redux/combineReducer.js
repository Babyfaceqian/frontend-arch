export default (reducers) => {
  return (state = {}, action = {}) => {
    let newState = {};
    for (let attr in reducers) {
      newState[attr] = reducers[attr](state[attr], action);
    }
    console.log('newState', newState);
    return newState;
  }
}