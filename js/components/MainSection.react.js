var React = require('react');
var ReactPropTypes = React.PropTypes;
var DocumentItem = require('./DocumentItem.react');
var DocumentStore = require('../stores/DocumentStore');

function getSectionState() {
  return {
    allDocumentItems: DocumentStore.getAll()
  };
};

var MainSection = React.createClass({

  getInitialState: function () {
    return getSectionState();
  },

  propTypes: {
    attributes: ReactPropTypes.object.isRequired
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
      for (var lang in allDocumentItems[document]) {
        if (!langStates[lang]) {
          continue;
        }

        var divStyle = {};
        var tmp = [];
        if (lang == "cop") {
          divStyle["fontFamily"] = "CSNewAthanasius";
          divStyle["fontSize"] = "18px";
        } else if (lang == "ara") {
          divStyle["text-align"] = "right";
          //divStyle["fontSize"] = "18px";
        }
        divStyle["width"] = Math.floor((1 / numLangs) * 100) - 2 + "%";

        for (var response in allDocumentItems[document][lang]["items"]) {
          tmp.push(<DocumentItem key={lang + i} lightTheme={lightTheme} documentItem={allDocumentItems[document][lang]["items"][response]}/>);
          i++;
        }

        docItems.push(
          <div key={"div" + lang + i} style={divStyle} className="main-section">
            <div className={"doc-title"} style={allDocumentItems[document][lang]["title"] == "" ? {height: "0px"} : null}>
              <h3 className={lightTheme ? "main-section-light" : "main-section"}>{allDocumentItems[document][lang]["title"]}</h3>
            </div>
            {tmp}
          </div>
        );
      }
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
