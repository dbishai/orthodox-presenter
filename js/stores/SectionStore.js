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
            "1a": {
                "id": "1a",
                "title": "ST. BASIL",
                "node": {
                  "2a": {
                    "id": "2a",
                    "title": "test",
                    "load": "st_basil"
                  }
                }

            },
            "1b": {
                "id": "1b",
                "title": "ST. GREGORY",
                "node": {
                  "2a": {
                    "id": "2a",
                    "title": "test",
                    "load": "st_gregory"
                  }
                }
            },
            "1c": {
                "id": "1c",
                "title": "ST. CYRIL",
                "load": "st_cyril"
            },
            "1d": {
                "id": "1d",
                "title": "MATINS",
            },
            "1e": {
                "id": "1e",
                "title": "VESPERS",
            }
        }
    },
    "0b": {
        "id": "0b",
        "title": "PSALMODY",
        "description": "Praise the Lord! Praise God in His sanctuary; Praise Him in His mighty firmament! (Psalm 150:1)",
        "img": "../../images/placeholder.png"
    },
    "0c": {
        "id": "0c",
        "title": "READINGS",
        "description": "How sweet are Your words to my taste! Yes, sweeter than honey to my mouth! (Psalm 119:103)",
        "img": "../../images/placeholder.png"
    },
    "0d": {
        "id": "0d",
        "title": "HYMNS",
        "description": "I will sing unto the LORD as long as I live: I will sing praise to my God while I have my being. (Psalm 104:33)",
        "img": "../../images/placeholder.png",
        "node": {
            "1a": {
                "id": "1a",
                "title": "Niethnos Tiro",
                "load": "docs/hymns/niethnos_tiro.json"
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
