// Higher Order Component Formsy Input Field
import React, { Component } from 'react';
import { HOC  } from 'formsy-react';
import classNames from 'classnames';

import './RadioGroup.scss';

class RadioGroup extends Component {
  
  render() {
    const errorClassName = classNames({
      'valid': !this.props.isPristine() && this.props.isValid(),
      'invalid': !this.props.isPristine() && (this.props.showRequired() || this.props.showError())
    });
    const errorMsg = this.props.showRequired() ? 'Erforderlich' : this.props.getErrorMessage();

    const name = this.props.name;
    const value = this.props.getValue();
    const radioItems = this.props.options.map( (item, key) => (
      <span className="radio-item" key={item.value}>
        <input name={name} type="radio" id={name + key}
            className="with-gap"
            value={item.value}
            checked={ item.value == value ? 'checked' : null } 
            onChange={ e => this.props.setValue(e.target.value) } />
        <label htmlFor={name + key}>{item.label}</label>
      </span>
    ));

    return (
      <div className={this.props.className + ' input-field'}>
        {radioItems}
        <label className="active"
            data-error={errorMsg}
            data-success="" >
          {this.props.label}
        </label>
        <div className={'error-field ' + errorClassName}>
          {errorMsg}
        </div>
      </div>
    );
  }
}

export default HOC(RadioGroup);
