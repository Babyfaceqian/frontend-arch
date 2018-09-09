import React from 'react';
const THEMES = {
    light: {
        backgroundColor: '#EEE',
        color: '#111'
    },
    dark: {
        backgroundColor: '#111',
        color: '#EEE'
    }
};
const ThemeContext = React.createContext(THEMES.light);
export {
    ThemeContext,
    THEMES
}