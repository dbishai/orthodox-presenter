var React = require('react');
var ReactPropTypes = React.PropTypes;
var SectionActions = require('../actions/SectionActions');

var classNames = require('classnames');

var SectionItem = React.createClass({

    propTypes: {
        section: ReactPropTypes.object.isRequired,
        stack: ReactPropTypes.object.isRequired
    },

    getInitialState: function() {
        return {
            isLeaf: false
        };
    },

    render: function() {
        var section = this.props.section;

        if (this.state.isLeaf) {
          return null;
        } else {
          return (<div key={section.id} className="col-xs-6 col-sm-3 extra-padding">
            <span className="glyphicon glyphicon-cloud menu-item" onClick={this._onClick}> </span>
                <h4 onClick={this._onClick}>
                {section.title}
                </h4>
            </div>);
        }
    },

    _onClick: function() {
        var section = this.props.section;
        var stack = this.props.stack;
        if (typeof section["node"] != 'undefined') {
            stack["nodes"].push(section.id);
            SectionActions.next(section.id);
        } else {
            this.setState({
                isLeaf: true
            });
        }
    }

});

module.exports = SectionItem;
