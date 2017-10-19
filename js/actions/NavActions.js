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
  },

  setState: function(state) {
    AppDispatcher.dispatch({
      actionType: OPConstants.SET_STATE,
      state: state
    });
  },

  setDate: function(year, monthIndex, day) {
    AppDispatcher.dispatch({
      actionType: OPConstants.SET_DATE,
      year: year,
      monthIndex: monthIndex,
      day: day
    });
  },

  setTime: function(time) {
    AppDispatcher.dispatch({
      actionType: OPConstants.SET_TIME,
      time: time
    });
  },

  setCategory: function(category) {
    AppDispatcher.dispatch({
      actionType: OPConstants.SET_CATEGORY,
      category: category
    });
  },

  toggleMenu: function() {
    AppDispatcher.dispatch({
      actionType: OPConstants.TOGGLE_MENU
    });
  }

};

module.exports = NavActions;
