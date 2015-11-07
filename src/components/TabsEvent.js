import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

export default class Tabs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tabColumSize = Math.floor(12 / this.props.tabs.length);
    const tabs = this.props.tabs.map( tab => {
        const attrs = {};
        if (tab.path) attrs.to = tab.path;
        if (tab.onClick) attrs.onClick = tab.onClick;
        return (
          <li className={'tab col s'+tabColumSize} key={tab.path}>
            { tab.indexLink ? 
              <IndexLink {...attrs}>{tab.label}</IndexLink>
                :
              <Link {...attrs}>{tab.label}</Link>
            }
          </li>
        )
      }
    );
        
    const l = this.props.path;
    const selectedTab = this.props.tabs.findIndex( t => l === t.path );
    const tabsIndicatorStyle = {
      left: selectedTab * 100 / this.props.tabs.length + '%',
      right: (this.props.tabs.length - 1 - selectedTab) * 100 / this.props.tabs.length + '%'
    }; 

    return (
      <ul className="tabs">
        { tabs }
        <div className="indicator" style={tabsIndicatorStyle}></div>
      </ul>
    );
  }
}
