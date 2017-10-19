var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var OPConstants = require('../constants/OPConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var MenuToggle = true;

var Commands = {
    0: {
        "id": 0,
        "action": "back",
        "span_class": "glyphicon glyphicon-arrow-left"
    }
};

var nodeStack = [];
var Category = "";

function next(id) {
    nodeStack.push(id);
}

function prev() {
    nodeStack.pop();
}

function toggle() {
    MenuToggle = !MenuToggle;
}

function setCategory(_category) {
    Category = _category;
}

var NavStore = assign({}, EventEmitter.prototype, {

    /**
     * Get the entire collection of SECTIONs.
     * @return {object}
     */
    getCommands: function () {
        return Commands;
    },

    getToggleState: function () {
        return MenuToggle;
    },

    getStack: function () {
        return nodeStack;
    },

    getCategory: function() {
        return Category;
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
        case OPConstants.NEXT:
            next(action.id);
            NavStore.emitChange();
            break;
        case OPConstants.PREV:
            prev();
            NavStore.emitChange();
            break;
        case OPConstants.TOGGLE_MENU:
            toggle();
            NavStore.emitChange();
            break;
        case OPConstants.SET_CATEGORY:
            setCategory(action.category);
            NavStore.emitChange();
            break;

    }
});

module.exports = NavStore;
