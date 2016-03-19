var React = require('react');
var ReactPropTypes = React.PropTypes;
var NavActions = require('../actions/NavActions');
var SectionActions = require('../actions/SectionActions');

var classNames = require('classnames');

var SectionItem = React.createClass({

    propTypes: {
        sectionItem: ReactPropTypes.object.isRequired
    },

    getInitialState: function() {
        var states = {
            isLeaf: false,
            loadDoc: false
        }
        if (typeof this.props.sectionItem["node"] === 'undefined') {
            states.isLeaf = true;
        }
        if (typeof this.props.sectionItem["load"] != 'undefined') {
            states.loadDoc = true;
        }
        return states;
    },

    render: function() {
        var sectionItem = this.props.sectionItem;

          return (
            <li key={sectionItem.id} className="sidebar-brand nav-menu-item" onClick={this._onClick}>
              <a href="#">{sectionItem.title}</a>
            </li>
          );
    },

    _onClick: function() {
        var sectionItem = this.props.sectionItem;
        if (typeof sectionItem["node"] != 'undefined') {
            NavActions.next(sectionItem.id);
        } else if (this.state.loadDoc && this.state.isLeaf) {
            SectionActions.load(sectionItem.load);
        }
    }

});

module.exports = SectionItem;
