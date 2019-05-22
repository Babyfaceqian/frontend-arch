import React from 'react';
import Vis from './vis';
import styles from './Relation.less'
import _ from 'lodash';
class Relation extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { options, data } = this.props;
    this.Graph = new Vis({ container: document.getElementById(this.props.id) }, options);
    this.Graph.setData(data);
  }
  componentWillReceiveProps(nextProps) {
    if(!_.isEqual(this.props.data, nextProps.data)) {
      this.Graph.setData(data);
    }
  }
  render() {
    const { id, className } = this.props;
    return (
      <div id={id} className={className}>
      </div>
    );
  }
}
Relation.defaultProps = {
  id: 'relation',
  className: styles.container
}
export default Relation;