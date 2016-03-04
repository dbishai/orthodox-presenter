var AppDispatcher = require('../dispatcher/AppDispatcher');
var OPConstants = require('../constants/OPConstants');

var NavActions = {

  next: function(id) {
    AppDispatcher.dispatch({
      actionType: OPConstants.NEXT,
      id: id
    });
  },

  prev: function(ids) {
    AppDispatcher.dispatch({
      actionType: OPConstants.PREV,
      ids: ids
    });
  }

};

module.exports = NavActions;
