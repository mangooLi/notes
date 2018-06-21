import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import sagas from './actions/sagas';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import Router from './router';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas);


interface Props { };
export default class App extends React.Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}