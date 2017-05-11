var React = require('react');
var ReactPropTypes = React.PropTypes;

var Footer = React.createClass({

    propTypes: {
        menuToggleState: ReactPropTypes.bool.isRequired
    },

    render: function() {
        if (this.props.menuToggleState) {
            return (
                <div className="footer">
                <a href="https://github.com/dbishai/orthodox-presenter">
                <img src="/orthodox-presenter/images/GitHub-Mark-Light-32px.png"/></a>
                </div>
            );
        } else {
            return null;
        }
    }


});

module.exports = Footer;
