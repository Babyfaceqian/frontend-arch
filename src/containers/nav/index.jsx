import React from 'react';
import { withRouter } from 'react-router';
class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentWillMount() {
  }
  componentDidMount() {
  }
  render() {
    console.log('nav', this.props);
    return (
      <div>Nav
      </div>
    );
  }
}
export default withRouter(Nav);