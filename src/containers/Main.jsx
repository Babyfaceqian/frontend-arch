import React from 'react';
import styles from './Main.less';
import worm from 'utils/worm';
import * as Fetch from './api/main';
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
      <div className={styles.main}><button onClick={this.getWeather}>getWeather</button></div>
    );
  }
  getWeather = async () => {
    let res = await Fetch.getSatin({}, true)
    if (res && res.code == 200) {
      console.log(res);
      this.setState({ data: res.data })
    }
  }
}
