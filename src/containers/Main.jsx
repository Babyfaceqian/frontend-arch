import React from 'react';
import styles from './Main.less';
import Relation from '../components/relation/Relation';
let data = [{
  name: 'IMEI',
  list: [{
    value: '1231231',
    weight: 9,
    key: '111'
  }, {
    value: '1231231212312',
    weight: 5,
    key: '222'
  }, {
    value: '1231231',
    weight: 5,
    key: '333'
  },{
    value: '1231231',
    weight: 9,
    key: '444'
  }, {
    value: '1231231212312',
    weight: 5,
    key: '555'
  }, {
    value: '1231231',
    weight: 5,
    key: '666'
  },{
    value: '1231231',
    weight: 9,
    key: '777'
  }, {
    value: '1231231212312',
    weight: 5,
    key: '888'
  }, {
    value: '1231231',
    weight: 5,
    key: '999'
  }, {
    value: '1231231212312',
    weight: 5,
    key: '1111'
  }, {
    value: '1231231',
    weight: 5,
    key: '2222'
  }]
}, {
  name: 'MAC',
  list: [{
    value: '1231231',
    weight: 2,
    key: '111'
  }, {
    value: '1231231',
    weight: 5,
    key: '222'
  }, {
    value: '1231231',
    weight: 1,
    key: '333'
  }]
}, {
  name: 'IMSI',
  list: [{
    value: '1231231',
    weight: 5,
    key: '111'
  }, {
    value: '1231231',
    weight: 5,
    key: '222'
  }, {
    value: '1231231',
    weight: 20,
    key: '222'
  }, {
    value: '12312311213',
    weight: 20,
    key: '222'
  }, {
    value: '12312311213',
    weight: 20,
    key: '777'
  }]
}];
export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
  }
  componentDidMount() {
  }
  render() {
    let options = {
      renderItem: (item) => {
        let val = item.value;
        if (val.length > 7) {
          val = val.substr(0, 7) + '***';
        };
        return val;
      },
      renderTooltip: (item) => {
        return (
          `<p>${item.value}</p>
            <p>使用${item.weight}次</p>`
        )
      }
    }
    return (
      <div className={styles.main}><Relation data={data} options={options} /></div>
    );
  }
}
