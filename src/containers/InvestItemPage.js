import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { SERVER_BASE } from '../actions';

import './InvestItemPage.scss';

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
      <div className="investItemPage">
        <div className="cardHeadline center-align">ICAROS</div>
        <div className="row">
          <div className="col s10 offset-s1">
            <InvestCard
                image={icarosTest}
                title='20.000 € for 12%'
            />
            <div className="actionBar">
              <div className="linkBar">
                <a className="actionLink actionDecline">No</a>
                <a className="actionLink actionApprove">Yes</a>
                <a className="predictionLink"></a>
              </div>
            </div>
          </div>
          <div className="investAction col s12">
            <div className="investHeadline center-align">How to invest?</div>
            <div className="investAmount center-align">20,000 €</div>
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
