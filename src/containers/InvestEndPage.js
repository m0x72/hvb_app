import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { SERVER_BASE } from '../actions';

import { pushState } from 'redux-router';

class InvestEndPage extends Component {
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
      <div className="investEndPage">
        <h4>End of Investments reached</h4>
      </div>
    );
  }
}

InvestEndPage.propTypes = {
  // react-redux
};

function mapStateToProps(state) {
  return {
  };
}

var mapDispatchToProps = {
  pushState
};

export default connect(mapStateToProps, mapDispatchToProps)(InvestEndPage);
