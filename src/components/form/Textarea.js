// Higher Order Component Formsy Input Field
import React, { Component } from 'react';
import { HOC  } from 'formsy-react';
import classNames from 'classnames';

import './Textarea.scss';

class Textarea extends Component {
  
  render() {
    const inputClassName = classNames({
      'materialize-textarea': true,
      'active': true,
      'valid': !this.props.isPristine() && this.props.isValid(),
      'invalid': !this.props.isPristine() && (this.props.showRequired() || this.props.showError())
    });
    const errorMsg = this.props.showRequired() ? 'Erforderlich' : this.props.getErrorMessage();
    return (
      <div className={this.props.className + ' input-field'}>
        <textarea id={this.props.name} type={this.props.type}
            name={this.props.name}
            className={inputClassName}
            placeholder={this.props.placeholder}
            value={this.props.getValue() ? 
              this.props.getValue() : '' /*react fix */}
            onChange={ e => this.props.setValue(e.target.value) } />
        <label htmlFor={this.props.name} className="active"
            data-error={errorMsg}
            data-success="" >
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default HOC(Textarea);
