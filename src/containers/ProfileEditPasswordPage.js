import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form } from 'formsy-react';

import Input from '../components/form/Input';
import FormError from '../components/form/FormError';

import { editUserPassword } from '../actions';
import { synthFormDataFromModel } from '../helpers/Form';

class UploadPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      editError: ''
    };
  }

  handleSubmit(model, resetForm, invalidateForm) {
    const f = synthFormDataFromModel(model);
    this.props.editUserPassword(f).then( () => {
      if (!this.props.profileEdit.editPasswordError) {
        this.refs.form.reset();
      }
      this.setState({
        editError: this.props.profileEdit.editPasswordError ? 
          'Passwortänderung fehlgeschlagen' : '',
        editSuccess: !this.props.profileEdit.editPasswordError ? 
          'Passwortänderung erfolgreich' : ''
      });
    });
  }

  mapForm(model) {
    let m = {...model};
    delete m.password_repeat;
    return m;
  }

  render() {
    return (
      <div className="editProfilePassword" mapping={this.mapForm}>
        <div className="row">
          <Form onValidSubmit={this.handleSubmit} ref="form">
            <Input name="old_password" type="password" 
                className="col s12"
                label="Bisheriges Passwort"
                placeholder=""
                validations="minLength:2" 
                validationErrors={{
                  minLength: 'Mindestens 2 Zeichen'
                }}
                required />            
            <Input name="password" type="password" 
                className="col s12"
                label="Passwort"
                placeholder=""
                validations="minLength:2" 
                validationErrors={{
                  minLength: 'Mindestens 2 Zeichen'
                }}
                required />
            <Input name="password_repeat" type="password"
                className="col s12"
                label="Passwort Wiederholung"
                placeholder=""
                validations="minLength:2,equalsField:password" 
                validationErrors={{
                  minLength: 'Mindestens 2 Zeichen',
                  equalsField: 'Wiederholung stimmt nicht überein'
                }}
                required />
            { /* Submit button */}
            <div className="col s12 right-align">
              <button type="submit" className="btn">
                Ändern
              </button>
            </div>
            <div className="col s12 right-align">
              <FormError error={this.state.editError}
                  success={this.state.editSuccess} />
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

UploadPage.propTypes = {
};

function mapStateToProps(state) {
  return {
    profileEdit: state.user.profileEdit
  };
}

var mapDispatchToProps = {
  editUserPassword
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadPage);

