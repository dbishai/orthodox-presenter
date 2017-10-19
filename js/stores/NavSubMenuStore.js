var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var OPConstants = require('../constants/OPConstants');
var assign = require('object-assign');
var moment = require('moment');
var CHANGE_EVENT = 'change';

var today = moment();
/*
var hours = today.getHours();

var getTimeOfDay = function(hours) {
  return hours < 12 ? "am" : "pm";
};
*/
Attributes = {
  englishCheckbox: true,
  copticCheckbox: true,
  arabicCheckbox: false,
  lightThemeCheckbox: false,
  presentationModeCheckbox: false,
  todayDate: today,
  day: today.date(),
  monthIndex: today.month(),
  year: today.year(),
  time: today.hours()
};

var setState = function(state) {
  Attributes[state] = !Attributes[state];
};

var setDate = function(year, monthIndex, day) {
  Attributes.year = year;
  Attributes.monthIndex = monthIndex;
  Attributes.day = day;
};

var setTime = function(time) {
  Attributes.time = time;
};

var NavSubMenuStore = assign({}, EventEmitter.prototype, {

    /**
     * @return {object}
     */
    getAll: function() {
        return Attributes;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {

    switch (action.actionType) {
        case OPConstants.SET_STATE:
            setState(action.state);
            NavSubMenuStore.emitChange();
            break;
        case OPConstants.SET_DATE:
            setDate(action.year, action.monthIndex, action.day);
            NavSubMenuStore.emitChange();
            break;
        case OPConstants.SET_TIME:
            setTime(action.time);
            NavSubMenuStore.emitChange();
            break;
    }
});

module.exports = NavSubMenuStore;
