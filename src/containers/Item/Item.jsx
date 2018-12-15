import React from 'react';
import styles from './Item.less';
import { DragSource } from 'react-dnd';
const itemSource = {
  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    console.log('beginDrag');
    return props.item;
  },
  endDrag(props, monitor, component) {
    // 判断是否drop在对应的target上
    if (!monitor.didDrop()) {
      return;
    }
    return props.handleDrop(props.item.id);
  }
}
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}
class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isDragging, connectDragSource, item } = this.props;
    let opacity = isDragging ? 0 : 1;
    return connectDragSource(
        <div className={styles.item} style={{ opacity }}>{item.name}</div>
    );
  }
}

export default DragSource('item', itemSource, collect)(Item);