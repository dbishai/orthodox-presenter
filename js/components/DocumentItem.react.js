var React = require('react');
var ReactPropTypes = React.PropTypes;

var classNames = require('classnames');

var DocumentItem = React.createClass({

  propTypes: {
    documentItem: ReactPropTypes.object.isRequired,
    lightTheme: ReactPropTypes.bool.isRequired
  },

  render: function () {
    var documentItem = this.props.documentItem;
    var sectionTheme = this.props.lightTheme ? "main-section-light" : "main-section";
    var text = []
    for (var i = 0; i < documentItem.text.length; i++) {
      text.push(<p key={i} className={sectionTheme}>{documentItem.text[i]}</p>);
    }
    return (
      <div className="doc-item">
        <h4 className={sectionTheme}>{documentItem.user}</h4>
        {text}
      </div>
    );
  }

});

module.exports = DocumentItem;
