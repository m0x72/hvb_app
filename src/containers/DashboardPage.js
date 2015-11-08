import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { SERVER_BASE, investmentsUser, fetchInvestments } from '../actions';

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
    this.props.fetchInvestments();
  }

  render() {
    const DOD = this.props.investments[0] || { title: 'loading...', picture: '/', id: 3};
    return (
      <div className="dashboardPage">
        <section>
          <div className="center-align caption">Deal of the Day</div>
          <div className="row">
            <div className="col s10 offset-s1">
              <InvestCard 
                  image={SERVER_BASE + DOD.picture}
                  title={DOD.title}
                  link={{
                    to: '/home/invest/'+DOD.id,
                    text: (<span><i className="tinvest"></i>Tinvest now</span>)
                  }}
              />
            </div>
          </div>
        </section>

        <section>
          <div className="center-align caption">My Tinvestments</div>
        </section>
        <section>
          <div className="center-align caption">My Capital</div>
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
    investmentsUser: state.investments.userInvestments,
    investments: state.investments.investments
  };
}

var mapDispatchToProps = {
  investmentsUser,
  fetchInvestments
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
