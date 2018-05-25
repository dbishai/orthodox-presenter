var AppDispatcher = require('../dispatcher/AppDispatcher');
var OPConstants = require('../constants/OPConstants');

var NavActions = {

  next: function (id) {
    AppDispatcher.dispatch({
      actionType: OPConstants.NEXT,
      id: id
    });
  },

  prev: function (ids) {
    AppDispatcher.dispatch({
      actionType: OPConstants.PREV,
      ids: ids
    });
  },

  toggleState: function (state) {
    AppDispatcher.dispatch({
      actionType: OPConstants.TOGGLE_STATE,
      state: state
    });
  },

  setDate: function (moment) {
    AppDispatcher.dispatch({
      actionType: OPConstants.SET_DATE,
      moment: moment
    });
  },

  setTime: function (time) {
    AppDispatcher.dispatch({
      actionType: OPConstants.SET_TIME,
      time: time
    });
  },

  setCategory: function (category) {
    AppDispatcher.dispatch({
      actionType: OPConstants.SET_CATEGORY,
      category: category
    });
  },

  toggleMenu: function () {
    AppDispatcher.dispatch({
      actionType: OPConstants.TOGGLE_MENU
    });
  },

  setAttribute: function (key, value) {
    AppDispatcher.dispatch({
      actionType: OPConstants.SET_ATTRIBUTE,
      key: key,
      value: value
    });
  }

};

module.exports = NavActions;
