import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { SERVER_BASE } from '../actions';

import './DashboardPage.scss';

import icarosTest from '../../static/images/icaros.png';

import InvestCard from '../components/InvestCard';

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
        <div className="row">
          <div className="col s10 offset-s1">
            <InvestCard
                image={icarosTest}
                title='ICAROS'
            />
          </div>
        </div>
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
