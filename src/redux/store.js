import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sageMiddleware = createSagaMiddleware();

// const middlewares = [thunk];
const middlewares = [sageMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sageMiddleware.run(rootSaga);

export const persistor = persistStore(store);

const exportedObject = {
  store,
  persistor,
};

export default exportedObject;
