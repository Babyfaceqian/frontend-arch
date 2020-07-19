import React from 'react';
import Context from './context';
const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
  class Connect extends React.Component {
    static contextType = Context;
    constructor() {
      super();
      this.state = {};
    }
    componentWillMount() {
      this.setState(mapStateToProps(this.context.store.getState()))
      this.unsubscribe = this.context.store.subscribe(() => {
        this.setState(mapStateToProps(this.context.store.getState()))
      })
    }
    componentWillUnmount() {
      this.unsubscribe();
    }
    render() {
      console.log('state', this.state)
      return <WrappedComponent {...this.state} {...mapDispatchToProps(this.context.store.dispatch)} />
    }
  }
  return Connect;
}

export default connect;