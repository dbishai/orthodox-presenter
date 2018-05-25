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
    time: today.hours(),
    fontScale: 1,
    autoLoad: true
};

var toggleState = function (state) {
    Attributes[state] = !Attributes[state];
};

var setDate = function (_moment) {
    Attributes.todayDate = _moment;
    Attributes.year = _moment.year();
    Attributes.monthIndex = _moment.month();
    Attributes.day = _moment.date();
};

var setTime = function (time) {
    Attributes.time = time;
};

var setAttribute = function (key, value) {
    Attributes[key] = value;
};

var NavSubMenuStore = assign({}, EventEmitter.prototype, {

    /**
     * @return {object}
     */
    getAll: function () {
        return Attributes;
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function (action) {

    switch (action.actionType) {
        case OPConstants.TOGGLE_STATE:
            toggleState(action.state);
            NavSubMenuStore.emitChange();
            break;
        case OPConstants.SET_DATE:
            setDate(action.moment);
            NavSubMenuStore.emitChange();
            break;
        case OPConstants.SET_TIME:
            setTime(action.time);
            NavSubMenuStore.emitChange();
            break;
        case OPConstants.SET_ATTRIBUTE:
            setAttribute(action.key, action.value);
            NavSubMenuStore.emitChange();
            break;
    }
});

module.exports = NavSubMenuStore;
