var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var OPConstants = require('../constants/OPConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var Document = [];

function load(doc) {
  $.getJSON(doc)
    .done(function(data) {
       Document = data;
       DocumentStore.emitChange();
    })
    .fail(function(jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
    });
}

var DocumentStore = assign({}, EventEmitter.prototype, {

    /**
     * Get the entire collection of SECTIONs.
     * @return {object}
     */
    getAll: function() {
        return Document;
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
        case OPConstants.LOAD:
            load(action.doc);
            break;
    }
});

module.exports = DocumentStore;
