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
  z: 2
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
    lineWidth: '3'
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
export const DRAG_RECT_OPT = {
  shape: {
    x: -5000,
    y: -5000,
    height: 10000,
    width: 10000
  },
  draggable: true,
  invisible: true,
  z: 0
}
export const SELECT_RECT_OPT = {
  shape: {
    x: -5000,
    y: -5000,
    height: 10000,
    width: 10000
  },
  draggable: true,
  invisible: true,
  z: 0
}
export const ZOOM_RECT_OPT = {
  shape: {
    x: -1000,
    y: -1000,
    height: 5000,
    width: 5000
  },
  draggable: false,
  invisible: true,
  z: 0,
}