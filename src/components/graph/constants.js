export const INITIAL_OPTS = {
  renderer: 'canvas',
  devicePixelRatio: 2,
  width: 'auto',
  height: 'auto'
}
export const NODE_OPT = [{
  shape: {
    cx: 50,
    cy: 50,
    r: 10
  },
  style: {
    fill: '#000',
    stroke: 'none'
  },
  draggable: true,
  z: 3
}];
export const SELECTED_NODE_OPT = {
  style: {
    fill: '#333',
    stroke: 'green',
    lineWidth: '3'
  }
}
export const HIGHLIGHTED_NODE_OPT = {
  style: {
    opacity: '0.3',
  }
}
export const LINK_OPT = [{
  shape: {
    percent: 1
  },
  style: {
    stroke: '#000',
    lineWidth: '3',
    strokeNoScale: true, // 粗细不随缩放变换
  },
  z: 2
}]
export const SELECTED_LINK_OPT = {
  shape: {
    percent: 1
  },
  style: {
    stroke: '#666',
    lineWidth: '3'
  }
}
export const SELECT_RECT_OPT = {
  style: {
    stroke: 'red',
    fill: 'none'
  },
  silent: true
}