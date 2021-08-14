import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk-fsa';
import rootReducer from './root-reducer';

const middleWares = [logger, promiseMiddleware, thunkMiddleware];
const store = createStore(rootReducer, applyMiddleware(...middleWares));

export type StoreTypes = ReturnType<typeof rootReducer>;

export default store;