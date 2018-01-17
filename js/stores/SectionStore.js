    var AppDispatcher = require('../dispatcher/AppDispatcher');
    var EventEmitter = require('events').EventEmitter;
    var OPConstants = require('../constants/OPConstants');
    var assign = require('object-assign');

    var CHANGE_EVENT = 'change';

    var sections = {
      "1a": {
        "id": "1a",
        "title": "LITURGIES",
        "description": "\"This is My body which is given for you; My blood, which is shed for you.\" (Luke 22:19-20)",
        "img": "../../images/placeholder.png",
        "node": {
          "1b": {
            "id": "1b",
            "title": "ST. BASIL",
            "node": {
              "1c": {
                "id": "1c",
                "title": "OFFERING OF THE LAMB",
                "load": "stbasil_offering"
              },
              "1d": {
                "id": "1d",
                "title": "LITURGY OF THE WORD",
                "load" : "stbasil_word"
              },
              "1e": {
                "id" : "1e",
                "title": "LITURGY OF THE FAITHFUL",
                "load": "stbasil_faithful"
              },

            },

          },
          "2b": {
            "id": "2b",
            "title": "VESPERS",
            "load": "vespers"
          },
          "3b": {
            "id": "3b",
            "title": "MATINS",
            "load": "matins"
          }
        }
      },
      "2a": {
        "id": "2a",
        "title": "BOOK OF HOURS",
        "node": {
          "prime": {
            "id": "prime",
            "title": "1ST HOUR",
            "load": "first_hour"
          },
          "terce": {
            "id": "terce",
            "title": "3RD HOUR",
            //"load": "third_hour"
          },
          "sext": {
            "id": "sext",
            "title": "6TH HOUR",
            //"load": "sixth_hour"
          },
          "none": {
            "id":"none",
            "title": "9TH HOUR",
            //"load": "ninth_hour"
          },
          "vespers": {
            "id":"vespers",
            "title": "11TH HOUR",
            //"load": "eleventh_hour"
          },
          "midnight":{
            "id":"midnight",
            "title": "12TH HOUR",
            //"load": "twelfth_hour"
          },
          "veil":{
            "id": "veil",
            "title": "VEIL",
            //"load":"veil_hour"
          },
          "midnightwatch":{
            "id":"midnightwatch",
            "title": "MIDNIGHT HOUR",
            //"load": "midnight_watch"
          },
          "selectedprayers":{
            "id":"selectedprayers",
            "title":"SELECTED PRAYERS",
            "node": {
              "confession": {
                "id": "confession",
                "title": "CONFESSION",
                //"load": "sp_confession"
              },
              "communion": {
                "id": "communion",
                "title": "COMMUNION",
                //"load" : "sp_communion"
              },
              "guidance": {
                "id" : "guidance",
                "title": "GUIDANCE",
                //"load": "sp_guidance"
              },
              "meals": {
                "id" : "meals",
                "title": "MEALS",
                //"load": "sp_meals"
              },
              "priests": {
                "id" : "priests",
                "title": "PRIESTS",
                //"load": "sp_priests"
              },
              "deacons": {
                "id" : "deacons",
                "title": "DEACONS",
                //"load": "sp_deacons"
              },

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
