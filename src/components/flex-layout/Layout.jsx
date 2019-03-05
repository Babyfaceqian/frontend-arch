import React, { Component } from 'react';
import styles from './Layout.less';
import Item from './Item';
class Layout extends Component {
  render() {
    const { direction } = this.props;
    let classname = styles.rowLayout;
    if (direction === 'column') {
      classname = styles.columnLayout;
    }
    return (
      <div className={classname}>
        {this.props.children}
      </div>
    );
  }
}
Layout.Item = Item;
export default Layout;