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
      divStyle["textAlign"] = "right";
      //divStyle["fontSize"] = "18px";
    }
    divStyle["width"] = Math.floor(100 / this.props.numLangs) + "%";
    return divStyle;
  },

  createDocumentElement: function (doc, elementType, theme, idx) {
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
            <div key={elementType + lang + i + idx} className="doc-item" style={this.langStyle(lang)}>
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
          <div key={elementType + lang + idx} className="doc-item" style={this.langStyle(lang)}>
            {element}
          </div>
        );
      }
    }
    return this.swapArray(text);
  },

  swapArray: function (array) {
    var newArray = []
    var numLangs = this.props.numLangs;
    var offset = array.length / numLangs;

    for (var i = 0; i < array.length; i += numLangs) {
      for (var j = 0; j < numLangs; j++) {
        newArray[i + j] = array[offset * j + i / numLangs]
      }
    }

    return newArray;
  },

  parseDocument: function (doc, elementType, theme, idx) {
    var text = this.createDocumentElement(doc, elementType, theme);

    return (
      <div key={idx + elementType} className="doc-row">
        {text}
      </div>
    );
  },


  render: function () {
    var documentItem = this.props.documentItem;
    var sectionTheme = this.props.lightTheme ? "main-section-light" : "main-section";
    var collection = []

    collection = [
      this.parseDocument(documentItem.title, "h3", sectionTheme)
    ]

    for (var i = 0; i < documentItem.items.length; i++) {
      collection.push(this.parseDocument(documentItem.items[i].user, "h4", sectionTheme, i))
      collection.push(this.parseDocument(documentItem.items[i].text, "p", sectionTheme, i))
    }

    return (
      <div key={"doc-item-" + Object.keys(documentItem).length} className="main-section">
        {collection}
      </div>
    );
  }

});

module.exports = DocumentItem;