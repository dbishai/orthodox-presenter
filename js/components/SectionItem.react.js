var React = require('react');
var ReactPropTypes = React.PropTypes;
var NavActions = require('../actions/NavActions');

var classNames = require('classnames');

var SectionItem = React.createClass({

    propTypes: {
        sectionItem: ReactPropTypes.object.isRequired
    },

    getInitialState: function() {
        return {
            isLeaf: false
        };
    },

    render: function() {
        var sectionItem = this.props.sectionItem;

        if (this.state.isLeaf) {
          return null;
        } else {
          return (
            <div key={sectionItem.id} className="col-xs-6 col-sm-3 extra-padding">
              <span className="glyphicon glyphicon-cloud menu-item" onClick={this._onClick}> </span>
              <h4 onClick={this._onClick}>
                {sectionItem.title}
              </h4>
            </div>);
        }
    },

    _onClick: function() {
        var sectionItem = this.props.sectionItem;
        var stack = this.props.stack;
        if (typeof sectionItem["node"] != 'undefined') {
          NavActions.next(sectionItem.id);
        } else {
            this.setState({
                isLeaf: true
            });
        }
    }

});

module.exports = SectionItem;
