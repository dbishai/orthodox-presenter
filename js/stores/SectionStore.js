var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var OPConstants = require('../constants/OPConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _sections = {
    0: {
        "id": 0,
        "title": "Liturgies",
        "load": "liturgies",
        "img": "../../images/placeholder.png",
        "node": {
            10: {
                "id": 10,
                "title": "St. Basil",
                "load": "st_basil"
            },
            11: {
                "id": 11,
                "title": "St. Gregory",
                "load": "st_gregory"
            },
            12: {
                "id": 12,
                "title": "St. Cyril",
                "load": "st_cyril"
            },
            13: {
                "id": 13,
                "title": "Matins",
                "load": "matins"
            },
            14: {
                "id": 14,
                "title": "Vespers",
                "load": "vespers"
            }
        }
    },
    1: {
        "id": 1,
        "title": "Vespers",
        "load": "vespers",
        "img": "../../images/placeholder.png"
    },
    2: {
        "id": 2,
        "title": "Liturgies",
        "img": "../../images/placeholder.png"
    },
    3: {
        "id": 3,
        "title": "Liturgies",
        "img": "../../images/placeholder.png"
    },
    4: {
        "id": 4,
        "title": "Liturgies",
        "img": "../../images/placeholder.png"
    },
    5: {
        "id": 5,
        "title": "Liturgies",
        "img": "../../images/placeholder.png"
    },
    6: {
        "id": 6,
        "title": "Liturgies",
        "img": "../../images/placeholder.png"
    },
    7: {
        "id": 7,
        "title": "Vespers",
        "img": "../../images/placeholder.png"
    }
};

function updateAll(id) {
  _sections = _sections[id]["node"];
}

var SectionStore = assign({}, EventEmitter.prototype, {

    /**
     * Get the entire collection of SECTIONs.
     * @return {object}
     */
    getAll: function() {
        return _sections;
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
    var text;

    switch (action.actionType) {
        case OPConstants.UPDATE_ALL:
            updateAll(action.id);
            SectionStore.emitChange();
            break;

        default:
    }
});

module.exports = SectionStore;
