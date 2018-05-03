var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var DocumentStore = require('../stores/DocumentStore');
var TableOfContentsItem = require('./TableOfContentsItem.react');
var idFormatter = require('./DocumentItem.react').idFormatter;

function getSectionState() {
  return {
    allDocumentItems: DocumentStore.getAll()
  };
};

var TableOfContents = createReactClass({

  getInitialState: function () {
    return getSectionState();
  },

  propTypes: {
    //attributes: PropTypes.object.isRequired
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
    var tableOfContentsItems = [];
    var i = 0;

    var allDocumentItems = this.state.allDocumentItems;
    for (var document in allDocumentItems) {
      var title = allDocumentItems[document].title.eng;
      var visible = allDocumentItems[document].visible;
      if (typeof title !== "undefined" && title !== "" && visible !== "false") {
        tableOfContentsItems.push(<TableOfContentsItem key={i} id={idFormatter(title)} title={title} />);
        i++;
      }
    }


    return (
      <div className="sidebar-brand table-of-contents" >
        <ol>
          {tableOfContentsItems}
        </ol>
      </div>
    );
  },

  _onChange: function () {
    this.setState(getSectionState());
  }

});

module.exports = TableOfContents;
