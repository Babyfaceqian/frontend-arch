import React from 'react';
import styles from './Main.less';
import Graph from '../components/graph/graph';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className={styles.main}>
        <Graph />
      </div>
    );
  }
}
