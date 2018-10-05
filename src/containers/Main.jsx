import React from 'react';
import styles from './Main.less';

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
      <div className={styles.main}>This is React Arch branch.</div>
    );
  }
}
