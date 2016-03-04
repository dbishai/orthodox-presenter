var React = require('react');
var ReactPropTypes = React.PropTypes;
var SectionItem = require('./SectionItem.react');
var NavItem = require('./NavItem.react');

var MainSection = React.createClass({

    propTypes: {
        allSections: ReactPropTypes.object.isRequired,
        allCommands: ReactPropTypes.object.isRequired
    },

    /**
     * @return {object}
     */
    render: function() {
        if (Object.keys(this.props.allSections).length < 1) {
            return null;
        }

        var sectionItems = [];
        var commands = [];

        // menu sections
        var allSections = this.props.allSections;

        // nav commands
        var allCommands = this.props.allCommands;

        // menu navigation commands

        for (var key in allCommands) {
            commands.push(<NavItem key={key} command={allCommands[key]}/>);
        }

        for (var key in allSections) {
            sectionItems.push(<SectionItem key={key} sectionItem={allSections[key]}/>);
        }

        return (
        <div id="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div>
                  <section id="sections">
                    {commands}
                    <div className="row placeholders">
                      {sectionItems}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
    }

});

module.exports = MainSection;
