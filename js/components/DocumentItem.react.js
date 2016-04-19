var React = require('react');
var ReactPropTypes = React.PropTypes;

var classNames = require('classnames');

var DocumentItem = React.createClass({

    propTypes: {
        documentItem: ReactPropTypes.object.isRequired,
        lightTheme: ReactPropTypes.bool.isRequired
    },

    render: function() {
        var documentItem = this.props.documentItem;
        var sectionTheme = this.props.lightTheme ? "main-section-light" : "main-section";

          return (
            <div>
              <h4 className={sectionTheme}>{documentItem.user}</h4>
              <p className={sectionTheme}>{documentItem.text}</p>
            </div>
          );
    }

});

module.exports = DocumentItem;
