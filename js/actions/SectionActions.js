var AppDispatcher = require('../dispatcher/AppDispatcher');
var OPConstants = require('../constants/OPConstants');

var SectionActions = {

  load: function(doc, attributes) {
    AppDispatcher.dispatch({
      actionType: OPConstants.LOAD,
      doc: doc,
      attributes: attributes
    });
  }

};

module.exports = SectionActions;
