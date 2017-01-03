var React = require('react');
var ReactDOM = require('react-dom');
var ReactPropTypes = React.PropTypes;
var NavActions = require('../actions/NavActions');
var Toggle = require('react-toggle').default;
var CopticCalendar = require('../lib/CopticCalendar.js');

var classNames = require('classnames');

var NavSubMenuItem = React.createClass({

  propTypes: {
    navMenuItemId: ReactPropTypes.string.isRequired,
    attributes: ReactPropTypes.object.isRequired
  },

  getInitialState: function () {
    var year = this.props.attributes.year;
    var day = this.props.attributes.day;
    var monthIndex = this.props.attributes.monthIndex;
    return {
      inputDate: CopticCalendar.getNumericDateString(year, monthIndex, day),
      inputCopticDate: CopticCalendar.getCopticDateString(year, monthIndex, day)
    }
  },

  render: function () {
    var year = this.props.attributes.year;
    var day = this.props.attributes.day;
    var monthIndex = this.props.attributes.monthIndex;
    var navMenuItemId = this.props.navMenuItemId;
    var inputCopticDate = CopticCalendar.getCopticDateString(year, monthIndex, day);
    switch (navMenuItemId) {
      case "date":
        return (
          <div className="nav-sub-menu-item date">
            <div>
              <label>{inputCopticDate}</label>
            </div>
            <div>
              <input type="text" value={this.state.inputDate} placeholder="mm/dd/yyyy" onChange={this.handleDateInput} />
              <select value={this.props.attributes.time} onChange={this.handleTimeSelect}>
                <option value="1">1 AM</option>
                <option value="2">2 AM</option>
                <option value="3">3 AM</option>
                <option value="4">4 AM</option>
                <option value="5">5 AM</option>
                <option value="6">6 AM</option>
                <option value="7">7 AM</option>
                <option value="8">8 AM</option>
                <option value="9">9 AM</option>
                <option value="10">10 AM</option>
                <option value="11">11 AM</option>
                <option value="12">12 PM</option>
                <option value="13">1 PM</option>
                <option value="14">2 PM</option>
                <option value="15">3 PM</option>
                <option value="16">4 PM</option>
                <option value="17">5 PM</option>
                <option value="18">6 PM</option>
                <option value="19">7 PM</option>
                <option value="20">8 PM</option>
                <option value="21">9 PM</option>
                <option value="22">10 PM</option>
                <option value="23">11 PM</option>
                <option value="0">12 AM</option>
              </select>
            </div>
          </div>
        );
      case "theme":
        return (
          <div className="nav-sub-menu-item">
            <div className="checkbox">
              <Toggle defaultChecked={this.props.attributes.lightThemeCheckbox}
                onChange={this.handleLightThemeCheckbox} aria-label="..." />
              <label>Light Theme</label>
            </div>
          </div>
        );
      case "mode":
        return (
          <div className="nav-sub-menu-item">
            <div className="checkbox">
              <Toggle defaultChecked={false} aria-label="..." />
              <label>useless switch</label>
            </div>
          </div>
        );
      case "lang":
        return (
          <div className="nav-sub-menu-item">
            <div className="checkbox">
              <Toggle defaultChecked={this.props.attributes.englishCheckbox}
                onChange={this.handleCheckbox.bind(this, "englishCheckbox")} aria-label="..." />
              <label>English</label>
            </div>
            <div className="checkbox">
              <Toggle defaultChecked={this.props.attributes.copticCheckbox}
                onChange={this.handleCheckbox.bind(this, "copticCheckbox")} aria-label="..." />
              <label>Coptic</label>
            </div>
          </div>
        );
      default:
        return null;
    }
  },

  handleDateInput: function (e) {
    this.setState({ inputDate: e.target.value });
    var res = e.target.value.match(/^\d{2}\/\d{2}\/\d{4}$/);
    if (res != null) {
      res = res[0].split("/");
      var monthIndex = parseInt(res[0]) - 1;
      var day = parseInt(res[1]);
      var year = parseInt(res[2]);
      if (monthIndex >= 0 && monthIndex < 12
        && day <= 31 && day > 0 && year >= 284) {
        NavActions.setDate(year, monthIndex, day);
      }
    }
  },

  handleTimeSelect: function (e) {
    var time = parseInt(e.target.value);
    NavActions.setTime(time);
  },

  handleLightThemeCheckbox: function () {
    //use jQuery to toggle class on body which is inaccessible by React
    $("body").toggleClass("light-theme-background");
    NavActions.setState("lightThemeCheckbox");
  },

  handleCheckbox: function (checkbox) {
    NavActions.setState(checkbox);
  }

});

module.exports = NavSubMenuItem;
