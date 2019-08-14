import React from 'react';
import './index.css';
const sizeMap = {
  'small': 20,
  'medium': 40,
  'large': 60
};
const fontSizeMap = {
  'small': 12,
  'medium': 18,
  'large': 28
};
function parseTransform(str) {
  let pattern = /translate\(([^\(]+),([^,]+)\)/;
  let t = str.match(pattern);
  console.log('t', t);
  return {
    x: (t[1] - 0) || 0,
    y: (t[2] - 0) || 0
  };
}
class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    let self = this;
    self.drag = d3.drag().on('start', () => {

    }).on('drag', () => {
      let { x: _x, y: _y } = this.props.data;
      let dx = d3.event.dx; // dx,dy为实际屏幕距离，不用通过k换算
      let dy = d3.event.dy;
      let x = _x + dx;
      let y = _y + dy;
      let data = { ...self.props.data, x, y };
      self.props.onChange(data);  // 交由父组件控制
    }).on('end', () => {

    })
  }
  componentDidMount() {
    let self = this;
    const { id } = self.props;
    self.node = d3.select(this.nodeEle);
    self.dragData = {
      ox: 0,
      oy: 0,
      isMenu: false
    };
    // 右键菜单
    self.node.call(self.drag)
      .on('mousedown', function () {
        // console.log('mousedown', d3.event)
        let which = d3.event.which;
        if (which == 3) {
          self.dragData.ox = d3.event.clientX;
          self.dragData.oy = d3.event.clientY;
          self.dragData.isMenu = true;
        }
      }).on('mousemove', function () {
        // console.log('mousedown', d3.event)
        let which = d3.event.which;
        if (which == 3) {
          let x1 = d3.event.clientX;
          let y1 = d3.event.clientY;
          let dx = x1 - self.dragData.ox;
          let dy = y1 - self.dragData.oy;
          if (Math.sqrt(dx * dx + dy * dy) > 4) {
            self.dragData.isMenu = false;
          }
        }
      }).on('mouseup', function () {
        // console.log('mouseup', d3.event.clientX)
        let which = d3.event.which;
        if (self.dragData.isMenu && which == 3) {
          d3.event.stopPropagation();
          // TODO: menu
          console.log('------------open node menu-------------')
          self.dragData.isMenu = false;
        }
      });
  }

  render() {
    const { data, size, actived } = this.props;
    const { name, id, x, y } = data;
    let s = sizeMap[size];
    let fs = fontSizeMap[size];
    let activedCls = actived ? 'nodeElement-actived' : '';
    return (
      <g
        id={`node${id}`}
        ref={el => this.nodeEle = el}
        className="node"
        transform={`translate(${x},${y})`}
      >
        <rect
          className={`nodeElement ${activedCls}`}
          width={s}
          height={s}
          transform={`translate(-${s / 2},-${s / 2})`}
          onClick={this.onClick}
          
        >
        </rect>
        <text className="nodeLabel" y={s + 4} style={{ fontSize: fs }}>{name}</text>
      </g>
    )
  }
  onClick = () => {
    this.props.onClick && this.props.onClick(this.props.data);
  }
}
Node.defaultProps = {
  // 设置参数
  size: 'medium'
}
export default Node;