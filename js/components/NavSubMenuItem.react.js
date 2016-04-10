var React = require('react');
var ReactDOM = require('react-dom');
var ReactPropTypes = React.PropTypes;
var NavActions = require('../actions/NavActions');
var Toggle = require('react-toggle');

var classNames = require('classnames');

var NavSubMenuItem = React.createClass({

    propTypes: {
        navMenuItemId: ReactPropTypes.string.isRequired,
        englishCheckbox: ReactPropTypes.bool.isRequired,
        copticCheckbox: ReactPropTypes.bool.isRequired
    },

    render: function() {
        var navMenuItemId = this.props.navMenuItemId;
        switch (navMenuItemId) {
          case "lang":
            return (
              <div className="nav-sub-menu-item">
                <div className="checkbox">
                 <Toggle defaultChecked={this.props.englishCheckbox}
                 onChange={this.handleCheckbox.bind(this, "englishCheckbox")} aria-label="..."/>
                 <label>English</label>
                </div>
                <div className="checkbox">
                 <Toggle defaultChecked={this.props.copticCheckbox}
                 onChange={this.handleCheckbox.bind(this, "copticCheckbox")} aria-label="..."/>
                 <label>Coptic</label>
                </div>
              </div>
              );
          default:
            return null;
        }
    },

    handleCheckbox: function(checkbox) {
      NavActions.setState(checkbox);
    }

});

module.exports = NavSubMenuItem;
