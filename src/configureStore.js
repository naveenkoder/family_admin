import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/reducers";
// Dev tools
// import { composeWithDevTools } from "redux-devtools-extension";
import { composeWithDevTools } from 'remote-redux-devtools';

import createSagaMiddleware from "redux-saga";
import rootSaga from "./store/saga/index";
const sagaMiddleware = createSagaMiddleware();

export const configureStore = () => {

  const composeEnhancers = composeWithDevTools({
    // Specify custom devTools options
  });
  const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(sagaMiddleware),
  ));
  sagaMiddleware.run(rootSaga);
  return store;
}
