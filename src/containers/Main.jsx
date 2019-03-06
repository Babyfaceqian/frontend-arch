import React from 'react';
import styles from './Main.less';
import Watermark from 'components/Watermark/Watermark';
export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.main}>
        <Watermark id="watermark" style={{ color: 'green', fontSize: '2em', transform: 'rotate(-30deg)' }} text="12313"/>
      </div>
    );
  }
}
