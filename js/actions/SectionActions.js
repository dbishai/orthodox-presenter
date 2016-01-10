var AppDispatcher = require('../dispatcher/AppDispatcher');
var OPConstants = require('../constants/OPConstants');

var SectionActions = {

  /**
   * @param  {string} id
   */
  next: function(id) {
    AppDispatcher.dispatch({
      actionType: OPConstants.NEXT,
      id: id
    });
  }

};

module.exports = SectionActions;
