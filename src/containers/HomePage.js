import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import classNames from 'classnames';

import { pushState } from 'redux-router';
import { fetchLogout, fetchUser, fetchAccountsUser } from '../actions';

import './HomePage.scss';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSideNavOpen = this.handleSideNavOpen.bind(this);
    this.handleSideNavClose = this.handleSideNavClose.bind(this);
    this.handleFocusNav = this.handleFocusNav.bind(this);
    this.handleBlurNav = this.handleBlurNav.bind(this);
    this.handleScrollTop = this.handleScrollTop.bind(this);
    this.handleGoRouterUp = this.handleGoRouterUp.bind(this);
    this.isSibling = this.isSibling.bind(this);
    this.getPageTitle = this.getPageTitle.bind(this);

    this.state = {
      sideNav: {
        open: false
      }
    };
  }

  componentWillMount() {
    if (!this.props.user.hasFetched)
      this.props.fetchUser(this.props.auth.bearerToken);
    this.props.fetchAccountsUser();
  }

  handleFocusNav() {
    //setTimeout( () => this.refs.nav.style.position = 'absolute', 0);
    this.refs.nav.style.webkitTransform = 'translateY(-'+window.scrollY+'px)';
  }
  handleBlurNav() {
    //this.refs.nav.style.position = '';
    this.refs.nav.style.webkitTransform = '';
  }

  componentDidMount() {
    if (/iPad|iPhone|iPod/.test(navigator.platform)) {
      document.addEventListener('focus', this.handleFocusNav, true);
      document.addEventListener('blur', this.handleBlurNav, true);
    }
  }

  componentWillUnmount() {
    if (/iPad|iPhone|iPod/.test(navigator.platform)) {
      document.removeEventListener('focus', this.handleFocusNav, true);
      document.removeEventListener('blur', this.handleBlurNav, true);
    }
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.fetchLogout(this.props.auth.bearerToken)
      .then( () => { this.props.pushState(null, '/'); } );
  }

  handleSideNavOpen(e) {
    e.preventDefault();
    this.setState({
      ...this.state, 
      sideNav: { 
        open: true
      } 
    });
  }
  handleSideNavClose(e) {
    //e.preventDefault(); // prevents link route transitions!
    this.setState({
      ...this.state, 
      sideNav: { 
        open: false
      } 
    });
  }

  handleScrollTop() {
    window.scroll(window.scrollX, window.scrollY);
  }

  handleGoRouterUp(e) {
    e.preventDefault();
    const rLvl3Path = this.props.routes[3].path;
    const path = rLvl3Path.replace(/\/.*/, '');
    this.props.pushState(null, '/home/' + path);
  }

  isSibling() {
    const rLvl3Path = this.props.routes[3].path;

    const sibling = (/^dashboard$/).test(rLvl3Path) ||
      (/^settings$/).test(rLvl3Path) ||
      (/^invest$/).test(rLvl3Path);
  
    return sibling;
  }

  getPageTitle() {
    const rLvl3Path = this.props.routes[3].path;

    if ((/^dashboard/).test(rLvl3Path)) {
      return 'Dashboard';
    } else if ((/^settings/).test(rLvl3Path)) {
      return 'Settings';
    } else if ((/^invest/).test(rLvl3Path)) {
      return 'Tinvest';
    } else {
      return 'Tinvest';
    }
  }
  


  handleIconClick(e) {
    console.log(this);
    const sibling = this.isSibling();
    if (sibling) {
      return this.handleSideNavOpen(e);
    } else {
      return this.handleGoRouterUp(e);
    }
  }

  render() {
    const { user } = this.props;
    const firstname = user.profile ? user.profile.firstname : '';

    const slideNavClass = classNames({
      'slide-container': true,
      'open': this.state.sideNav.open
    });

    let icon = 'menu';
    if (!this.isSibling()) {
      icon = 'arrow_back';
    }

    const pageTitle = this.getPageTitle();

    return (
      <div>
        <header>
          <div className="navbar-fixed">
            <nav ref="nav">
              <div className="nav-wrapper">
                <a className="brand-logo">{pageTitle}</a>
                <a className="button-collapse" onClick={(e) => this.handleIconClick(e)}>
                  <i className="material-icons">{icon}</i>
                </a>
                <ul id="nav-mobile" className="right">
                  <li>
                    <a href="/" onClick={this.handleLogout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div className={slideNavClass}>
            <div id="slide-background" className="slide-background" onClick={this.handleSideNavClose}></div>
            <ul id="slide-out" className="side-nav">
              <li>
                <IndexLink to="/home" 
                     onClick={this.handleSideNavClose}>
                  Dashboard
                </IndexLink>
              </li>
              <li>
                <Link to="/home/settings"
                     onClick={this.handleSideNavClose}>
                  Settings
                </Link>
              </li>
              <li>
                <Link to="/home/invest/8"
                     onClick={this.handleSideNavClose}>
                  Invests
                </Link>
              </li>
            </ul>
          </div>
        </header>
        <div className="home-children">
          {this.props.children}
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  // react-redux
  fetchLogout: PropTypes.func.isRequired,
  pushState: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.user
  };
}
var mapDispatchToProps = {
  fetchLogout,
  fetchUser,
  fetchAccountsUser,
  pushState
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
