import React, { Component } from 'react';
import styles from './index.less';
class RectSelect extends Component {
  render() {
    return (
      <rect className={styles.rectSelect} {...this.props}>
        
      </rect>
    );
  }
}

export default RectSelect;