import React, { Component, PropTypes } from 'react';
import Classnames from 'classnames';

import './FormError.scss';

export default class FormError extends Component {
  render() {
    const cName = Classnames({
      'formError': true,
      'error': this.props.error,
      'success': !this.props.error
    });
    return (
      <div className={cName}>
        {
          this.props.error ? 
            this.props.error : this.props.success
        }
      </div>
    );
  }
}
