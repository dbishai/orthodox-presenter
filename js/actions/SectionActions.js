var AppDispatcher = require('../dispatcher/AppDispatcher');
var OPConstants = require('../constants/OPConstants');

var SectionActions = {

  load: function(doc, attributes) {
    AppDispatcher.dispatch({
      actionType: OPConstants.LOAD,
      doc: doc,
      attributes: attributes
    });
  },

  refresh: function(attributes) {
    AppDispatcher.dispatch({
      actionType: OPConstants.REFRESH,
      attributes: attributes
    });
  }

};

module.exports = SectionActions;
