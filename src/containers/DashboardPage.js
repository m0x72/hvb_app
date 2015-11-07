import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { SERVER_BASE } from '../actions';

import './DashboardPage.scss';
import icarosTest from '../../static/images/icaros.png';

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
        <section>
          <div className="center-align caption">Deal of the Day</div>
          <div className="row">
            <div className="col s10 offset-s1">
              <div className="dealOfDay">
                <div className="coverImg"
                    style={{backgroundImage: 'url('+icarosTest+')'}}></div>
                <div className="titleWrapper valign-wrapper">
                  <div className="title valign">ICAROS</div>
                </div>
                <a className="btn">
                    <i className="tinvest"></i>
                    Tinvest now
                </a>
              </div>
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
  };
}

var mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
