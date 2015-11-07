import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import { pushState } from 'redux-router';

import { fetchLogin } from '../actions';
import FormError from '../components/form/FormError';

import './LoginPage.scss';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.state = {
      loginError: ''
    };
  }

  login(e) {
    e.preventDefault();
    const email = this.refs.email.value.trim();
    const pw = this.refs.password.value;
    this.props.fetchLogin(email, pw)
      .then(() => {
        if (this.props.auth.loginError) {
          this.setState({
            loginError: this.props.auth.loginError ? 
              'Login fehlgeschlagen' : ''
          });
        } else  {
          this.props.pushState(null, '/home');
        }
      });
  }

  render() {
    let loadingStyle = {
      display: 'none'
    };
    if (this.props.auth.isFetching) loadingStyle.display = 'block';
    return (
      <div className="login valign-wrapper">
        <div className="row valign">
          <div className="col s12">
            <h3 className="center-align">tinvest</h3>
          </div>
          <form className="col s8 offset-s2" 
                onSubmit={this.login}>
            <div className="row">
              <div className="input-field col s12">
                <input id="email" type="email" ref="email"
                  className="validate" placeholder="" />
                <label htmlFor="email" className="active">
                  Email
                </label>
              </div>
              <div className="input-field col s12">
                <input id="password" type="password" ref="password"
                  className="validate" placeholder="" />
                <label htmlFor="password" className="active">
                  Password
                </label>
              </div>
              <div className="col s12 right-align">
                <button type="submit"
                  className="btn waves-effect waves-light">
                  Sign In
                </button>
              </div>
              <div className="col s12 right-align">
                <FormError error={this.state.loginError} />
              </div>
            </div>
          </form>
          <div className="col s8 offset-s2">
            <h6>Don't have an account?</h6>
            <Link to="/register">Sign up</Link>
          </div>
       </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  // react-redux
  auth: PropTypes.object.isRequired,
  fetchLogin: PropTypes.func.isRequired,
  // redux-router
  pushState: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

var mapDispatchToProps = {
  fetchLogin,
  pushState
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
