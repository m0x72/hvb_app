import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form } from 'formsy-react';

import File from '../components/form/File';
import FormError from '../components/form/FormError';

import { editUserImage } from '../actions';
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
    this.props.editUserImage(f).then( () => {
      if (!this.props.profileEdit.editPasswordError) {
        this.refs.form.reset();
      }
      this.setState({
        editError: this.props.profileEdit.editPasswordError ? 
          'Profilbildänderung fehlgeschlagen' : '',
        editSuccess: !this.props.profileEdit.editPasswordError ? 
          'Profilbildänderung erfolgreich' : ''
      });
    });
  }

  render() {
    return (
      <div className="editProfileImage">
        <div className="row">
          <Form onValidSubmit={this.handleSubmit} ref="form">
            <File name="image" className="col s12"
                label="Profilbild"
                placeholder="Wählen Sie Ihr Bild aus" 
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
  editUserImage
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadPage);

