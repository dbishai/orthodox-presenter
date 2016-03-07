var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var OPConstants = require('../constants/OPConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _sections = {
    0: {
        "id": 0,
        "title": "LITURGIES",
        "description": "\"This is My body which is given for you; My blood, which is shed for you.\" (Luke 22:19-20)",
        //"load": "liturgies",
        "img": "../../images/placeholder.png",
        "node": {
            10: {
                "id": 10,
                "title": "ST. BASIL",
                //"load": "st_basil",
                "node": {
                  20: {
                    "id": 20,
                    "title": "test",
                    "load": "st_basil"
                  }
                }

            },
            11: {
                "id": 11,
                "title": "ST. GREGORY",
                //"load": "st_gregory"
                "node": {
                  21: {
                    "id": 21,
                    "title": "test",
                    "load": "st_gregory"
                  }
                }
            },
            12: {
                "id": 12,
                "title": "ST. CYRIL",
                //"load": "st_cyril"
            },
            13: {
                "id": 13,
                "title": "MATINS",
                //"load": "matins"
            },
            14: {
                "id": 14,
                "title": "VESPERS",
                //"load": "vespers"
            }
        }
    },
    1: {
        "id": 1,
        "title": "PSALMODY",
        "description": "Praise the Lord! Praise God in His sanctuary; Praise Him in His mighty firmament! (Psalm 150:1)",
        //"load": "vespers",
        "img": "../../images/placeholder.png"
    },
    2: {
        "id": 2,
        "title": "READINGS",
        "description": "How sweet are Your words to my taste! Yes, sweeter than honey to my mouth! (Psalm 119:103)",
        "img": "../../images/placeholder.png"
    },
    3: {
        "id": 3,
        "title": "HYMNS",
        "description": "I will sing unto the LORD as long as I live: I will sing praise to my God while I have my being. (Psalm 104:33)",
        "img": "../../images/placeholder.png"
    }/*,
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
    }*/

};

var Sections = _sections;

function next(id) {
  Sections = Sections[id]["node"];
}

function prev(ids) {
  Sections = _sections;
  for (var i = 0; i < ids.length; i++) {
    Sections = Sections[ids[i]]["node"];
  }
}

var SectionStore = assign({}, EventEmitter.prototype, {

    /**
     * Get the entire collection of SECTIONs.
     * @return {object}
     */
    getAll: function() {
        return Sections;
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
            SectionStore.emitChange();
            break;

        case OPConstants.PREV:
            prev(action.ids);
            SectionStore.emitChange();
            break;
    }
});

module.exports = SectionStore;
