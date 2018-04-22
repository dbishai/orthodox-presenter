var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');

var Footer = createReactClass({

    propTypes: {
        menuToggleState: PropTypes.bool.isRequired
    },

    render: function () {
        if (this.props.menuToggleState) {
            return (
                <div className="footer">
                    <a href="https://github.com/dbishai/orthodox-presenter">
                        <img src="/images/GitHub-Mark-Light-32px.png" /></a>
                </div>
            );
        } else {
            return null;
        }
    }


});

module.exports = Footer;
