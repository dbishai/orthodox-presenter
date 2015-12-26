var MainSection = require('./MainSection.react');
var React = require('react');
var SectionStore = require('../stores/SectionStore');

/**
 * Retrieve the current Section data from the SectionStore
 */
function getSectionState() {
  return {
    allSections: SectionStore.getAll()
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
      <div>
        <MainSection
          allSections={this.state.allSections}
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
