import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import './InvestCard.scss';

export default class InvestCard extends Component {
  render() {
    return (
      <div className="investCard">
        <div className="coverImg"
            style={{backgroundImage: 'url('+this.props.image+')'}}></div>
        <div className="titleWrapper valign-wrapper">
          <div className="title valign">ICAROS</div>
        </div>
        { this.props.link ? 
          (<Link to="/home/invest/3" className="btn">
           {this.props.link.text}
           </Link>) : ''
        }
      </div>
    );
  }
}
