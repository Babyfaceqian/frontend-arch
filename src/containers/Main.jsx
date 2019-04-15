import React from 'react';
import styles from './Main.less';
import { fabric } from 'fabric';
export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
  }
  componentDidMount() {
    this.draw();
  }
  render() {
    return (
      <canvas id="c" className={styles.main}>This is React Arch branch.</canvas>
    );
  }
  draw = () => {
    var canvas = new fabric.Canvas('c');

    // create a rectangle with angle=45
    var rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20,
      angle: 45
    });

    canvas.add(rect);
    rect.set({ left: 20, top: 50 });
    rect.animate('left', '+=100', { onChange: canvas.renderAll.bind(canvas), duration: 2000 });
  }
}
