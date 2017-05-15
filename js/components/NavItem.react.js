var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var NavActions = require('../actions/NavActions');
var NavStore = require('../stores/NavStore');

var classNames = require('classnames');

var NavItem = createReactClass({

    propTypes: {
        navItem: PropTypes.object.isRequired
    },

    getInitialState: function() {
        return {
          nodeStack: NavStore.getStack()
        };
    },

    render: function() {
        var navItem = this.props.navItem;
        if (this.state.nodeStack.length == 0) {
          return null;
        } else {
          return (
            <li key={navItem.id} className="sidebar-brand nav-menu-item" onClick={this._onClick}>
              <span className={navItem.span_class}></span>
            </li>
            );
        }
    },

    _onClick: function() {
      var navItem = this.props.navItem;
      if (navItem.action == "back") {
        NavActions.prev(this.state.nodeStack);
      }
    }

});

module.exports = NavItem;
