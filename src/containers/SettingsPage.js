import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { SERVER_BASE } from '../actions';

import './SettingsPage.scss';

import testProfileImg from '../../static/images/profile_1.jpg';

import { Form } from 'formsy-react';
import Input from '../components/form/Input';

class SettingsPage extends Component {
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
      <div className="settingsPage">
        <Form>
          <div className="profileImageWrapper">
            <img src={testProfileImg} />
          </div>
          <div className="subHeader">GENERAL</div>
          <div className="inputItem">
            <Input name="name" type="text" label="Name"
              required/>
          </div>
          <div className="inputItem">
            <Input name="email" type="text" label="Email"
              required/>
          </div>
          <div className="inputItem">
            <Input name="password" type="password" label="Password"
              required/>
          </div>
          <div className="inputItem">
            <Input name="birthday" type="text" label="Birthday"
              required/>
          </div>
          <div className="inputItem">
            <Input name="max_tinvestment" type="text" label="Max.Tinvestment"
              required/>
          </div>
          <div className="subHeader">FILTER</div>
          <div className="inputItem">
            <Input name="filter_by_location" type="text" label="Filter Tinvesments by Location"
              required/>
          </div>
          <div className="inputItem">
            <Input name="filter_by_category[]" type="text" label="Filter by Interest"
              required/>
          </div>
          <div className="buttonBar">
            <button className="btn">
              <i className="material-icons">check</i>
            </button>
          </div>
        </Form>
      </div>
    );
  }
}

SettingsPage.propTypes = {
  // react-redux
};

function mapStateToProps(state) {
  return {
  };
}

var mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
