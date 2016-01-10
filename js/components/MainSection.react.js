var React = require('react');
var ReactPropTypes = React.PropTypes;
var SectionItem = require('./SectionItem.react');
var NavItem = require('./NavItem.react');

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

        // menu navigation commands
        var allCommands = { 
          0: {"action": "back"}
        };
        var commands = [];

        // stack keeps track of menu nodes
        var nodeStack = {"nodes": []};

        for (var key in allCommands) {
            commands.push(<NavItem key={key} command={allCommands[key]} stack={nodeStack}/>);
        }

        for (var key in allSections) {
            sections.push(<SectionItem key={key} section={allSections[key]} stack={nodeStack}/>);
        }

        return (
          <section id="sections">
            {commands}
            <div className="row placeholders">
              {sections}
            </div>
          </section>
        );
    },

});

module.exports = MainSection;
