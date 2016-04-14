var React = require('react');
var ReactDOM = require('react-dom');
var ReactPropTypes = React.PropTypes;
var NavActions = require('../actions/NavActions');
var Toggle = require('react-toggle');
var CopticCalendar = require('../lib/CopticCalendar.js');

var classNames = require('classnames');

var NavSubMenuItem = React.createClass({

    getInitialState: function() {
        var year = this.props.attributes.year;
        var day = this.props.attributes.day;
        var monthIndex = this.props.attributes.monthIndex;
        var gregDate = CopticCalendar.getDateString(year, monthIndex, day);
        var copticDate = CopticCalendar.getCopticDateString(year, monthIndex, day);
      return {
        text: ""
      }
    },

    propTypes: {
        navMenuItemId: ReactPropTypes.string.isRequired,
        attributes: ReactPropTypes.object.isRequired
    },

    render: function() {

        var navMenuItemId = this.props.navMenuItemId;
        switch (navMenuItemId) {
          case "date":
            return (
                <div className="checkbox">
              <div className="nav-sub-menu-item">
                 <input type="text" value = {this.state.text} placeholder="mm/dd/yyyy" onChange={this.handleDateInput}/>
                 <label>{this.state.copticDate}</label>
              </div>
              </div>
              );
          case "lang":
            return (
              <div className="nav-sub-menu-item">
                <div className="checkbox">
                 <Toggle defaultChecked={this.props.attributes.englishCheckbox}
                 onChange={this.handleCheckbox.bind(this, "englishCheckbox")} aria-label="..."/>
                 <label>English</label>
                </div>
                <div className="checkbox">
                 <Toggle defaultChecked={this.props.attributes.copticCheckbox}
                 onChange={this.handleCheckbox.bind(this, "copticCheckbox")} aria-label="..."/>
                 <label>Coptic</label>
                </div>
                <div className="checkbox">
                 <Toggle defaultChecked={this.props.attributes.arabicCheckbox}
                 onChange={this.handleCheckbox.bind(this, "arabicCheckbox")} aria-label="..."/>
                 <label>Arabic</label>
                </div>
              </div>
              );
          default:
            return null;
        }
    },

    handleDateInput: function (e) {
      this.setState({text: e.target.value});
    },

    handleCheckbox: function(checkbox) {
      NavActions.setState(checkbox);
    }

});

module.exports = NavSubMenuItem;
