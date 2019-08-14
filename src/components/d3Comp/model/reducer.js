import { combineReducers } from 'redux';
import _ from 'lodash';
import * as Act from './actions';

const intialState = {
  nodes: [],
  links: []
};
function graph(state = intialState, action) {
  const {
    type,
    payload
  } = action;
  switch (type) {
    case Act.ADD_NODES:
      const nodes = addNodes(payload, state);
      return { ...state, nodes };
      break;
    default:
      return state;
  }
}
function addNodes(payload, state) {
  // 重复节点id不添加
  const nodes = _.cloneDeep(state.nodes);
  const nodeDicts = {};
  nodes.forEach(node => {
    nodeDicts[node.id] = node;
  });
  payload.forEach(node => {
    if (!nodeDicts[node.id]) {
      nodeDicts[node.id] = node;
    }
  });
  return nodeDicts.values();
}
export default combineReducers({
  graph
});