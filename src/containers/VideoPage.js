import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { SERVER_BASE, fetchVideos } from '../actions';

import VideoList from '../components/VideoList';
import Tabs from '../components/Tabs';

import './VideoPage.scss';

class VideoPage extends Component {
  constructor(props) {
    super(props);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.videoFilter = this.videoFilter.bind(this);

    this.state = {
      category: null,
      query: '',
      videos: [],
      limit: 10,
      currPage: 1
    };
  }

  componentWillMount() {
    const { video, auth } = this.props;
    //if (!video.hasFetched)
    this.props.fetchVideos(
        this.state.category, this.state.query,
        this.state.limit, this.state.currPage
    );
  }

  handleCategoryChange(cat) {
    // sets category, resets query, resets currPage
    // fetches accordingly
    this.props.fetchVideos(
        cat, '',
        this.state.limit, 1
    ).then( s => {
      this.setState({...this.state, category: cat, query: '', currPage: 1});
    });
  }

  handleQueryChange(e) {
    // sets sets query, resets currPage
    // fetches accordingly
    const value = e.target.value;
    this.props.fetchVideos(
        this.state.category, value,
        this.state.limit, 1
    ).then( s => {
      this.setState({...this.state, query: value, currPage: 1});
    });
  }

  handleLoadMore() {
    this.props.fetchVideos(
      this.state.category, this.state.query, 
      this.state.limit, this.state.currPage+1
    ).then( s => {
      this.setState({...this.state, currPage: this.state.currPage+1});
    });
  }

  videoFilter() {
    let videos = this.props.video.videos.slice(); // DONT mutate props! 
    if (this.state.category)
      videos = videos.filter( v => v.category_id == this.state.category );
    if (this.state.query)
      videos = videos.filter( v => v.title.match(new RegExp(this.state.query, 'i')) );
    videos = videos.reverse();
    videos = videos.slice(0, this.state.limit * this.state.currPage);
    return videos;
  }

  render() {
    let videos = this.videoFilter();
    const tabsOptions = [
      { 
        label: 'Alle Videos', 
        onClick: e => {e.preventDefault(); this.handleCategoryChange(null);}
      },
      { 
        label: 'Lokales', 
        onClick: e => {e.preventDefault(); this.handleCategoryChange(1);}
      },
      { 
        label: 'Abenteuer', 
        onClick: e => {e.preventDefault(); this.handleCategoryChange(2);}
      },
      { 
        label: 'Events', 
        onClick: e => {e.preventDefault(); this.handleCategoryChange(3);}
      }
    ];

    return (
      <div className="videoPage">
        <Tabs tabs={tabsOptions}/>
        <div className="row" style={{marginTop: '20px'}}>
          <div className="col s8 offset-s2 input-field">
            <input id="search" ref="search" type="text"
              className="validate" 
              placeholder="z.B. Wetter, Fußball, ..." 
              onChange={this.handleQueryChange}
              value={this.state.query}/>
            <label htmlFor="search" className="active">
              Filtern
            </label>
          </div>
          <VideoList videos={videos} />
          <div className="col s12">
            <div className="loadMoreBtnWrapper">
              <a className="btn center-align" onClick={this.handleLoadMore}>
                Mehr laden
              </a>
            </div>
          </div>
       </div>
     </div>
    );
  }
}

VideoPage.propTypes = {
  // react-redux
  video: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  fetchVideos: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    video: state.video,
    auth: state.auth
  };
}

var mapDispatchToProps = {
  fetchVideos
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);
