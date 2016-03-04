var React = require('react');
var ReactPropTypes = React.PropTypes;
var NavActions = require('../actions/NavActions');
var NavStore = require('../stores/NavStore');

var classNames = require('classnames');

var NavItem = React.createClass({

    propTypes: {
        command: ReactPropTypes.object.isRequired
    },

    getInitialState: function() {
        return {
          nodeStack: NavStore.getAll()
        };
    },

    render: function() {
        var command = this.props.command;
        if (this.state.nodeStack.length == 0) {
          return null;
        } else {
          return (
            <span className="glyphicon glyphicon-arrow-left nav-item" onClick={this._onClick}></span>
            );
        }
    },

    _onClick: function() {
      var command = this.props.command;
      if (command.action == "back") {
        NavActions.prev(this.state.nodeStack);
      }
    }

});

module.exports = NavItem;
