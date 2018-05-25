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
var Slider = require('rc-slider').default;

var classNames = require('classnames');

var DEFAULT_FONT_SCALE = 2;

var NavSubMenuItem = createReactClass({

  propTypes: {
    navMenuItemId: PropTypes.string.isRequired,
    attributes: PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      inputDate: this.props.attributes.todayDate,
      oldFontScale: this.props.attributes.fontScale
    }
  },

  render: function () {
    var year = this.props.attributes.year;
    var day = this.props.attributes.day;
    var monthIndex = this.props.attributes.monthIndex;
    var navMenuItemId = this.props.navMenuItemId;
    var thisState = this;
    var inputCopticDate = CopticCalendar.getCopticDateString(year, monthIndex, day);
    switch (navMenuItemId) {
      case "date":
        var seasonArray = CopticCalendar.getCurrentFastFeasts(this.props.attributes);
        var seasonDisplayItems = seasonArray.map(function (item, idx) {
          return <li key={idx}>{item}</li>;
        });
        return (
          <div className="nav-sub-menu-item date">
            <div>
              <label>{inputCopticDate}</label>
            </div>
            <div>
              <SingleDatePicker
                date={thisState.state.inputDate}
                onDateChange={function (date) { thisState.handleDateInput(date) }}
                focused={thisState.state.focused}
                onFocusChange={function (objFocused) {
                  // if side menu is open on mobile, close it
                  if (!NavStore.getToggleState()) {
                    NavActions.toggleMenu();
                  }
                  thisState.setState({ focused: objFocused.focused });
                }
                }
                enableOutsideDays={true}
                isOutsideRange={function () { false }}
                numberOfMonths={1}
                withPortal={true}
              />
            </div>
            <div className="season-display">
              <ul>
                {seasonDisplayItems}
              </ul>
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
            <div className="font-scaler">
              <label className="font-scaler">Text Scale</label>
              <div className="nav-slider">
                <Slider
                  min={0.5}
                  max={2.5}
                  step={0.25}
                  defaultValue={this.props.attributes.fontScale}
                  onChange={function (value) {
                    thisState.setAttribute("fontScale", value)
                  }} />
              </div>
              <label className="font-scaler">{this.props.attributes.fontScale * 100 + "%"}</label>
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
    NavActions.setDate(_moment);
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

      $("body").toggleClass("no-scroll");
      document.addEventListener("keydown", this._handleKeyDown);
      this.setState({ oldFontScale: this.props.attributes.fontScale });
      this.setAttribute("fontScale", DEFAULT_FONT_SCALE);

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

      $("body").toggleClass("no-scroll");
      document.removeEventListener("keydown", this._handleKeyDown);
      this.setAttribute("fontScale", this.state.oldFontScale);
    }

    NavActions.setState("presentationModeCheckbox");
  },

  handleCheckbox: function (checkbox) {
    NavActions.setState(checkbox);
  },

  setAttribute: function (key, value) {
    NavActions.setAttribute(key, value);
  },

  scrollPage: function (direction) {
    // get scroll delta on every call in case window size changes, nav bar is 50px
    var scrollDelta = window.innerHeight - 50;
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop
    if (direction == "up") {
      scrollPosition = Math.max(0, scrollPosition - scrollDelta);
    } else if (direction == "down") {
      scrollPosition += scrollDelta;
    }
    window.scrollTo(0, scrollPosition);
  },

  _handleKeyDown: function (e) {
    if (e.key == "ArrowLeft") {
      this._onClickLeft();
    } else if (e.key == "ArrowRight") {
      this._onClickRight();
    }
  },

  _onClickLeft: function () {
    this.scrollPage("up");
  },

  _onClickRight: function () {
    this.scrollPage("down");
  }

});

module.exports = NavSubMenuItem;
