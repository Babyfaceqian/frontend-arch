import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../containers/Main';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

ReactDOM.render(<ErrorBoundary><Main /></ErrorBoundary>, document.getElementById('root'));
