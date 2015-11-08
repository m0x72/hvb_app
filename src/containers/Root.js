import React, { Component, PropTypes} from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
//import DevTools from './DevTools.js';

//import Routes from '../routes.js';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import App from './App.js';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import HomePage from './HomePage';
import SettingsPage from './SettingsPage';
import DashboardPage from './DashboardPage';
import InvestPage from './InvestPage';
import InvestItemPage from './InvestItemPage';
import InvestItemPredictionPage from './InvestItemPredictionPage';
import InvestStartPage from './InvestStartPage';
import InvestEndPage from './InvestEndPage';

import { receiveLoginSuccess } from '../actions';

export default class Root extends Component {

  constructor(props) {
    super(props);
    this.requireAuth = this.requireAuth.bind(this);
  }

  requireAuth(nextState, replaceState) {
    const auth = this.props.store.getState().auth;
    if (!auth.bearerToken) { 
      replaceState({ nextPathname: nextState.location.pathname }, '/'); 
      console.error('Not authenticated!');
    }
  }

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
          <ReduxRouter>

            <Route path="/" component={App}>
              <IndexRoute component={LoginPage} />
              <Route path="register" component={RegisterPage} />
              <Route path="home" component={HomePage}
              >
               { /*onEnter={this.requireAuth} */ }
                <Route path="settings" component={SettingsPage} />
                <Route path="dashboard" component={DashboardPage} />
                <Route path="invest" component={InvestPage}>
                  <Route path="end" component={InvestEndPage} />
                  <Route path=":id/prediction" component={InvestItemPredictionPage} />
                  <Route path=":id" component={InvestItemPage} />
                  <IndexRoute component={InvestStartPage} />
                </Route>
                
                <IndexRedirect to="/home/dashboard" />

              </Route>
            </Route>

          </ReduxRouter>
          {/*<DevTools />*/}
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};

//<Route path="/" component={App} />
