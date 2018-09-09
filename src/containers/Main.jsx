import React from 'react';
import styles from './Main.less';
import Detail from './Detail/Detail';
import { ThemeContext, THEMES } from './context';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: THEMES.light
        }
    }
    changeTheme = () => {
        this.setState(state => ({
            theme:
                state.theme === THEMES.dark
                    ? THEMES.light
                    : THEMES.dark,
        }));
    }
    render() {
        return (
            <ThemeContext.Provider value={this.state.theme}>
                <div className={styles.main}>
                    <Detail />
                    <button onClick={this.changeTheme}>Change Theme</button>
                </div>
            </ThemeContext.Provider>
        )
    };
}