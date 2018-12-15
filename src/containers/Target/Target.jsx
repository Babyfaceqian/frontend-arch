import React from 'react';
import styles from './Target.less';

import { DropTarget } from 'react-dnd';
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem()
  }
}
class Target extends React.Component {

  render() {
    const { connectDropTarget, hovered, item } = this.props;
    let backgroundColor = hovered ? 'lightGreen' : 'white';
    return connectDropTarget(
      <div className={styles.target} style={{ backgroundColor }}>
        Target
      </div>
    );
  }
}

export default DropTarget('item', {}, collect)(Target);