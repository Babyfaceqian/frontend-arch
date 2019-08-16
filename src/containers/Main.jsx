import React from 'react';
import styles from './Main.less';
import worm from 'utils/worm';
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentWillMount() {
  }
  async componentDidMount() {
    let res = await worm.get('https://www.apiopen.top/weatherApi', { city: '杭州' })
    if (res && res.code == 200) {
      this.setState({ data: res.data })
    }
  }
  render() {
    return (
      <div className={styles.main}></div>
    );
  }
}
