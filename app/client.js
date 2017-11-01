import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import createRoutes from './auth/routes';
import reducer from './admin/reducers';
import browserHistory from './history';

require('./globals.scss');


// create store with thunk middleware
const middleware = applyMiddleware(logger, thunk, routerMiddleware(browserHistory));
const store = createStore(reducer, middleware);

// create enhanced history that syncs navigation events with store
// const history = syncHistoryWithStore(browserHistory, store);

// create routes with store and enhanced history
const routes = createRoutes(store, browserHistory);

// render the routes
ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('app'),
); 




/*import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './auth/components/App';

require('./globals.scss');

// render the routes
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app'),
);*/
