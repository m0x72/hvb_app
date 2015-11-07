import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form } from 'formsy-react';

import Input from '../components/form/Input';
import Textarea from '../components/form/Textarea';
import RadioGroup from '../components/form/RadioGroup';
import File from '../components/form/File';
import Tabs from '../components/Tabs';

import { editUser } from '../actions';

import './UploadPage.scss';

class UploadPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="editProfile">
        <Tabs path={this.props.location.pathname}
            tabs={[
              { path: '/home/profile/edit', indexLink: true, label: 'Profil' },
              { path: '/home/profile/edit/password', label: 'Passwort' },
              { path: '/home/profile/edit/image', label: 'Profilbild' }
            ]}>
        </Tabs>
        { this.props.children }
      </div>
    );
  }
}

UploadPage.propTypes = {
};

function mapStateToProps(state) {
  return {};
}

var mapDispatchToProps = {
  editUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadPage);

