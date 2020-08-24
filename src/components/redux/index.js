import createStore from './createStore';
import Provider from './Provider';
import connect from './connect';
import combineReducer from './combineReducer';

const main = (state = 0, action) => {
  switch (action.type) {
    case "add":
      return state + 1;
    default:
  }
  return state;
};
const store = createStore(combineReducer({ main }));
export {
  store,
  createStore,
  Provider,
  connect,
  combineReducer
}