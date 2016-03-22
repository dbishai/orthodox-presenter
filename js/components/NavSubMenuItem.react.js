var React = require('react');
var ReactDOM = require('react-dom');
var ReactPropTypes = React.PropTypes;

var classNames = require('classnames');

var NavSubMenuItem = React.createClass({

    propTypes: {
        navMenuItemId: ReactPropTypes.string.isRequired,
        englishCheckbox: ReactPropTypes.bool.isRequired,
        copticCheckbox: ReactPropTypes.bool.isRequired
    },

    componentDidMount: function() {
        var toggleSwitch = ReactDOM.findDOMNode(this.refs.toggleSwitch);
        $(toggleSwitch).bootstrapToggle();
    },

    bootstrapToggle: function(input) {
      $(ReactDOM.findDOMNode(input)).bootstrapToggle();
    },

    render: function() {
        var navMenuItemId = this.props.navMenuItemId;
        switch (navMenuItemId) {
          case "lang":
            return (
              <div className="nav-sub-menu-item">
                <div className="checkbox">
                 <label><input checked={this.props.englishCheckbox} type="checkbox" data-toggle="toggle" data-size="mini"
                 onChange={this.handleEnglishCheckbox} aria-label="..."/>English</label>
                </div>
                <div className="checkbox">
                 <label><input ref={this.bootstrapToggle} checked={this.props.copticCheckbox} type="checkbox" data-toggle="toggle" data-size="mini"
                 onChange={this.handleCopticCheckbox} aria-label="..."/>Coptic</label>
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
