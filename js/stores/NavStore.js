var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var OPConstants = require('../constants/OPConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var Commands = { 
  0: {
    "id" : 0,
    "action": "back"
  }
};

var nodeStack = [];

function next(id) {
  nodeStack.push(id);
}

function prev() {
  nodeStack.pop();
}

var NavStore = assign({}, EventEmitter.prototype, {

    /**
     * Get the entire collection of SECTIONs.
     * @return {object}
     */
    getAll: function() {
        return nodeStack;
    },

    getCommands: function() {
      return Commands;
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
        case OPConstants.NEXT:
            next(action.id);
            NavStore.emitChange();
            break;

        case OPConstants.PREV:
            prev();
            NavStore.emitChange();
            break;
    }
});

module.exports = NavStore;
