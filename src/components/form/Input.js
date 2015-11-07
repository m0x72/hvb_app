// Higher Order Component Formsy Input Field
import React, { Component } from 'react';
import { HOC  } from 'formsy-react';
import classNames from 'classnames';

import './Input.scss';

class Input extends Component {
  
  render() {
    const inputClassName = classNames({
      'active': true,
      'valid': !this.props.isPristine() && this.props.isValid(),
      'invalid': !this.props.isPristine() && (this.props.showRequired() || this.props.showError())
    });
    const errorMsg = this.props.showRequired() ? 'Erforderlich' : this.props.getErrorMessage();
    return (
      <div className={this.props.className + ' input-field'}>
        <input id={this.props.name} type={this.props.type}
            name={this.props.name}
            className={inputClassName}
            placeholder={this.props.placeholder}
            value={this.props.getValue()}
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

export default HOC(Input);
