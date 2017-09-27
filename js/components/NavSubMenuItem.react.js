var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var NavActions = require('../actions/NavActions');
var Toggle = require('react-toggle').default;
var CopticCalendar = require('../lib/CopticCalendar.js');
var SingleDatePicker = require('react-dates').SingleDatePicker;

var classNames = require('classnames');

var NavSubMenuItem = createReactClass({

  propTypes: {
    navMenuItemId: PropTypes.string.isRequired,
    attributes: PropTypes.object.isRequired
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
    //var inputCopticDate = CopticCalendar.getCopticDateString(year, monthIndex, day);
    switch (navMenuItemId) {
      case "date":
        return (
          <div className="nav-sub-menu-item date">
            <div>
              <label>{this.state.inputCopticDate}</label>
            </div>
            <SingleDatePicker
              date={this.state.date} // momentPropTypes.momentObj or null
              onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
              focused={this.state.focused} // PropTypes.bool
              onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
              enableOutsideDays={true}
            />
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
              <Toggle defaultChecked={this.props.attributes.presentationModeCheckbox}
                onChange={this.handlePresentationModeCheckbox} aria-label="..." />
              <label>{this.props.attributes.presentationModeCheckbox ? "On" : "Off"}</label>
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
            <div className="checkbox">
              <Toggle defaultChecked={this.props.attributes.arabicCheckbox}
                onChange={this.handleCheckbox.bind(this, "arabicCheckbox")} aria-label="..." />
              <label>Arabic</label>
            </div>
          </div >
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
    $("html").toggleClass("light-theme-background");
    NavActions.setState("lightThemeCheckbox");
  },

  handlePresentationModeCheckbox: function () {
    var checked = this.props.attributes.presentationModeCheckbox;
    var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) ||
      (document.mozFullScreen || document.webkitIsFullScreen);
    var docElm = document.documentElement;

    if (!isInFullScreen && !checked) {

      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      }
      else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      }
      else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      }

    } else if (isInFullScreen) {

      if (docElm.requestFullscreen) {
        document.exitFullscreen();
      }
      else if (docElm.mozRequestFullScreen) {
        document.mozCancelFullScreen();
      }
      else if (docElm.webkitRequestFullScreen) {
        document.webkitExitFullscreen();
      }

    }

    NavActions.setState("presentationModeCheckbox");
  },

  handleCheckbox: function (checkbox) {
    NavActions.setState(checkbox);
  }

});

module.exports = NavSubMenuItem;
