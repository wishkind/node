
// store.js
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Providor from 'redux';
import {combineReducers} from 'redux-immutable';
import {connect} from 'react-redux';
import {reducer} from './reducer';
export  const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
