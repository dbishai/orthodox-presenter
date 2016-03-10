var AppDispatcher = require('../dispatcher/AppDispatcher');
var OPConstants = require('../constants/OPConstants');

var SectionActions = {

  load: function(doc) {
    AppDispatcher.dispatch({
      actionType: OPConstants.LOAD,
      doc: doc
    });
  }

};

module.exports = SectionActions;
