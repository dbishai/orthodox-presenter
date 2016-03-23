var React = require('react');
var ReactPropTypes = React.PropTypes;
var DocumentItem = require('./DocumentItem.react');

var MainSection = React.createClass({

    propTypes: {
        allDocumentItems: ReactPropTypes.array.isRequired,
        englishCheckbox: ReactPropTypes.bool.isRequired,
        copticCheckbox: ReactPropTypes.bool.isRequired
    },

    /**
     * @return {object}
     */
    render: function() {
      if (this.props.allDocumentItems.length < 1) {
          return null;
      }
      var docEngItems = [];
      var docCopItems = [];
      var docAraItems = [];
      var allDocumentItems = this.props.allDocumentItems;
      var i = 0;
      for (var response in allDocumentItems[0].items) {
          docEngItems.push(<DocumentItem key={i} documentItem={allDocumentItems[0].items.response}/>);
      }
      for (var response in allDocumentItems[1].items) {
          docCopItems.push(<DocumentItem key={i} documentItem={allDocumentItems[1].items.response}/>);
      }
      for (var response in allDocumentItems[2].items) {
          docAraItems.push(<DocumentItem key={i} documentItem={allDocumentItems[2].items.response}/>);
      }
      var divEnglish = [];
      var divCoptic;
      if (this.props.englishCheckbox) {
        divEnglish.push(
            <div key = "eng" className="main-section">
              {docEngItems}
            </div>);
      }
      if (this.props.copticCheckbox) {
        divCoptic =
            <div style={{fontFamily: 'CSNewAthanasius'}} className="main-section">
              {docCopItems}
            </div>
      }

        return (
         <div id="page-content-wrapper">
          <div className="container-fluid">
              {divEnglish}
              {divCoptic}
          </div>
        </div>
        );
    }

});

module.exports = MainSection;
