import React from 'react';
export default class Page1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentWillMount() {
  }
  componentDidMount() {
  }
  render() {
    console.log('this.props', this.props);
    return (
      <div>page1</div>
    );
  }
}
