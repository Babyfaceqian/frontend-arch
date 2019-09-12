import React from 'react';
import styles from './Main.less';
import worm from 'utils/worm';
import HistoryState from 'components/historyState';
const historyState = new HistoryState();
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }
  componentWillMount() {
  }
  componentDidMount() {
    historyState.push({
      undoAction: () => {},
      redoAction: () => {}
    });
  }

  render() {
    return (
      <div className={styles.main}>
        <h1>{this.state.count}</h1>
        <button onClick={this.asc}>增大</button>
        <button onClick={this.desc}>减小</button>
        <br />
        <button onClick={this.undo} disabled={!historyState.hasRecord('past')}>撤销</button>
        <button onClick={this.redo} disabled={!historyState.hasRecord('future')}>重做</button>
      </div>
    );
  }
  asc = () => {
    historyState.push({
      undoAction: () => this.setState({ count: this.state.count - 2 }),
      redoAction: () => this.setState({ count: this.state.count + 2 })
    });
    this.setState({ count: this.state.count + 2 });
  }
  desc = () => {
    historyState.push({
      undoAction: () => this.setState({ count: this.state.count + 1 }),
      redoAction: () => this.setState({ count: this.state.count - 1 })
    });
    this.setState({ count: this.state.count - 1 });
  }
  undo = () => {
    historyState.present.undoAction();
    historyState.undo();
  }
  redo = () => {
    historyState.redo();
    historyState.present.redoAction();
  }
}
