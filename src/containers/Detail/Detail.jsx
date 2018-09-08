import React from 'react';
import styles from './Detail.less';

export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        console.log('detail constructor');

    }
    componentWillMount() {
        console.log('detail componentWillMount');
    }
    componentDidMount() {
        console.log('detail componentDidMount');
    }
    componentWillReceiveProps() {
        console.log('detail componentWillReceiveProps');
    }
    shouldComponentUpdate() {
        console.log('detail shouldComponentUpdate');
        return true;
    }
    componentWillUpdate() {
        console.log('detail componentWillUpdate');
    }
    componentDidUpdate() {
        console.log('detail componentDidUpdate');
    }
    componentWillUnmount() {
        console.log('detail componentWillUnmount');
    }
    render() {
        console.log('detail render');
        return (
            <div className={styles.detail}>
                {this.props.text}
            </div>
        );
    }
}