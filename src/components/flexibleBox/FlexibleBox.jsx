import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
import styles from './FlexibleBox.less';
class FlexibleBox extends Component {
  render() {
    return (
      <Rnd
        default={{
          x: 0,
          y: 0,
          width: 320,
          height: 200,
        }}
        className={styles.flexibleBox}
        dragHandleClassName={styles.header}
      >
        <div className={styles.header}>Rnd</div>
      </Rnd>
    );
  }
}

export default FlexibleBox;