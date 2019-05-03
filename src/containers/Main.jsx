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
    this.Graph = new Graph(document.getElementById('graph'));
    this.zr = this.Graph.zr;
    this.zr.on('click', function (e) {
      console.log('click', e)
    })
  }
  render() {
    return (
      <div className={styles.main}>
        <div id="graph" className={styles.graph}></div>
        <button onClick={this.addNodes}>Add nodes</button>
        <button onClick={this.getNodes}>Get nodes</button>
        <button onClick={this.getSelectedNodes}>Get selected nodes</button>
        <button onClick={this.setSelectedNodes}>Set selected nodes</button>
        <button onClick={this.clearSelectedNodes}>Clear selected nodes</button>
        <button onClick={this.setHighlightedNodes}>Set highlighted nodes</button>
        <button onClick={this.clearHighlightedNodes}>Clear highlighted nodes</button>
        <button onClick={this.addLinks}>Add links</button>
        <button onClick={this.getLinks}>Get links</button>
        <button onClick={this.setSelectedLinks}>Set selected links</button>
        <button onClick={this.clearSelectedLinks}>Clear selected links</button>
      </div>
    );
  }
  addNodes = () => {
    this.Graph.addNodes([
      {
        id: '101001_1',
        data: {
          value: 1
        },
        pattern: 0,
      },
      {
        id: '101001_2',
        data: {
          value: 1
        },
        pattern: 0,
      },
    ])
  }
  getNodes = () => {
    console.log('nodes', this.Graph.getNodes());
  }
  getSelectedNodes = () => {
    console.log('nodes', this.Graph.selectedNodes);
  }
  setSelectedNodes = () => {
    this.Graph.setSelectedNodes(this.Graph.getNodes())
  }
  clearSelectedNodes = () => {
    this.Graph.clearSelectedNodes();
  }
  setHighlightedNodes = () => {
    this.Graph.setHighlightedNodes(this.Graph.getNodes());
  }
  clearHighlightedNodes = () => {
    this.Graph.clearHighlightedNodes();
  }
  addLinks = () => {
    this.Graph.addLinks([
      {
        id: '101001_1_relationType_101001_2',
        source: '101001_1',
        target: '101001_2'
      }
    ])
  }
  getLinks = () => {
    console.log('links', this.Graph.getLinks());
  }
  setSelectedLinks = () => {
    this.Graph.setSelectedLinks(this.Graph.getLinks());
  }
  clearSelectedLinks = () => {
    this.Graph.clearSelectedLinks();
  }
}
