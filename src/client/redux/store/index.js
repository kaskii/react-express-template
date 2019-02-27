import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware)
);

const store = createStore(rootReducer, {}, enhancer);

// run the saga
sagaMiddleware.run(rootSaga);

export default store;
