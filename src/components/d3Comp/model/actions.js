function makeActionCreator(type, ...argNames) {
  return function (...args) {
    let action = {
      type
    };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

export const ADD_NODES = 'addNodes';
export const addNodes = makeActionCreator(ADD_NODES, 'payload');
