import React from 'react';
import styles from './Main.less';
import * as Fetch from './api/main';
import Toolbar from '../components/toolbar/Toolbar';
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
        <Toolbar />
      </div>
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
