var React = require('react');
var ReactPropTypes = React.PropTypes;
var NavActions = require('../actions/NavActions');

var classNames = require('classnames');

var NavItem = React.createClass({

    propTypes: {
        command: ReactPropTypes.object.isRequired,
        stack: ReactPropTypes.object.isRequired
    },

    getInitialState: function() {
        return {
        };
    },

    render: function() {
        var command = this.props.command;
        var nodeStack = this.props.stack["nodes"];
   /*     if (nodeStack.length == 0) {
          return null;
        } else { */
          return (
            <span className="glyphicon glyphicon-arrow-left nav-item" onClick={this._onClick}></span>
            );
        //}
    },

    _onClick: function() {
      var nodeStack = this.props.stack["nodes"];
      var command = this.props.command;
      nodeStack.pop();
      if (command.action == "back") {
        NavActions.prev(nodeStack);
      }
    }

});

module.exports = NavItem;
