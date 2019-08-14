import React, { Component } from 'react';
import './index.css';
const fontSizeMap = {
  'small': 12,
  'medium': 18,
  'large': 28
};
class Link extends Component {
  render() {
    const { data, size } = this.props;
    const { id, name, x1, y1, x2, y2 } = data;
    let mx = (x1 + x2) / 2;
    let my = (y1 + y2) / 2;
    let atan = Math.atan((y2 - y1) / (x2 - x1));
    let angle = atan * 180 / Math.PI;
    let offsetX = Math.sin(atan) * 6;
    let offsetY = Math.cos(atan) * 6;
    let x = mx + offsetX;
    let y = my - offsetY;
    return (
      <g id={`link${id}`} className='link'>
        <line className='linkLine' x1={x1} y1={y1} x2={x2} y2={y2}></line>
        <text x={x} y={y} style={{ transformOrigin: `${x}px ${y}px`, textAnchor: 'middle', transform: `rotateZ(${angle}deg)`, fontSize: fontSizeMap[size] }} >{name}</text>
      </g >
    );
  }
}
Link.defaultProps = {
}
export default Link;