var React = require('react');
var ReactPropTypes = React.PropTypes;
var NavSubMenuItem = require('./NavSubMenuItem.react');

var classNames = require('classnames');

var NavMenuItem = React.createClass({

    propTypes: {
        navMenuItem: ReactPropTypes.object.isRequired,
        attributes: ReactPropTypes.object.isRequired
    },

    getInitialState: function() {
      return {
        showSubMenu: false
      };
    },

    render: function() {
        var navMenuItem = this.props.navMenuItem;

        if (this.state.showSubMenu) {
          return (
            <li key={navMenuItem.id} className="sidebar-brand">
            <div className="nav-menu-item">
              <a href={navMenuItem.url} onClick={this._onClick}>
                <span className={navMenuItem.span_class} aria-hidden='true'></span> {navMenuItem.title}
              </a>
              </div>
              <NavSubMenuItem key={"sub_" + navMenuItem.id}
                  attributes={this.props.attributes}
                  navMenuItemId={navMenuItem.id}
                  />
            </li>
          );
        } else {
          return (
            <li key={navMenuItem.id} className="sidebar-brand nav-menu-item">
            <div className="nav-menu-item">
              <a href={navMenuItem.url} onClick={this._onClick}>
                <span className={navMenuItem.span_class} aria-hidden='true'></span> {navMenuItem.title}
              </a>
              </div>
            </li>
          );
        }
    },

    _onClick: function() {
      if (this.state.showSubMenu) {
        this.setState({showSubMenu: false});
      } else {
        this.setState({showSubMenu: true});
      }
    }

});

module.exports = NavMenuItem;
