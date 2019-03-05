import React, { Component } from 'react';
import styles from './Item.less';

class Item extends Component {
  render() {
    const { flex } = this.props;
    let classname = styles.item;
    return (
      <div className={classname} style={{ flex }}>
        {this.props.children}
      </div>
    );
  }
}
Item.defaultProps = {
  flex: 'none'
};
export default Item;