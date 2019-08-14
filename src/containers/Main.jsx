import React from 'react';
import styles from './Main.less';
import Graph from '../components/d3Comp';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      links: [],
      options: {
        size: 'small',
        onNodeClick: this.onNodeClick
      }
    };
  }
  componentWillMount() {
    this.Graph = React.createRef();
  }
  componentDidMount() {
    let nodes = new Array(20).fill({}).map((d, i) => {
      return {
        id: i,
        name: '节点' + i
      };
    });
    let links = new Array(10).fill({}).map((d, i) => {
      return {
        id: i,
        name: '名称' + i,
        sourceIndex: i,
        targetIndex: i + 1
      };
    });
    this.setState({ nodes, links });
    console.log('this.Graph', this.Graph)
    this.Graph.addNodes(nodes);
  }
  render() {
    const { nodes, links, options } = this.state;
    console.log('this.Graph', this.Graph)
    return (
      <div className={styles.main}>
        <div className={styles.graph}>
          <Graph ref={this.Graph} options={options}/>
        </div>
        <div className={styles.action}>
          <button onClick={() => this.changeSize('small')}>小节点</button>
          <button onClick={() => this.changeSize('medium')}>中节点</button>
          <button onClick={() => this.changeSize('large')}>大节点</button>
        </div>
      </div>
    );
  }
  changeSize = (size) => {
    this.setState({ options: { ...this.state.options, size } })
  }
  onNodeClick = (d) => {
    console.log('onNodeClick', d);
  }
}
