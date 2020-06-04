import React from 'react';
import styles from './Toolbar.less';
class Toolbar extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div className={styles.toolbar}>
        {
          data.map((it, i) => {
            return this.renderGroup(it, i);
          })
        }
      </div>
    )
  }
  renderGroup = (it, i) => {
    let smallArr = [], mediumArr = [], largeArr = [];
    it.forEach(d => {
      if (d.type === 1) {
        smallArr.push(d);
      } else if (d.type === 2) {
        mediumArr.push(d);
      } else if (d.type === 3) {
        largeArr.push(d);
      }
    });
    let wrapCls = '';
    if (mediumArr.length === 0) {
      wrapCls = styles.wrap;
    }
    return <div key={i} className={styles.group}>
      <div className={styles.smallAndMediumWrapper}>
        <div className={styles.mediumWrapper}>
          {mediumArr.map((item, index) => this.renderItem(item, index))}
        </div>
        <div className={`${styles.smallWrapper} ${wrapCls}`}>
          {smallArr.map((item, index) => this.renderItem(item, index))}
        </div>
      </div>
      <div className={styles.largeWrapper}>
        {largeArr.map((item, index) => this.renderItem(item, index))}
      </div>
    </div>
  }
  renderItem = (item, index) => {
    let itemCls;
    switch (item.type) {
      case 1:
        itemCls = styles.small;
        break;
      case 2:
        itemCls = styles.medium;
        break;
      case 3:
        itemCls = styles.large;
        break;
      default:
        itemCls = styles.large;
    }
    return (
      <div key={index} className={`${styles.btn} ${itemCls}`}>
        {index}
      </div>
    )
  }
}

Toolbar.defaultProps = {
  data: [
    [
      {
        type: 1
      },
      {
        type: 1
      },
      {
        type: 1
      },
      {
        type: 1
      },
      {
        type: 2
      },
      {
        type: 2
      },

      {
        type: 3
      },

      {
        type: 3
      }
    ]
  ]
}
export default Toolbar;