import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form } from 'formsy-react';

import Input from '../components/form/Input';
import FormError from '../components/form/FormError';

import { editUser } from '../actions';
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
    this.props.editUser(f).then( () => {
      if (!this.props.profileEdit.editProfileError) {
        this.refs.form.reset();
      }
      this.setState({
        editError: this.props.profileEdit.editProfileError ? 
          'Profileditierung fehlgeschlagen' : '',
        editSuccess: !this.props.profileEdit.editProfileError ? 
          'Profileditierung erfolgreich' : ''
      });
    });
  }

  render() {
    return (
      <div className="editProfile">
        <div className="row">
          <Form onValidSubmit={this.handleSubmit} ref="form">
            <Input name="firstname" type="text" 
                className="col s12"
                label="Vorname"
                placeholder=""
                validations="minLength:2" 
                validationErrors={{
                  minLength: 'Mindestens 2 Zeichen'
                }}
                required />
            <Input name="lastname" type="text"
                className="col s12"
                label="Nachname"
                placeholder=""
                validations="minLength:2" 
                validationErrors={{
                  minLength: 'Mindestens 2 Zeichen'
                }}
                required />
            <Input name="email" type="email"
                className="col s12"
                label="Email"
                placeholder=""
                validations="isEmail"
                validationErrors={{
                  isEmail: 'Valide Email-Adresse benötigt'
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
  editUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadPage);

