import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { SERVER_BASE } from '../actions';

import './VideoList.scss';

function duration(seconds) {
  const min = Math.floor(seconds/60);
  const sec = seconds % 60;
  return (min < 10 ? '0'+min : min) + ':' + (sec < 10 ? '0'+sec : sec);
}

export default class VideoList extends Component {
  render() {
    return (
      <div className="col s12 videoList">
        <div className="row">
          { this.props.videos.map( v =>
             <div className="col s12 m6 l3"
                  key={v.id}>
               <div className="card">
                 <div className="card-image">
                   <div className="cardImageWrapper">
                     <img src={SERVER_BASE + v.thumb} />
                   </div>
                   <span className="card-title">{v.title}</span>
                   <span className="cardDuration">{duration(v.duration)}</span>
                 </div>
                 <div className="card-content">
                  <p><b>Description</b></p>
                  <p>{v.description}</p>
                 </div>
                 <div className="card-action">
                   <Link to={'/home/video/'+v.id}>Ansehen</Link>
                 </div>
               </div>
             </div>
           )
          }
        </div>
      </div>
    );
  }
}
