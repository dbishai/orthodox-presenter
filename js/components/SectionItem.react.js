var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var NavActions = require('../actions/NavActions');
var SectionActions = require('../actions/SectionActions');
var NavSubMenuStore = require('../stores/NavSubMenuStore');
var classNames = require('classnames');

var SectionItem = createReactClass({

    propTypes: {
        sectionItem: PropTypes.object.isRequired,
        attributes: PropTypes.object.isRequired
    },

    getInitialState: function () {
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

    componentDidMount: function () {
        NavSubMenuStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        NavSubMenuStore.removeChangeListener(this._onChange);
    },
    componentWillUpdate: function () {
        var sectionItem = this.props.sectionItem;
        var attributes = this.props.attributes;
        SectionActions.load(sectionItem.load, attributes);
    },

    render: function () {
        var sectionItem = this.props.sectionItem;

        return (
            <li key={sectionItem.id} className="sidebar-brand nav-menu-item" onClick={this._onClick}>
                <a href="#">{sectionItem.title}</a>
            </li>
        );
    },

    _onClick: function () {
        var sectionItem = this.props.sectionItem;
        var attributes = this.props.attributes;
        if (typeof sectionItem["node"] != 'undefined') {
            NavActions.next(sectionItem.id);
        } else if (this.state.loadDoc && this.state.isLeaf) {
            SectionActions.load(sectionItem.load, attributes);
        }
    },

    _onChange: function () {
        var sectionItem = this.props.sectionItem;
        var attributes = this.props.attributes;
        //SectionActions.load(sectionItem.load, attributes);
    }
});

module.exports = SectionItem;
