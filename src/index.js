import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './theme.css';
// import './index.css';
import App from './App';
import {createStore, applyMiddleware, combineReducers} from 'redux';
// import user from './modules/user';
import user from './modules/login_mod.js';
// import memos from './modules/memos.js';
import events from './modules/events_mod.js';
import {Provider} from 'react-redux';
import logger from 'redux-logger';

const asyncMiddleware = storeAPI => next => action  => {
    if (typeof action === 'function')  {
        return action(storeAPI.dispatch, storeAPI.getState)
    }
    return next(action)
}

const middlewareEnhancer = applyMiddleware(asyncMiddleware, logger)
const rootReducer = combineReducers({user, events})
const store =  createStore(rootReducer, middlewareEnhancer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

