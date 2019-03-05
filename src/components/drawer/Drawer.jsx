import React, { Component } from 'react';
import styles from './Drawer.less';
const number = {
  left: 0,
  right: 0,
  bottom: 0
};
class Drawer extends Component {
  constructor(props) {
    super(props);
    this.index = 0;
  }
  componentWillMount() {
    /** 实例化组件后计算 */
    if (this.props.placement === 'left') {
      number.left += 1;
      this.index = number.left;
    }
    if (this.props.placement === 'right') {
      number.right += 1;
      this.index = number.right;
    }
    if (this.props.placement === 'bottom') {
      number.bottom += 1;
      this.index = number.bottom;
    }
  }
  render() {
    const { placement, visible } = this.props;
    console.log('visible', visible);
    let cls, toggleCls, style;
    if (placement === 'left') {
      cls = styles.left;
      toggleCls = visible ? styles.leftNotCollapsed : styles.leftCollapsed;
      // style = { top: '-' + (this.index - 1) * 100 + 'vh' };
      style = { zIndex: number.left - this.index };
    }
    if (placement === 'right') {
      cls = styles.right;
      toggleCls = visible ? styles.rightNotCollapsed : styles.rightCollapsed;
      // style = { top: '-' + (this.index - 1) * 100 + 'vh' };
      style = { zIndex: number.right - this.index };
    }
    if (placement === 'bottom') {
      cls = styles.bottom;
      toggleCls = visible ? styles.bottomNotCollapsed : styles.bottomCollapsed;
      // style = { top: '-' + (this.index - 1) * 200 + 'px' };
      style = { zIndex: this.index };
    }
    return (
      <div className={`${cls} ${toggleCls}`} style={style}>
        {this.props.children}
      </div>
    );
  }
}
Drawer.defaultProps = {
  placement: 'left'
};
export default Drawer;