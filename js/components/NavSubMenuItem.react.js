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
                 <Toggle defaultChecked={this.props.englishCheckbox} onChange={this.handleEnglishCheckbox} aria-label="..."/><label>English</label>
                </div>
                <div className="checkbox">
                 <Toggle defaultChecked={this.props.copticCheckbox} onChange={this.handleCopticCheckbox} aria-label="..."/><label>Coptic</label>
                </div>
              </div>
              );
          default:
            return null;
        }
    },

    handleEnglishCheckbox: function() {
      NavActions.setState("englishCheckbox");
    },

    handleCopticCheckbox: function() {
      NavActions.setState("copticCheckbox");
    }

});

module.exports = NavSubMenuItem;
