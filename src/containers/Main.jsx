import React from 'react';
import styles from './Main.less';
import { Button } from 'antd';
import 'antd/dist/antd.css';
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentWillMount() {
  }
  async componentDidMount() {
  }
  render() {
    return (
      <div className={styles.main}>
        <Button>Test</Button>
      </div>
    );
  }
}
