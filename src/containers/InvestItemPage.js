import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { SERVER_BASE } from '../actions';

import './DashboardPage.scss';

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    };
  }

  componentWillMount() {
    // fetch
  }

  render() {
    return (
      <div className="dashboardPage">
     </div>
    );
  }
}

DashboardPage.propTypes = {
  // react-redux
};

function mapStateToProps(state) {
  return {
  };
}

var mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
