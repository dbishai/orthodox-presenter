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
            <div key={sectionItem.id} className="col-xs-6 col-sm-3 extra-padding">
                <h4 onClick = {this._onClick} className="section_title">
                  {sectionItem.title}
                </h4>
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
