var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var DocumentItem = require('./DocumentItem.react');
var DocumentStore = require('../stores/DocumentStore');

function getSectionState() {
  return {
    allDocumentItems: DocumentStore.getAll()
  };
};

var MainSection = createReactClass({

  getInitialState: function () {
    return getSectionState();
  },

  propTypes: {
    attributes: PropTypes.object.isRequired
  },

  componentDidMount: function () {
    DocumentStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    DocumentStore.addChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function () {
    var allDocumentItems = this.state.allDocumentItems;
    if (allDocumentItems.length < 1) {
      return null;
    }
    var langStates = {
      eng: this.props.attributes.englishCheckbox,
      cop: this.props.attributes.copticCheckbox,
      ara: this.props.attributes.arabicCheckbox
    };

    var lightTheme = this.props.attributes.lightThemeCheckbox;

    var docItems = [];
    var numLangs = 0;
    var i = 0;

    // get number of languages set to true
    for (var l in langStates) {
      if (langStates[l]) {
        numLangs++;
      }
    }

    for (var document in allDocumentItems) {

      docItems.push(<DocumentItem key={document} lightTheme={lightTheme} langStates={langStates} numLangs={numLangs} documentItem={allDocumentItems[document]} />);
      i++;

    }

    return (
      <div id="page-content-wrapper">
        <div className="container-fluid">
          {docItems}
        </div>
      </div>
    );
  },

  _onChange: function () {
    this.setState(getSectionState());
  }

});

module.exports = MainSection;
