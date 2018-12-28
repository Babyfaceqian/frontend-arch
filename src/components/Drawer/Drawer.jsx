import React from 'react';
import styles from './Drawer.less';

class Drawer extends React.Component {

  render() {
    const { placement, open, width, height, onToggle, zIndex } = this.props;
    let wrapperCls = styles[`${placement}Wrapper`];
    let toggleOffset, style, wrapperStyle, toggleBtnCls;
    if (placement == 'left') {
      toggleOffset = open ? 0 : `-${width}`;
      style = { left: toggleOffset, width };
      wrapperStyle = { width: open ? width : '0', zIndex };
      toggleBtnCls = styles[`${placement}ToggleBtn`]
    } else if (placement == 'right') {
      toggleOffset = open ? 0 : `-${width}`;
      style = { right: toggleOffset, width };
      wrapperStyle = { width: open ? width : '0', zIndex };
      toggleBtnCls = styles[`${placement}ToggleBtn`]
    } else if (placement == 'top') {
      toggleOffset = open ? 0 : `-${height}`;
      style = { top: toggleOffset, height };
      wrapperStyle = { height: open ? height : '0', zIndex };
      toggleBtnCls = styles[`${placement}ToggleBtn`]
    } else if (placement == 'bottom') {
      toggleOffset = open ? 0 : `-${height}`;
      style = { bottom: toggleOffset, height };
      wrapperStyle = { height: open ? height : '0', zIndex };
      toggleBtnCls = styles[`${placement}ToggleBtn`]
    }
    let drawerCls = styles[`${placement}Drawer`]
    return (
      <div style={wrapperStyle} className={`${wrapperCls}`}>
        <div style={style} className={drawerCls}>
          {this.props.children}
        </div>
        <button onClick={onToggle} className={toggleBtnCls}>Toggle</button>
      </div>
    );
  }
}
Drawer.defaultProps = {
  placement: 'left',
  open: false,
  width: '201px',
  height: '100px'
};

export default Drawer;