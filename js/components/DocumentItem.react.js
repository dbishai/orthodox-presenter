var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var classNames = require('classnames');

var Subs = Object.assign(
  require('../../docs/helpers/users.json'),
  require('../../docs/helpers/common.json')
);

var idFormatter = function (title) {
  return title.toLowerCase().replace(/\s/g, "-");
};


var DocumentItem = createReactClass({

  propTypes: {
    documentItem: PropTypes.object.isRequired,
    lightTheme: PropTypes.bool.isRequired,
    langStates: PropTypes.object.isRequired,
    numLangs: PropTypes.number.isRequired,
    fontScale: PropTypes.number.isRequired
  },

  getInitialState: function () {
    return {
      showDocument: true
    }
  },

  defaultLangOrderList: ["eng", "cop", "ara"],

  BlackList: [],

  langStyle: function (elementType, lang, numLangs) {
    var fontScale = this.props.fontScale;
    var fontSize;
    switch (elementType) {
      case "h3":
        fontSize = 24;
        break;
      case "h4":
        fontSize = 18;
        break;
      default:
        fontSize = 16;
    }
    var divStyle = {
      fontSize: Math.floor(fontSize * fontScale) + "px"
    };
    if (lang == "cop") {
      divStyle["fontFamily"] = "CSNewAthanasius";
    } else if (lang == "ara") {
      divStyle["textAlign"] = "right";
    }
    divStyle["width"] = Math.floor(100 / numLangs) + "%";
    return divStyle;
  },

  buildBlackList: function (doc) {
    this.BlackList = []
    for (var i = 0; i < this.defaultLangOrderList.length; i++) {
      var lang = this.defaultLangOrderList[i];
      /*
      check for the following:
      - language is not checked in interface
      - value of language key is collection of empty strings
      - value of language key is empty string
      - key is not defined
      */
      if (!this.props.langStates[lang] || (Array.isArray(doc[lang]) && doc[lang].every(function (val) { return val === "" }))
        || (doc[lang] === "" || typeof doc[lang] == "undefined")) {
        this.BlackList.push(lang);
      }
    }
  },

  createDocumentElement: function (doc, elementType, theme, idx) {
    var text = [];

    // order of languages to be displayed
    var langs = this.defaultLangOrderList;
    // get number of languages that will actually be displayed in order to properly size divs
    var numLangs = langs.length - this.BlackList.length;

    for (var i = 0; i < langs.length; i++) {

      var lang = langs[i];

      // check if language is in blacklist
      if (this.BlackList.indexOf(lang) != -1) {
        continue;
      }

      var langStyle = this.langStyle(elementType, lang, numLangs);

      if (Array.isArray(doc[lang])) {
        for (var j = 0; j < doc[lang].length; j++) {
          var element = React.createElement(
            elementType,
            { className: theme },
            doc[lang][j]
          );
          text.push(
            <div key={elementType + lang + j + idx} className="doc-item" style={langStyle}>
              {element}
            </div>
          );
        }
      } else {
        // allow titles of documents to be collapsible
        if (elementType == "h3" && !this.state.showDocument) {
          var element = <h3 className={theme}>
            <span className="glyphicon glyphicon-triangle-right main-section-title" aria-hidden="true"></span> {doc[lang]}
          </h3>
        } else if (elementType == "h3" && this.state.showDocument) {
          var element = <h3 className={theme}>
            <span className="glyphicon glyphicon-triangle-bottom main-section-title" aria-hidden="true"></span> {doc[lang]}
          </h3>
        } else {
          var element = React.createElement(
            elementType,
            { className: theme },
            doc[lang]
          );
        }
        text.push(
          <div key={elementType + lang + idx} className="doc-item" style={langStyle}>
            {element}
          </div>
        );
      }
    }
    return this.swapArray(text, numLangs);
  },

  swapArray: function (array, numLangs) {
    var newArray = []
    var offset = array.length / numLangs;

    for (var i = 0; i < array.length; i += numLangs) {
      for (var j = 0; j < numLangs; j++) {
        newArray[i + j] = array[offset * j + i / numLangs]
      }
    }

    return newArray;
  },

  parseDocument: function (doc, elementType, theme, idx) {
    var text = this.createDocumentElement(doc, elementType, theme, idx);

    return (
      <div key={idx + elementType} className="doc-row" onClick={elementType == "h3" ? this._onClick : null}>
        {text}
      </div>
    );
  },

  macroReplace: function (doc) {
    // substitute helper string for actual content
    if (typeof doc == "string") {
      return Subs[doc];
    }
    return doc;
  },

  componentWillReceiveProps: function (newProps) {
    /*
      default components back to true when receiving new props unless "visible" tag
      is set to "false"
    */
    if (newProps.documentItem != this.props.documentItem) {
      this.setState({ showDocument: newProps.documentItem.visible !== "false" });
    }
  },

  componentWillMount: function () {
    // collapse any documents that have the 'visible' tag set to false
    if (this.props.documentItem.visible === "false") {
      this.setState({ showDocument: false });
    }
  },

  render: function () {
    var documentItem = this.props.documentItem;
    var lightTheme = this.props.lightTheme;
    var showDocument = this.state.showDocument;

    var sectionTheme = "main-section";
    if (!showDocument && lightTheme) {
      sectionTheme += " main-section-light-hidden";
    } else if (!showDocument && !lightTheme) {
      sectionTheme += " main-section-hidden";
    } else if (lightTheme) {
      sectionTheme += " main-section-light";
    }

    /*
    blacklist is created for title and text seperately due to certain documents not
    having all languages filled in for all parts
    */
    this.buildBlackList(documentItem.title);
    var collection = [
      this.parseDocument(documentItem.title, "h3", sectionTheme, 0)
    ];

    if (showDocument) {
      for (var i = 0; i < documentItem.items.length; i++) {
        /*
        text item is source of truth for blacklist due to user being defined by helper macro
        which contains several languages
        */
        var user = this.macroReplace(documentItem.items[i].user);
        var text = this.macroReplace(documentItem.items[i].text);

        this.buildBlackList(text);

        if (typeof user !== "undefined") {
          var userTheme = sectionTheme;
          // user specific colors
          if (typeof user.eng !== "undefined") {
            userTheme += "-" + user.eng.toLowerCase();
          }
          collection.push(this.parseDocument(user, "h4", userTheme, i))
        }

        collection.push(this.parseDocument(text, "p", sectionTheme, i))
      }
    }

    return (
      <div key={"doc-item-" + documentItem.title.eng} id={idFormatter(documentItem.title.eng)} className="main-section">
        {collection}
      </div>
    );
  },

  _onClick: function () {
    this.setState({ showDocument: !this.state.showDocument });
  }

});

module.exports = DocumentItem;
module.exports.idFormatter = idFormatter;
