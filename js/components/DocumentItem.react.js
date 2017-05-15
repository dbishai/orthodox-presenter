var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var classNames = require('classnames');

var DocumentItem = createReactClass({

  propTypes: {
    documentItem: PropTypes.object.isRequired,
    lightTheme: PropTypes.bool.isRequired,
    langStates: PropTypes.object.isRequired,
    numLangs: PropTypes.number.isRequired
  },

  langStyle: function (lang) {
    var divStyle = {};
    if (lang == "cop") {
      divStyle["fontFamily"] = "CSNewAthanasius";
      divStyle["fontSize"] = "18px";
    } else if (lang == "ara") {
      divStyle["text-align"] = "right";
      //divStyle["fontSize"] = "18px";
    }
    divStyle["width"] = Math.floor(100 / this.props.numLangs) - 2 + "%";
    return divStyle;
  },

  createDocumentElement: function (doc, elementType, theme) {
    var text = [];
    for (var lang in doc) {
      if (!this.props.langStates[lang]) {
        continue;
      }


      if (Array.isArray(doc[lang])) {
        for (var i = 0; i < doc[lang].length; i++) {
          var element = React.createElement(
            elementType,
            { className: theme },
            doc[lang][i]
          );
          text.push(
            <div key={elementType + lang + i} className="doc-item" style={this.langStyle(lang)}>
              {element}
            </div>
          );
        }
      } else {
        var element = React.createElement(
          elementType,
          { className: theme },
          doc[lang]
        );
        text.push(
          <div key={elementType + lang} className="doc-item" style={this.langStyle(lang)}>
            {element}
          </div>
        );
      }
    }
    return text;
  },

  splitArray: function (array) {
    var newArray = []
    var numLangs = this.props.numLangs;
    var offset = array.length / numLangs;

    for (var i = 0; i < array.length; i+=numLangs) {
      for (var j = 0; j < numLangs; j++) {
        newArray[i + j] = array[offset * j + i / numLangs]
      }
    }

    return newArray;
  },

  parseDocument: function (keys, elementType, theme) {
    var text = []
    var doc = this.props.documentItem;

    doc = doc[keys[0]];

    // TODO: improve this method, too hacky
    if (Array.isArray(doc)) {
      for (var i = 0; i < doc.length; i++) {
        text = text.concat(this.createDocumentElement(doc[i][keys[1]], elementType, theme));
      }

    } else {
      text = this.createDocumentElement(doc, elementType, theme);
    }

    text = this.splitArray(text);
    return (
      <div key={keys[0] + elementType} className="doc-row">
        {text}
      </div>
    );
  },

  render: function () {
    var documentItem = this.props.documentItem;
    var sectionTheme = this.props.lightTheme ? "main-section-light" : "main-section";
    var collection = []

    collection = [
      this.parseDocument(["title"], "h3", sectionTheme),
      this.parseDocument(["items", "user"], "h4", sectionTheme),
      this.parseDocument(["items", "text"], "p", sectionTheme)
    ]

    return (
      <div key={"doc-item-" + Object.keys(documentItem).length} className="main-section">
        {collection}
      </div>
    );
  }

});

module.exports = DocumentItem;