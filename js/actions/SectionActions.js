var AppDispatcher = require('../dispatcher/AppDispatcher');
var OPConstants = require('../constants/OPConstants');

var SectionActions = {

  /**
   * @param  {string} id
   */
  updateAll: function(id) {
    AppDispatcher.dispatch({
      actionType: OPConstants.UPDATE_ALL,
      id: id
    });
  }

};

module.exports = SectionActions;
