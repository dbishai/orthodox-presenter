var React = require('react');
var ReactPropTypes = React.PropTypes;
var NavSubMenuItem = require('./NavSubMenuItem.react');

var classNames = require('classnames');

var NavMenuItem = React.createClass({

    propTypes: {
        navMenuItem: ReactPropTypes.object.isRequired,
        englishCheckbox: ReactPropTypes.bool.isRequired,
        copticCheckbox: ReactPropTypes.bool.isRequired,
        arabicCheckbox: ReactPropTypes.bool.isRequired
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
            <li key={navMenuItem.id} className="sidebar-brand nav-menu-item">
              <a href={navMenuItem.url} onClick={this._onClick}>
                <span className={navMenuItem.span_class} aria-hidden='true'></span> {navMenuItem.title}
              </a>
              <NavSubMenuItem key={"sub_" + navMenuItem.id}
                  englishCheckbox={this.props.englishCheckbox}
                  copticCheckbox={this.props.copticCheckbox}
                  arabicCheckbox={this.props.arabicCheckbox}
                  navMenuItemId={navMenuItem.id}
                  />
            </li>
          );
        } else {
          return (
            <li key={navMenuItem.id} className="sidebar-brand nav-menu-item">
              <a href={navMenuItem.url} onClick={this._onClick}>
                <span className={navMenuItem.span_class} aria-hidden='true'></span> {navMenuItem.title}
              </a>
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
