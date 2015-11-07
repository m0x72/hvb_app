import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form } from 'formsy-react';

import Input from '../components/form/Input';
import Textarea from '../components/form/Textarea';
import RadioGroup from '../components/form/RadioGroup';
import File from '../components/form/File';
import FormError from '../components/form/FormError';

import { uploadVideo } from '../actions';
import { synthFormDataFromModel } from '../helpers/Form';

import './UploadPage.scss';

class UploadPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      uploadError: '',
      uploadSuccess: ''
    };
  }

  handleSubmit(model, resetForm, invalidateForm) {
    const f = synthFormDataFromModel(model);
    this.props.uploadVideo(f).then( () => {
      console.log('prooomise');
      if (!this.props.videoUpload.uploadError) {
        this.refs.form.reset();
        // dirty fix for FILE-upload @TODO in File component!
        // (wrap in file in form and reset only that form)
        document.querySelector('form').reset();
      }
      this.setState({
        uploadError: this.props.videoUpload.uploadError ? 
          'Videoupload fehlgeschlagen' : '',
        uploadSuccess: !this.props.videoUpload.uploadError ?
          'Videoupload erfolgreich': ''
      });
    });
  }

  mapForm(model) {
    if (model['tags[]']) {
      return {
        ...model,
        'tags[]': model['tags[]'].split(',')
                    .map( e => e.trim() )
                    .filter( e => e !== '' )
      };
    } else {
      return {
        ...model
      };
    }
  }

  render() {
    return (
      <div className="row upload">
        <Form onValidSubmit={this.handleSubmit} 
            mapping={this.mapForm} ref="form">
          <Input name="title" type="text" 
              className="col s12"
              label="Titel"
              placeholder="Titel des Videobeitrags"
              validations="minLength:5" 
              validationErrors={{
                minLength: 'Mindestens 5 Zeichen'
              }}
              required />
          <Textarea name="description" type="text"
              className="col s12"
              label="Beschreibung"
              placeholder="Beschreiben Sie den Inhalt..." />
              {/*validations="minLength:10" 
              validationErrors={{
                minLength: 'Mindestens 10 Zeichen'
              }}
              required */} 
          <RadioGroup name="category_id"
              className="col s12 categories"
              label="Kategorie"
              options={[
                { value: 1, label: 'Lokales' },
                { value: 2, label: 'Abenteuer' },
                { value: 3, label: 'Events' }
              ]} 
              required />
          <Input name="tags[]" type="text"
              className="col s12"
              label="Tags"
              placeholder="z.B. Schnee, Kinder, Schlitten"
              validations="minLength:3" 
              validationErrors={{
                minLength: 'Mindestens 3 Zeichen'
              }}
              required />
          <File name="video" className="col s12"
              label="Video"
              placeholder="Wählen Sie Ihr Video aus" 
              required />
          { /* Submit button */}
          <div className="col s12 right-align">
            <button type="submit" className="btn">
              Upload</button>
          </div>
          <div className="col s12 right-align">
            <FormError 
                error={this.state.uploadError}
                success={this.state.uploadSuccess} />
          </div>
        </Form>
      </div>
    );
  }
}

UploadPage.propTypes = {
};

function mapStateToProps(state) {
  return {
    videoUpload: state.video.videoUpload
  };
}

var mapDispatchToProps = {
  uploadVideo
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadPage);

