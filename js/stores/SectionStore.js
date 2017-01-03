var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var OPConstants = require('../constants/OPConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var sections = {
    "0a": {
        "id": "0a",
        "title": "LITURGIES",
        "description": "\"This is My body which is given for you; My blood, which is shed for you.\" (Luke 22:19-20)",
        "img": "../../images/placeholder.png",
        "node": {
            "1d": {
                "id": "1d",
                "title": "MATINS",
                "node": {
                    "1b": {
                        "id": "1b",
                        "title": "Verses of the Cymbals",
                        "load": "verses_of_the_cymbals"
                    }
                }
            }
        }
    }

};

var Sections = sections;

function next(id) {
    Sections = Sections[id]["node"];
}

function prev(ids) {
    Sections = sections;
    for (var i = 0; i < ids.length; i++) {
        Sections = Sections[ids[i]]["node"];
    }
}

var SectionStore = assign({}, EventEmitter.prototype, {

    /**
     * Get the entire collection of SECTIONs.
     * @return {object}
     */
    getAll: function () {
        return Sections;
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
            SectionStore.emitChange();
            break;

        case OPConstants.PREV:
            prev(action.ids);
            SectionStore.emitChange();
            break;
    }
});

module.exports = SectionStore;
