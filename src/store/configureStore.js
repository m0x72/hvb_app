import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
//import DevTools from '../containers/DevTools.js';

// Cant use browserHistory on server
//import createHistory from 'history/lib/createBrowserHistory';
import createHistory from 'history/lib/createHashHistory';

//import routes from '../routes.js';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/rootReducer.js';
import callAPI from '../middleware/callAPI';
const middlewares = [callAPI, thunk];

const finalCreateStore = compose(
  applyMiddleware(...middlewares),
  reduxReactRouter({ /*routes,*/ createHistory }),
  applyMiddleware(createLogger())
  //DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  // hot module replacement for reducers (webpack) @DEV
  if (module.hot) {
    module.hot.accept('../reducers/rootReducer.js', () => {
      const nextRootReducer = require('../reducers/rootReducer.js');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
