import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import reducer from './reducer';

const rootReducer = combineReducers({
  R:reducer
})


export default createStore(rootReducer, applyMiddleware(promiseMiddleware));