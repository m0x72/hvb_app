import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { SERVER_BASE, investViewed } from '../actions';
import { pushState } from 'redux-router';

import './InvestItemPage.scss';

import icarosTest from '../../static/images/icaros.png';

import InvestCard from '../components/InvestCard';
import ReactSlider from 'react-slider';


class InvestItemPage extends Component {
  constructor(props) {
    super(props);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
  
    // fetched by HomePage.js or in here 
    const maxs = props.accounts.amount_by_type;

    this.state = {
      showBuyOptions: false,
      //accounts_max: [ maxs[1], maxs[2], maxs[3] ],
      accounts: [33, 50, 77]
    };
  }

  componentWillMount() {
    // fetch
  }

  handleAccept() {
    this.setState({
      showBuyOptions: true    
    });
  }

  handleDecline() {
    this.props.investViewed(this.props.routeParams.id);
    const nextArrId = this.props.investments.findIndex( i => (
        i.id != this.props.routeParams.id &&
        !this.props.investmentsViewed.find( ivId => ivId == i.id )
      )
    );
    if (nextArrId > -1) return this.props.pushState(null, 
        '/home/invest/'+this.props.investments[nextArrId].id);
    return this.props.pushState(null, '/home/invest/end');
  }

  render() {
    const investId = this.props.routeParams.id;
    const investment = this.props.investments.find( i => i.id == investId );

    if (!investment) return <h4 className="center-align">Investment loading</h4>;

    const a = this.state.accounts;
    const aOther = 100 - this.state.accounts[2];

    return (
      <div className="investItemPage">
        <div className="cardHeadline center-align">{investment.title}</div>
        <div className="row">
          <div className="col s10 offset-s1">
            <InvestCard
                image={SERVER_BASE + investment.picture}
                title={investment.investment_amount + ' € for ' + (investment.turnover*100) + '%'}
            />
            <div className="actionBar" ref="actionBar">
              <div className="linkBar">
                <a className="actionLink actionDecline"
                    onClick={this.handleDecline}>No</a>
                <a className="actionLink actionApprove"
                    onClick={this.handleAccept}>Yes</a>
                <a className="predictionLink"></a>
              </div>
            </div>
          </div>
        </div>
        { this.state.showBuyOptions ? (
        <div>
        <div className="row">
          <div className="investAction col s12">
            <div className="investHeadline center-align">How to invest?</div>
            <div className="investAmount center-align">{investment.investment_amount} €</div>
            <ReactSlider withBars className="slider multislider"
                value={this.state.accounts} ref="slider"
                onChange={() => this.setState({accounts: this.refs.slider.getValue()})} >
              <div className="sliderHandle"></div>
              <div className="sliderHandle"></div>
              <div className="sliderHandle"></div>
            </ReactSlider>
          </div>
          <div className="tableAccounts col s12">
            <div className="accountItem acc-1" >
              <div className="icon col s1">O</div>
              <div className="desc col s6">Checking Accounts</div>
              <div className="amount col s3 right-align">{a[0]*investment.investment_amount/100} €</div>
              <div className="perc col s2 right-align">{a[0]}%</div>
            </div>
            <div className="accountItem acc-2" >
              <div className="icon col s1">O</div>
              <div className="desc col s6">Saving Accounts</div>
              <div className="amount col s3 right-align">{a[1]*investment.investment_amount/100} €</div>
              <div className="perc col s2 right-align">{a[1]}%</div>
            </div>
            <div className="accountItem acc-3" >
              <div className="icon col s1">O</div>
              <div className="desc col s6">Investment Accounts</div>
              <div className="amount col s3 right-align">{a[2]*investment.investment_amount/100} €</div>
              <div className="perc col s2 right-align">{a[2]}%</div>
            </div>
            <div className="accountItem acc-other" >
              <div className="icon col s1">O</div>
              <div className="desc col s6">Loan</div>
              <div className="amount col s3 right-align">{aOther*investment.investment_amount/100} €</div>
              <div className="perc col s2 right-align">{aOther}%</div>
            </div>
          </div>
        </div>
        <div className="buttonBar">
          <a className="btn btn-secondary contact">Contact Consultant</a>
          <a className="btn invest">
            <i className="tinvest"></i>
            Tinvest now
          </a>
        </div>
        </div> ) : '' }
      </div>
    );
  }
}

InvestItemPage.propTypes = {
  // react-redux
};

function mapStateToProps(state) {
  return {
    investmentsViewed: state.investments.investmentsViewed,
    investments: state.investments.investments,
    accounts: state.accounts.userAccounts
  };
}

var mapDispatchToProps = {
  investViewed,
  pushState
};

export default connect(mapStateToProps, mapDispatchToProps)(InvestItemPage);
