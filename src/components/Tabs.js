import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

export default class Tabs extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    let selectedTab = 0;
    if (props.path) {
      // if path given, hydrate selectedTab from location initially
      const l = props.path;
      selectedTab = props.tabs.findIndex( t => l === t.path );
    }

    this.state = {
      selectedTab
    }; 
  }

  handleClick(key) {
    this.setState({...this.state, selectedTab: key});
  }

  render() {
    const tabColumSize = Math.floor(12 / this.props.tabs.length);
    const tabs = this.props.tabs.map( (tab, key) => {
        
        const attrs = {
          to: tab.path,
          onClick: this.handleClick.bind(this, key)
        };

        if (tab.onClick) {
          attrs.onClick = (e) => {
            this.handleClick(key);
            tab.onClick(e);
          };
        }

        let link;
        if (!tab.path) {
          link = (<a href="#" {...attrs}>{tab.label}</a>);
        } else if (tab.indexLink) {
          link = (<IndexLink {...attrs}>{tab.label}</IndexLink>);
        } else {
          link = (<Link {...attrs}>{tab.label}</Link>);
        }

        return (
          <li className={'tab col s'+tabColumSize} key={tab.label}>
            { link }
          </li>
        );
      }
    );
       
    const selectedTab = this.state.selectedTab;
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
