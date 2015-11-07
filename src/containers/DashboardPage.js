import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { SERVER_BASE, investmentsUser } from '../actions';

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
    this.props.investmentsUser();
  }

  render() {
    return (
      <div className="dashboardPage">
        <section>
          <div className="center-align caption">Deal of the Day</div>
          <div className="row">
            <div className="col s10 offset-s1">
              <InvestCard 
                  image={icarosTest}
                  title='ICAROS'
                  link={{
                    to: '/home/invest/3',
                    text: (<span><i className="tinvest"></i>Tinvest now</span>)
                  }}
              />
            </div>
          </div>
        </section>

        <section>
          <div className="center-align caption">My Tinvestments</div>
          clock + table
        </section>
        <section>
          <div className="center-align caption">My Capital</div>
          Tabs
          graph
        </section>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  // react-redux
};

function mapStateToProps(state) {
  return {
    investmentsUser: state.investments.userInvestments
  };
}

var mapDispatchToProps = {
  investmentsUser
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
