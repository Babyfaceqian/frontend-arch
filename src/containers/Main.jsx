import React from 'react';
import styles from './Main.less';
import Graph from 'components/graph/Graph';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectMode: false
    }
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
        <div className={styles.actions}>
          <h3>node操作</h3>
          <button onClick={this.addNodes}>Add nodes</button>
          <button onClick={this.getNodes}>Get nodes</button>
          <button onClick={this.removeNodes}>Remove nodes</button>
          <button onClick={this.getSelectedNodes}>Get selected nodes</button>
          <button onClick={this.setSelectedNodes}>Set selected nodes</button>
          <button onClick={this.clearSelectedNodes}>Clear selected nodes</button>
          <button onClick={this.setHighlightedNodes}>Set highlighted nodes</button>
          <button onClick={this.clearHighlightedNodes}>Clear highlighted nodes</button>
          <h3>link操作</h3>
          <button onClick={this.addLinks}>Add links</button>
          <button onClick={this.getLinks}>Get links</button>
          <button onClick={this.removeLinks}>Remove links</button>
          <button onClick={this.setSelectedLinks}>Set selected links</button>
          <button onClick={this.clearSelectedLinks}>Clear selected links</button>
          <h3>画布布局操作</h3>
          <button onClick={this.resetTransform}>Reset transform</button>
          <button onClick={this.rectangleLayout}>Rectangle layout</button>
          <h3>画布设置操作</h3>
          <button onClick={this.changeSelectMode}>Change select mode</button>
        </div>
      </div>
    );
  }
  addNodes = () => {
    let nodes = [];
    for (let i = 0; i < 100; i++) {
      nodes.push({
        id: '101001_' + i,
        data: {
          value: 1
        },
        pattern: 0
      })
    }
    this.Graph.addNodes(nodes)
  }
  getNodes = () => {
    console.log('nodes', this.Graph.getNodes());
  }
  removeNodes = () => {
    this.Graph.removeNodes(this.Graph.selectedNodes);
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
  removeLinks = () => {
    this.Graph.removeLinks(this.Graph.getLinks())
  }
  setSelectedLinks = () => {
    this.Graph.setSelectedLinks(this.Graph.getLinks());
  }
  clearSelectedLinks = () => {
    this.Graph.clearSelectedLinks();
  }
  changeSelectMode = () => {
    this.Graph.changeOptions({
      selectMode: !this.state.selectMode
    });
    console.log('selectMode:', !this.state.selectMode)
    this.setState({ selectMode: !this.state.selectMode })
  }
  resetTransform = () => {
    this.Graph.resetTransform();
  }
  rectangleLayout = () => {
    this.Graph.rectangleLayout(this.Graph.getNodes());
  }
}
