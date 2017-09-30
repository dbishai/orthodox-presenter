var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var NavActions = require('../actions/NavActions');
var Toggle = require('react-toggle').default;
var CopticCalendar = require('../lib/CopticCalendar.js');
var SingleDatePicker = require('react-dates').SingleDatePicker;
var NavStore = require('../stores/NavStore');
var NavActions = require('../actions/NavActions');
var SectionActions = require('../actions/SectionActions');

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
      inputDate: this.props.attributes.todayDate,
      inputCopticDate: CopticCalendar.getCopticDateString(year, monthIndex, day)
    }
  },

  render: function () {
    var year = this.props.attributes.year;
    var day = this.props.attributes.day;
    var monthIndex = this.props.attributes.monthIndex;
    var navMenuItemId = this.props.navMenuItemId;
    var thisState = this;
    //var inputCopticDate = CopticCalendar.getCopticDateString(year, monthIndex, day);
    switch (navMenuItemId) {
      case "date":
        return (
          <div className="nav-sub-menu-item date">
            <div>
              <label>{this.state.inputCopticDate}</label>
            </div>
            <div>
              <SingleDatePicker
                date={thisState.state.inputDate} // momentPropTypes.momentObj or null
                onDateChange={function (date) { thisState.handleDateInput(date) }} // PropTypes.func.isRequired
                focused={thisState.state.focused} // PropTypes.bool
                onFocusChange={function ({ focused }) {
                  // if side menu is open on mobile, close it
                  if (!NavStore.getToggleState()) {
                    NavActions.toggleMenu();
                  }
                  thisState.setState({ focused });
                }
                } // PropTypes.func.isRequired
                enableOutsideDays={true}
                isOutsideRange={function () { false }}
                numberOfMonths={1}
                withPortal={true}
              />
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

  handleDateInput: function (_moment) {
    this.setState({ inputDate: _moment });
    NavActions.setDate(_moment.year(), _moment.month(), _moment.date());
    // since loaded documents are dependent on date, refresh them
    SectionActions.refresh(this.props.attributes);
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
