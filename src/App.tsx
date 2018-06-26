import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import sagas from './actions/sagas';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import Router from './router';

declare const global: any;
if (__DEV__) {
  global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
  global.FormData = global.originalFormData || global.FormData;
  global.Blob = global.originalBlob || global.Blob;
  global.FileReader = global.originalFileReader || global.FileReader;
  
  fetch; // Ensure to get the lazy property

  // RNDebugger only
  if ((window as any).__FETCH_SUPPORT__) {
    (window as any).__FETCH_SUPPORT__.blob = false
  }
}

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