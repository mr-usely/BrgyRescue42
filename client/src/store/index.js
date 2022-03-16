import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducer';
import middleware from './middleware';
import api from 'server';

// ==============================|| REDUX - MAIN STORE ||============================== //
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware.map((fun) => fun(api)))));

export { store };
