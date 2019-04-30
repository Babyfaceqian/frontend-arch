import React, { Component } from 'react';
import styles from './Graph.less';
import chart from './lib/cytoscape';
class Graph extends Component {

  componentDidMount() {
    this.chart = chart(this.props.options);
  }
  render() {
    const { options, className } = this.props;
    let cls = className ? className : styles.graph;
    return (
      <div id={options.containerId} className={className} >

      </div>
    );
  }
  add = (eles) => {
    if (this.chart) {
      this.chart.add(eles).animate({
        position: { x: 100, y: 100 },
        style: { backgroundColor: 'red' },
        easing: 'ease'
      }, {
        duration: 1000
      });
    }
  }
  remove = (eles) => {
    if (this.chart) {
      this.chart.remove(eles);
    }
  }
  on = (e, sel, cb) => {
    if (this.chart) {
      this.chart.on(e, sel, cb)
    }
  }
  reset = () => {
    if (this.chart) {
      this.chart.reset();
    }
  }
}

export default Graph;