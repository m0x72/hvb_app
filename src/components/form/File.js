// Higher Order Component Formsy Input Field
import React, { Component } from 'react';
import { HOC  } from 'formsy-react';
import classNames from 'classnames';

import './Input.scss';

class File extends Component {
  
  render() {
    const errorClassName = classNames({
      'valid': !this.props.isPristine() && this.props.isValid(),
      'invalid': !this.props.isPristine() && (this.props.showRequired() || this.props.showError())
    });
    const errorMsg = this.props.showRequired() ? 'Erforderlich' : this.props.getErrorMessage();

    const files = this.props.getValue();
    const fileName = files ? files[0].name : '';

    return (
      <div className={this.props.className + ' input-field file-field'}>
        <div className="btn">
          <span>{this.props.label}</span>
          <input type="file" name={this.props.name}
              onChange={ e => this.props.setValue(e.currentTarget.files) } />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path" type="text"
              placeholder={this.props.placeholder}
              value={fileName} />
        </div>
        <div className={'error-field ' + errorClassName}>
          {errorMsg}
        </div>
      </div>
    );
  }
}

export default HOC(File);
