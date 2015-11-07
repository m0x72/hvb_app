import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { SERVER_BASE } from '../actions';

import { pushState } from 'redux-router';
import './InvestPage.scss';

class InvestPage extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
    };
  }

  componentWillMount() {
    // fetch
    this.props.pushState(null, '/home/invest/3');
  }

  render() {
    return (
      <div className="investPage">
        { this.props.children }
      </div>
    );
  }
}

InvestPage.propTypes = {
  // react-redux
};

function mapStateToProps(state) {
  return {
  };
}

var mapDispatchToProps = {
  pushState
};

export default connect(mapStateToProps, mapDispatchToProps)(InvestPage);
