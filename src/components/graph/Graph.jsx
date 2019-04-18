import React from 'react';
import styles from './Graph.less';
import { fabric } from 'fabric';
class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: []
    }
  }
  componentWillMount() {
  }
  componentDidMount() {
    this.init();
  }
  init = () => {
    this.height = document.getElementById('wrapper').offsetHeight;
    this.width = document.getElementById('wrapper').offsetWidth;
    this.canvas = new fabric.Canvas('canvas');
    this.canvas.setHeight(this.height);
    this.canvas.setWidth(this.width);
    let nodes = this.convertToNodes(this.props.nodes);
    this.setState({ nodes });
    console.log('this.canvas', this.canvas);
  }
  componentDidUpdate() {
    this.draw();
  }
  render() {
    return (
      <div className={styles.graph} id='wrapper'>
        <canvas id="canvas">This is React Arch branch.</canvas>
      </div>
    );
  }
  convertToNode = (node) => {
    let circle = new fabric.Circle({
      radius: 20, fill: 'green', left: Math.random() * 1000, top: Math.random() * 1000
    });
    return circle;
  }
  convertToNodes = (nodes) => {
    let circles = nodes.map(node => {
      return this.convertToNode(node);
    });
    return circles;
  }
  draw = () => {
    console.log('----------draw------------');
    // node
    this.state.nodes.forEach(node => {
      this.canvas.add(node);
    })
    // circle.set({ left: 20, top: 50 });
    // circle.animate('left', '+=100', { onChange: canvas.renderAll.bind(canvas), duration: 200 });
  }
}
Graph.defaultProps = {
  nodes: [
    {
      id: 1
    },
    {
      id: 2
    },
    {
      id: 3
    },
    {
      id: 4
    },
    {
      id: 5
    },
    {
      id: 6
    }
  ]
}
export default Graph;