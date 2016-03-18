var React = require('react');
var MainSection = require('./MainSection.react');
var NavMenu = require('./NavMenu.react');
var SectionStore = require('../stores/SectionStore');
var NavStore = require('../stores/NavStore');
var NavMenuStore = require('../stores/NavMenuStore');
var DocumentStore = require('../stores/DocumentStore');

/**
 * Retrieve the current Section data from the SectionStore
 */
function getSectionState() {
  return {
    allSectionItems: SectionStore.getAll(),
    allNavMenuItems: NavMenuStore.getAll(),
    allDocumentItems: DocumentStore.getAll(),
    allNavItems: NavStore.getAll()
  };
}

var OrthodoxPresenterApp = React.createClass({

  getInitialState: function() {
    return getSectionState();
  },

  componentDidMount: function() {
    SectionStore.addChangeListener(this._onChange);
    DocumentStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SectionStore.removeChangeListener(this._onChange);
    DocumentStore.addChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div id="wrapper">
        <NavMenu
          allNavMenuItems={this.state.allNavMenuItems}
          allSectionItems={this.state.allSectionItems}
          allNavItems={this.state.allNavItems}
          allDocumentItems={this.state.allDocumentItems}
        />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from stores
   */
  _onChange: function() {
    this.setState(getSectionState());
  }

});

module.exports = OrthodoxPresenterApp;
