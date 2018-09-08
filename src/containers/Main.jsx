import React from 'react';
import Detail from './Detail/Detail';
import styles from './Main.less';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '你好',
            isShowDetail: true
        };
        console.log('main constructor');
    }
    componentWillMount() {
        console.log('main componentWillMount');
    }
    componentDidMount() {
        console.log('main componentDidMount');
    }
    componentWillReceiveProps() {
        console.log('main componentWillReceiveProps');
    }
    shouldComponentUpdate() {
        console.log('main shouldComponentUpdate');
        return true;
    }
    componentWillUpdate() {
        console.log('main componentWillUpdate');
    }
    componentDidUpdate() {
        console.log('main componentDidUpdate');
    }
    componentWillUnmount() {
        console.log('main componentWillUnmount');
    }
    changeText = () => {
        // 触发update
        this.setState({ text: '你好漂亮！' });
    }
    removeDetail = () => {
        // 触发unmount
        this.setState({ isShowDetail: false });
    }
    render() {
        console.log('main render');

        return (
            <div className={styles.main}>
                {this.state.isShowDetail && <Detail text={this.state.text} />}
                <button onClick={this.changeText}>Change Text</button>
                <button onClick={this.removeDetail}>Remove Detail</button>
            </div>
        );
    };
}