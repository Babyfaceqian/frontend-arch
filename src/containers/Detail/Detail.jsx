import React from 'react';
import styles from './Detail.less';
import { ThemeContext } from '../context';

export default class Detail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // you can also use High Order Component to wrap this component in the render props in Consumer.
        return (
            <ThemeContext.Consumer>
                {
                    theme => {
                        return <div className={styles.detail} style={theme}>
                            This is Detail.
                        </div>
                    }
                }
            </ThemeContext.Consumer>
        );
    }
}