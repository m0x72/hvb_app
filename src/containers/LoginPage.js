import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import { pushState } from 'redux-router';

import { fetchLogin } from '../actions';
import FormError from '../components/form/FormError';
import { Form } from 'formsy-react';
import Input from '../components/form/Input';

import './LoginPage.scss';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.state = {
      loginError: ''
    };
  }

  login(model, resetForm, invalidateForm) {
    const email = model.email.trim();
    const pw = model.password;
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
      <div className="login outside">
        <div className="background"></div>
        <div className="">
          <div className="center-align logo"></div>
          <h4 className="started center-align">Get started!</h4>
          <Form className="" 
                onValidSubmit={this.login}>
            <div className="inputItem">
              <Input className=""
                name="email" type="email" 
                label="Email" 
                required
                validations="isEmail"
                valdiationErrors={{
                  isEmail: 'Must be valid email'
                }}/>
            </div>
            <div className="inputItem">
              <Input className=""
                name="password" type="password" 
                label="Password" 
                required />
            </div>
              <div className="">
                <button type="submit"
                  className="btn">
                  Sign In
                </button>
              </div>
              <div className="right-align">
                <FormError error={this.state.loginError} />
              </div>
          </Form>
          <div className="register center-align">
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
