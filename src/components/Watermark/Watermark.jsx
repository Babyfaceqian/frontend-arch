import React from 'react';
import html2canvas from 'html2canvas';
import _ from 'lodash';
import styles from './Watermark.less';
class Watermark extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { id, style, number } = this.props;
    let container = document.getElementById(id);
    let item = [];
    let styleStr = '';
    if (style && typeof style === 'object') {
      Object.keys(style).forEach(key => {
        styleStr += `${_.kebabCase(key)}:${style[key]};`
      });
    } else {
      styleStr = style;
    }
    for (let i = 0; i < number; i++) {
      item[i] = `<span class=${styles.item} style=${styleStr}>张麦扣</span>`;
    }
    container.innerHTML = `${item.join(' ')}`;
    html2canvas(container).then(canvas => {
      container.replaceWith(canvas);
    });
  }
  render() {
    const { id } = this.props;
    return (
      <div id={id} className={styles.watermark}>

      </div>
    );
  }
}
Watermark.defaultProps = {
  number: 100
}
export default Watermark;