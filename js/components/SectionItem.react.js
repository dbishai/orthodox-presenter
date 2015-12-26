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

    /**
     * @return {object}
     */
    render: function() {
        var section = this.props.section;

        // List items should get the class 'editing' when editing
        // and 'completed' when marked as completed.
        // Note that 'completed' is a classification while 'complete' is a state.
        // This differentiation between classification and state becomes important
        // in the naming of view actions toggleComplete() vs. destroyCompleted().
        return (<div key={section.id} className="col-xs-6 col-sm-3 extra-padding">
          <span className="glyphicon glyphicon-cloud" onClick={this._onClick}> </span>
              <h4 onClick={this._onClick}>
              {section.title}
              </h4>
          </div>);
    },

    _onClick: function() {
        if (typeof this.props.section["sub"] != 'undefined') {
            SectionActions.updateAll(this.props.section.id);
        } else {
            this.setState({
                isLeaf: true
            });
        }
    }

});

module.exports = SectionItem;
