import React from 'react';
import {render} from 'react-dom';
import GoogleAnalytics from 'react-ga';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import httpHelper from 'helpers/http';
import App from 'containers/App';
import rootSaga from 'sagas';
import configureStore from 'store/configureStore';
import config from 'config';

const dest = document.getElementById('content');
const store = configureStore(window.__data); // eslint-disable-line
httpHelper.setStore(store);

GoogleAnalytics.initialize(config.app.googleAnalytics.appId);

store.runSaga(rootSaga);

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  dest,
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
}
