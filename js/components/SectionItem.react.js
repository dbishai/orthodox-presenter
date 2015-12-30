var React = require('react');
var ReactPropTypes = React.PropTypes;
var SectionActions = require('../actions/SectionActions');

var classNames = require('classnames');

var SectionItem = React.createClass({

    propTypes: {
        section: ReactPropTypes.object.isRequired
    },

    getInitialState: function() {
        return {
            isLeaf: false
        };
    },

    render: function() {
        var section = this.props.section;

        return (<div key={section.id} className="col-xs-6 col-sm-3 extra-padding">
          <span className="glyphicon glyphicon-cloud" onClick={this._onClick}> </span>
              <h4 onClick={this._onClick}>
              {section.title}
              </h4>
          </div>);
    },

    _onClick: function() {
        if (typeof this.props.section["node"] != 'undefined') {
            SectionActions.updateAll(this.props.section.id);
        } else {
            this.setState({
                isLeaf: true
            });
        }
    }

});

module.exports = SectionItem;
