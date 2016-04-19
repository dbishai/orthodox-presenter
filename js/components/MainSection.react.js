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

    getInitialState: function() {
      return getSectionState();
    },

    propTypes: {
        attributes: ReactPropTypes.object.isRequired
    },

    componentDidMount: function() {
      DocumentStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
      DocumentStore.addChangeListener(this._onChange);
    },

    /**
     * @return {object}
     */
    render: function() {
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

      // get number of languages set to true
      for (var l in langStates) {
        if (langStates[l]) {
          numLangs++;
        }
      }

      for (var lang in allDocumentItems) {
          if (!langStates[lang]) {
            continue;
          }
          var i = 0
          var divStyle = {};
          var tmp = [];
          if (lang == "cop") {
            divStyle["fontFamily"] = "CSNewAthanasius";
          }
          divStyle["width"] = Math.floor((1 / numLangs) * 100) + "%";

          for (var response in allDocumentItems[lang]["items"]) {
            tmp.push(<DocumentItem key={lang + i} lightTheme={lightTheme} documentItem={allDocumentItems[lang]["items"][response]}/>);
            i++;
          }

          docItems.push(
              <div key={lang} style={divStyle} className="main-section">
                <h3 className={lightTheme ? "main-section-light" : "main-section"}>{allDocumentItems[lang]["title"]}</h3>
                {tmp}
              </div>
              );
      }

        return (
         <div id="page-content-wrapper">
          <div className="container-fluid">
              {docItems}
          </div>
        </div>
        );
    },

    _onChange: function() {
      this.setState(getSectionState());
    }

});

module.exports = MainSection;
