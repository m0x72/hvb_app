import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';

import { SERVER_BASE, fetchVideosSelf } from '../actions';

import dummyImage from '../../static/images/profile_dummy.png';
import './ProfilePage.scss';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.videoFilter = this.videoFilter.bind(this);
  }

  componentWillMount() {
    this.props.fetchVideosSelf(null, null, 50, 1);
  }

  videoFilter() {
    let videos = this.props.video.videosSelf.slice(); // DONT mutate props! 
    videos = videos.reverse();
    return videos;
  }

  render() {
    const profile = this.props.user.profile || {};

    const tabsIndicatorStyle = 
      /profile\/videos/.test(this.props.location.pathname) ?
        {left: '50%', right: '0'} : {left: '0', right: '50%'};

    const videos = this.videoFilter();
      
    return (
      <div className="profilePage"> 
        <div className="headerImgWrapper">
          <div className="imgWrapper">
            <img className="responsive-img profileImg"
                src={profile.image ? SERVER_BASE+profile.image : dummyImage} />
          </div>
          <div className="imgTitle">
            { profile.firstname + ' ' + profile.lastname }
          </div>
          <Link to="/home/profile/edit" 
              className="btn-floating btn-large edit">
            <i className="material-icons">edit</i>
          </Link>
        </div>
        <div className="row">
          <div className="col s12">
            <h4> Videos </h4>
            <ul className="collection">
            { videos.map( v => (
                <li className="collection-item avatar" key={v.id}>
                  <img src={SERVER_BASE + v.thumb} className="circle" />
                  <span className="title">{v.title}</span>
                  <p>{v.description}</p>
                  <Link to={'/home/video/'+v.id} className="secondary-content">
                    <i className="material-icons">arrow_forward</i>
                  </Link>
                </li>
              ) 
            )}
            </ul>
          </div>
        </div>
        { /* this.props.children */ }
      </div>
    );
  }
}

ProfilePage.propTypes = {
  // react-redux
};

function mapStateToProps(state) {
  return {
    video: state.video,
    user: state.user
  };
}
var mapDispatchToProps = {
  fetchVideosSelf
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
