var React = require('react');
var ReactDOM = require('react-dom');
var ReactPropTypes = React.PropTypes;
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
      console.log("hi");
      if (this.props.englishCheckbox) {
        this.setState({englishCheckbox: false});
      } else {
        this.setState({englishCheckbox: true});
      }
        console.log(this.props.englishCheckbox);
    },

    handleCopticCheckbox: function() {
      if (this.props.copticCheckbox) {
        this.setState({copticCheckbox: false});
      } else {
        this.setState({copticCheckbox: true});
      }
    }

});

module.exports = NavSubMenuItem;
