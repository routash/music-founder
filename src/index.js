import React from 'react';
import { render } from 'react-dom';
import { createStore,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import App from './components/App';
import rootReducer from './reducers';
import { Router } from 'react-router-dom';
import { history } from './helpers';

const store = createStore(rootReducer,applyMiddleware(thunk));

render(
  <Provider store={store}>
    <Router history={history}>
	     <App />
    </Router>
  </Provider>, document.getElementById('root')
);
