import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { SERVER_BASE } from '../actions';

import './VideoItemPage.scss';

export default class VideoItemPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const v = this.props.video;
    return (
      <div className="row videoItem">
        <div className="videoWrapper">
          <video controls 
             className="responsive-video" style={{display: 'block'}} >
            <source src={SERVER_BASE + v.url} type="video/mp4" />
          </video>
        </div>
        <div className="col s12 z-depth-1" style={{marginTop: 0}}>
          <h5 className="title">{v.title}</h5>
          <span>by {v.author.firstname + ' ' + v.author.lastname}</span>
          <p className="descriptionTitle"><b>Description</b></p>
          <p>{v.description}</p>
        </div>
      </div>
    );
  }
}

VideoItemPage.PropTypes = {
  video: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const videoId = state.router.params.id;
  const videos = state.video.videos;

  const videoArrId = videos.findIndex( v => v.id == videoId );
  const video = videoArrId > -1 ? videos[videoArrId] : {};

  return {
    video  
  };
}

export default connect(mapStateToProps)(VideoItemPage);
