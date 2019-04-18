import React, { Component } from 'react';
import styles from './Main.less';
import Graph from '../components/graph/Graph';
class Main extends Component {
  render() {
    return (
      <div className={styles.main}>
        <Graph />
      </div>
    );
  }
}

export default Main;