import React from 'react';
import styles from './Main.less';
import UseStateDemo from '../components/useStateDemo';
import UseEffectDemo from '../components/useEffectDemo';

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
        <UseStateDemo />
        <UseEffectDemo />
      </div>
    );
  }
}
