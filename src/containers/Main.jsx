import React from 'react';
import styles from './Main.less';
import UseStateDemo from '../components/useStateDemo';
import UseEffectDemo from '../components/useEffectDemo';
import UseMemoDemo from '../components/useMemoDemo';
import UseCallbackDemo from '../components/useCallbackDemo';

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
      <div>
        {/* <UseStateDemo />
        <UseEffectDemo />
        <UseMemoDemo /> */}
        <UseCallbackDemo />
      </div>
    );
  }
}
