import React from 'react';
import styles from './Main.less';
import Map from '../components/map/Map';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className={styles.main}>
        <Map id="container"/>
      </div>
    );
  }
}
