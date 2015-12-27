var React = require('react');
var ReactPropTypes = React.PropTypes;
var SectionItem = require('./SectionItem.react');

var MainSection = React.createClass({

    propTypes: {
        allSections: ReactPropTypes.object.isRequired
    },

    /**
     * @return {object}
     */
    render: function() {
        if (Object.keys(this.props.allSections).length < 1) {
            return null;
        }
        var allSections = this.props.allSections;
        var sections = [];

        for (var key in allSections) {
            sections.push(<SectionItem key={key} section={allSections[key]} />);
        }
        return (
            <section id="sections">
          <div className="row placeholders">
            {sections}
          </div>
      </section>
        );
    },

});

module.exports = MainSection;
