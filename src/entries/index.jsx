import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createHashHistory } from 'history';
import Main from '../containers/Main';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import Page1 from '../containers/page1';
import Page2 from '../containers/page2';
import Nav from '../containers/nav';
let history = createHashHistory();
let route = <Router history={history}>
  <Nav />
  <Switch>
    <Route path='/' exact component={Main}></Route>
    <Route path='/page1' component={Page1}></Route>
    <Route path='/page2' component={Page2}></Route>
    <Redirect to='/'></Redirect>
  </Switch>
</Router>
ReactDOM.render(route, document.getElementById('root'));
