import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import { Form } from 'formsy-react';

import { synthFormDataFromModel } from '../helpers/Form';
import Input from '../components/form/Input';
import FormError from '../components/form/FormError';
import { registerUser } from '../actions';

import './LoginPage.scss';
import './RegisterPage.scss';


class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      registerError: ''
    };
  }

  handleSubmit(model, resetForm, invalidateForm) {
    const f = synthFormDataFromModel(model);
    this.props.registerUser(f).then( v => {
      if (!this.props.register.registerError) {
        this.refs.form.reset();
      }
      this.setState({
        registerError: this.props.register.registerError ?
          'Registration unsuccessfull' : '',
        registerSuccess: !this.props.register.registerError ?
          'Registration successfull' : ''
      });
    });
  }

  mapForm(model) {
    let m = {...model};
    // to be enabled, once api doesnt require password_conf param
    //delete m.password_confirmation;
    return m;
  }

  render() {
    return (
      <div className="registerPage outside">
        <div className="background"></div>
        <div className="">
          <h3 className="headline center-align">Sign up</h3>
          <Form className="" 
              onValidSubmit={this.handleSubmit} 
              model={this.mapForm}
              ref="form">
            <div className="inputItem">
              <Input name="firstname" type="text"
                  className="col s12"
                  label="Firstname"
                  validations="minLength:2"
                  validationErrors={{
                    minLength: 'Mindestens 2 Zeichen'
                  }}
                  required />
            </div>
            <div className="inputItem">
              <Input name="lastname" type="text"
                  className="col s12"
                  label="Lastname"
                  validations="minLength:2"
                  validationErrors={{
                    minLength: 'Mindestens 2 Zeichen'
                  }}
                  required />
            </div>
            <div className="inputItem">
              <Input name="email" type="email"
                  className="col s12"
                  label="Email"
                  validations="isEmail"
                  validationErrors={{
                    isEmail: 'Valide Emailaddresse benötigt'
                  }}
                  required />
            </div>
            <div className="inputItem">
              <Input name="password" type="password"
                  className="col s12"
                  label="Password"
                  validations="minLength:6"
                  validationErrors={{
                    minLength: 'Mindestens 6 Zeichen'
                  }}
                  required />
            </div>
            <div className="inputItem">
              <Input name="password_confirmation" type="password"
                  className="col s12"
                  label="Password"
                  validations="minLength:6,equalsField:password"
                  validationErrors={{
                    minLength: 'Mindestens 6 Zeichen',
                    equalsField: 'Wiederholung stimmt nicht überein'
                  }}
                  required />
            </div>
            <div className="col s12 right-align">
              <button type="submit" className="btn">
                Sign up
              </button>
            </div>
            <div className="col s12 right-align">
              <FormError error={this.state.registerError} 
                  success={this.state.registerSuccess} />
            </div>
            <div className="navBack">
              <IndexLink to="/">Back to login</IndexLink>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  // react-redux
};

function mapStateToProps(state) {
  return {
    register: state.user.register
  };
}

var mapDispatchToProps = {
  registerUser
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
