import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//import { Router, Route, IndexRoute, BrowserRouter } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import LoginForm from './components/login_form';
import SignupForm from './components/signup_form';
import mainPage from './components/main';
import 'semantic-ui-css/semantic.min.css';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, ReduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/index" component={mainPage} />
          <Route path="/signup" component={SignupForm} />
          <Route path="/" component={LoginForm} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
