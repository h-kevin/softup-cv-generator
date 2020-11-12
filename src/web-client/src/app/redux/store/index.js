import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

let store = null;

const configureStoreProd = (initialState) => {
  const middlewares = [thunk];

  store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares)),
  );

  return store;
};

const configureStoreDev = (initialState) => {
  const middlewares = [thunk];

  const composeEnhancers = (typeof window !== 'undefined' 
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    || compose;

  store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  return store;
};

const configureStore = process.env.NODE_ENV === 'production'
  ? configureStoreProd
  : configureStoreDev;

export const getStore = () => store;
export default configureStore;
