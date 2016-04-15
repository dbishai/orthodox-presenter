var React = require('react');
var ReactDOM = require('react-dom');
var ReactPropTypes = React.PropTypes;
var NavActions = require('../actions/NavActions');
var Toggle = require('react-toggle');
var CopticCalendar = require('../lib/CopticCalendar.js');

var classNames = require('classnames');

var NavSubMenuItem = React.createClass({

    propTypes: {
        navMenuItemId: ReactPropTypes.string.isRequired,
        attributes: ReactPropTypes.object.isRequired
    },

    getInitialState: function() {
      var year = this.props.attributes.year;
      var day = this.props.attributes.day;
      var monthIndex = this.props.attributes.monthIndex;
      return {
        inputDate: CopticCalendar.getNumericDateString(year, monthIndex, day),
        inputCopticDate: CopticCalendar.getCopticDateString(year, monthIndex, day)
      }
    },

    render: function() {
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
                <input type="text" value = {this.state.inputDate} placeholder="mm/dd/yyyy" onChange={this.handleDateInput}/>
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
      this.setState({inputDate: e.target.value});
      var res = e.target.value.match(/^\d{2}\/\d{2}\/\d{4}$/);
      if (res != null) {
        res = res[0].split("/");
        var monthIndex = parseInt(res[0]) - 1;
        var day = parseInt(res[1]);
        var year = parseInt(res[2]);
        NavActions.setDate(year, monthIndex, day);
      }
    },

    handleCheckbox: function(checkbox) {
      NavActions.setState(checkbox);
    }

});

module.exports = NavSubMenuItem;
