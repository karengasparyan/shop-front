import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducers from './store/reducers';
import watchers from './store/sagas';

import './assets/styles/bootstrap.min.css';
import './assets/styles/elegant-icons.css';
import './assets/styles/font-awesome.min.css';
import './assets/styles/nice-select.css';
import './assets/styles/slicknav.min.css';
import './assets/styles/themify-icons.css';
import './assets/styles/style.scss';
import 'react-toastify/dist/ReactToastify.css';

import './components/Header/header.scss';
import './assets/styles/rcSlider.scss';
import './assets/styles/toastyfy.scss';
import './assets/styles/react-tabs.css';
import './assets/styles/custom.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const saga = createSagaMiddleware();
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk, saga)));
saga.run(watchers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
