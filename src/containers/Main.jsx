import React from 'react';
import styles from './Main.less';
import Item from './Item/Item';
import Target from './Target/Target';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [
        {
          id: 1,
          name: 'item1'
        },
        {
          id: 2,
          name: 'item2'
        },
        {
          id: 3,
          name: 'item3'
        }
      ]
    };
  }
  componentWillMount() {
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.itemWrapper}>
          {this.state.item.map((it) => {
            return <Item item={it} handleDrop={this.deleteItem} />;
          })}
        </div>

        <Target />
      </div>
    );
  }
  deleteItem = (id) => {
    let newItem = this.state.item.filter((it) => {
      return it.id !== id;
    });
    this.setState({ item: newItem });
  }
}

export default DragDropContext(HTML5Backend)(Main);
