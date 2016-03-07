var React = require('react');
var ReactPropTypes = React.PropTypes;
var NavActions = require('../actions/NavActions');

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

        if (this.state.loadDoc && this.state.isLeaf) {
            return ( < p > {
                    sectionItem.load
                } < /p>
          );
        } else {
          return (
            <div key={sectionItem.id} className="col-xs-12 col-sm-12 col-md-6 section-item">
                <h1 onClick = {this._onClick} className="section_title">
                  <u>{sectionItem.title}</u>
                </h1>
                <div className="description">
                  <i>{sectionItem.description}</i>
                </div>
            </div >
            );
        }
    },

    _onClick: function() {
        var sectionItem = this.props.sectionItem;
        if (typeof sectionItem["node"] != 'undefined') {
            NavActions.next(sectionItem.id);
        }
    }

});

module.exports = SectionItem;
