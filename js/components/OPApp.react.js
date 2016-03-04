var React = require('react');
var MainSection = require('./MainSection.react');
var NavMenu = require('./NavMenu.react');
var SectionStore = require('../stores/SectionStore');
var NavStore = require('../stores/NavStore');
var NavMenuStore = require('../stores/NavMenuStore');

/**
 * Retrieve the current Section data from the SectionStore
 */
function getSectionState() {
  return {
    allSections: SectionStore.getAll(),
    allNavMenuItems: NavMenuStore.getAll(),
    allCommands: NavStore.getCommands()
  };
}

var OrthodoxPresenterApp = React.createClass({

  getInitialState: function() {
    return getSectionState();
  },

  componentDidMount: function() {
    SectionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SectionStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div id="wrapper">
        <NavMenu
          allNavMenuItems={this.state.allNavMenuItems}
        />
        <MainSection
          allSections={this.state.allSections}
          allCommands={this.state.allCommands}
        />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the SectionStore
   */
  _onChange: function() {
    this.setState(getSectionState());
  }

});

module.exports = OrthodoxPresenterApp;
