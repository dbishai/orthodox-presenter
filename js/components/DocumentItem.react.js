var React = require('react');
var ReactPropTypes = React.PropTypes;

var classNames = require('classnames');

var DocumentItem = React.createClass({

    propTypes: {
        documentItem: ReactPropTypes.object.isRequired
    },

    render: function() {
        var documentItem = this.props.documentItem;

          return (
            <div>
              <h4 className="main-section">{documentItem.user}</h4>
              <p className="main-section">{documentItem.text}</p>
            </div>
          );
    }

});

module.exports = DocumentItem;
