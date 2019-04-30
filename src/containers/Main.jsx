import React from 'react';
import styles from './Main.less';
import Graph from 'components/graph/Graph';
export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
  }
  componentDidMount() {
    if (this.Graph) {
      this.Graph.on('click', 'node', function (e) {
        console.log('node', e.target)
      });
      this.Graph.on('click', 'edge', function(e) {
        console.log('edge', e.target);
      })
    }
  }
  render() {
    const options = {
      containerId: 'cy-graph'
    };
    return (
      <div>
        <Graph ref={el => this.Graph = el} options={options} className={styles.graph} />
        <button onClick={this.addElements}>添加节点</button>
        <button onClick={this.reset}>reset</button>
        <button onClick={this.transform}>transform</button>
      </div>
    );
  }
  addElements = () => {
    let elements = [
      {
        data: {
          id: '1'
        }
      },
      {
        data: {
          id: '2'
        }
      }
    ]
    this.Graph.add(elements);
  }
  reset = () => {
    this.Graph.reset();
  }
}
