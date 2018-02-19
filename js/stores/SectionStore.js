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
                      "id": "1e",
                      "title": "LITURGY OF THE FAITHFUL",
                      "load" : "stbasil_faithful"
                    },
                    "1f":{
                      "id": "1f",
                      "title": "DISTRIBUTION",
                      "load": "stbasil_distribution"
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
          "load": "third_hour"
        },
        "sext": {
          "id": "sext",
          "title": "6TH HOUR",
          "load": "sixth_hour"
        },
        "none": {
          "id":"none",
          "title": "9TH HOUR",
          "load": "ninth_hour"
        },
        "vespers": {
          "id":"vespers",
          "title": "11TH HOUR",
          "load": "eleventh_hour"
  
        },
        "midnight":{
          "id":"midnight",
          "title": "12TH HOUR",
          "load": "twelfth_hour"
        },
        "veil":{
          "id": "veil",
          "title": "VEIL",
          "load":"veil_hour"
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
              "load": "sp_confession"
            },
            "communion": {
              "id": "communion",
              "title": "COMMUNION",
              //"load" : "sp_communion"
            },
            "guidance": {
              "id" : "guidance",
              "title": "GUIDANCE",
              "load": "sp_guidance"
            },
            "meals": {
              "id" : "meals",
              "title": "MEALS",
              "load": "sp_meals"
            },
            "priests": {
              "id" : "priests",
              "title": "PRIESTS",
              "load": "sp_priests"
            },
            "deacons": {
              "id" : "deacons",
              "title": "DEACONS",
              "load": "sp_deacons"
            },
  
          }
        }
      }
    },
    "3a": {
      "id": "3a",
      "title": "SPECIAL",
      "node": {
        "pascha":{
          "id":"pascha",
          "title":"PASCHA",
          "node": {
            "sunday": {
              "id": "sunday",
              "title": "SUNDAY",
              "node": { 
                "funeral": {
                  "id": "funeral",
                  "title": "GENERAL FUNERAL PRAYER",
                  "load": "funeral_pascha"
                },
                "sunday_day": {
                  "id": "sunday_day",
                  "title": "SUNDAY DAY",
                  "node": {
                    "ninth": {
                      "id": "ninth",
                      "title": "9TH HOUR",
                      "load": "pascha_sunday_ninth"
                    },
                    "eleventh": {
                      "id": "eleventh",
                      "title": "11TH HOUR",
                      "load": "sunday_eleventh"
                    },
                  }
                },
                "monday_eve": {
                  "id": "monday_eve",
                  "title": "MONDAY EVE",
                  "node": {
                    "first": {
                      "id": "first",
                      "title": "1ST HOUR",
                      "load": "monday_eve_first"
                    },
                    "third": {
                      "id": "third",
                      "title": "3RD HOUR",
                      "load": "monday_eve_third"
                    },
                    "sixth": {
                      "id": "sixth",
                      "title": "6TH HOUR",
                      "load": "monday_eve_sixth"
                    },
                    "ninth": {
                      "id": "ninth",
                      "title": "9TH HOUR",
                      "load": "monday_eve_ninth"
                    },
                    "eleventh": {
                      "id": "eleventh",
                      "title": "11TH HOUR",
                      "load": "monday_eve_eleventh"
                    },
                  }
                },
                
              }
            },
            "monday": {
              "id": "monday",
              "title": "MONDAY",
              "node": {
                "monday_day": {
                  "id": "monday_day",
                  "title": "MONDAY DAY",
                  "node" : {
                    "first": {
                      "id": "first",
                      "title": "1ST HOUR",
                      "load": "monday_first"
                    },
                    "third": {
                      "id": "third",
                      "title": "3RD HOUR",
                      "load": "monday_third"
                    },
                    "sixth": {
                      "id": "sixth",
                      "title": "6TH HOUR",
                      "load": "monday_sixth"
                    },
                    "ninth": {
                      "id": "ninth",
                      "title": "9TH HOUR",
                      "load": "monday_ninth"
                    },
                    "eleventh": {
                      "id": "eleventh",
                      "title": "11TH HOUR",
                      "load": "monday_eleventh"
                    },
                  }
                },
                "tuesday_eve": {
                  "id": "tuesday_eve",
                  "title": "TUESDAY EVE",
                  "node": {
                    "first": {
                      "id": "first",
                      "title": "1ST HOUR",
                      "load": "tuesday_eve_first"
                    },
                    "third": {
                      "id": "third",
                      "title": "3RD HOUR",
                      "load": "tuesday_eve_third"
                    },
                    "sixth": {
                      "id": "sixth",
                      "title": "6TH HOUR",
                      "load": "tuesday_eve_sixth"
                    },
                    "ninth": {
                      "id": "ninth",
                      "title": "9TH HOUR",
                      "load": "tuesday_eve_ninth"
                    },
                    "eleventh": {
                      "id": "eleventh",
                      "title": "11TH HOUR",
                      "load": "tuesday_eve_eleventh"
                    },
                  }
                },

              }
            },
            "tuesday": {
              "id" : "tuesday",
              "title": "TUESDAY",
              "node": {
                "tuesday_day": {
                  "id": "tuesday_day",
                  "title": "TUESDAY DAY",
                  "node": {
                    "first": {
                      "id": "first",
                      "title": "1ST HOUR",
                      "load": "tuesday_first"
                    },
                    "third": {
                      "id": "third",
                      "title": "3RD HOUR",
                      "load": "tuesday_third"
                    },
                    "sixth": {
                      "id": "sixth",
                      "title": "6TH HOUR",
                      "load": "tuesday_sixth"
                    },
                    "ninth": {
                      "id": "ninth",
                      "title": "9TH HOUR",
                      "load": "tuesday_ninth"
                    },
                    "eleventh": {
                      "id": "eleventh",
                      "title": "11TH HOUR",
                      "load": "tuesday_eleventh"
                    },
                  }
                },
                "wednesday_eve": {
                  "id": "wednesday_eve",
                  "title": "WEDNESDAY EVE",
                  "node": {
                    "first": {
                      "id": "first",
                      "title": "1ST HOUR",
                      "load": "wednesday_eve_first"
                    },
                    "third": {
                      "id": "third",
                      "title": "3RD HOUR",
                      "load": "wednesday_eve_third"
                    },
                    "sixth": {
                      "id": "sixth",
                      "title": "6TH HOUR",
                      "load": "wednesday_eve_sixth"
                    },
                    "ninth": {
                      "id": "ninth",
                      "title": "9TH HOUR",
                      "load": "wednesday_eve_ninth"
                    },
                    "eleventh": {
                      "id": "eleventh",
                      "title": "11TH HOUR",
                      "load": "wednesday_eve_eleventh"
                    },
                  }
                },

              }
            },
            "wednesday": {
              "id" : "wednesday",
              "title": "WEDNESDAY",
              "node": {
                "wednesday_day": {
                  "id": "wednesday_day",
                  "title": "WEDNESDAY DAY",
                  "node": {
                    "first": {
                      "id": "first",
                      "title": "1ST HOUR",
                      "load": "wednesday_first"
                    },
                    "third": {
                      "id": "third",
                      "title": "3RD HOUR",
                      "load": "wednesday_third"
                    },
                    "sixth": {
                      "id": "sixth",
                      "title": "6TH HOUR",
                      "load": "wednesday_sixth"
                    },
                    "ninth": {
                      "id": "ninth",
                      "title": "9TH HOUR",
                      "load": "wednesday_ninth"
                    },
                    "eleventh": {
                      "id": "eleventh",
                      "title": "11TH HOUR",
                      "load": "wednesday_eleventh"
                    },
                  }
                },
                "thursday_eve": {
                  "id": "thursday_eve",
                  "title": "THURSDAY EVE",
                  "node": {
                    "first": {
                      "id": "first",
                      "title": "1ST HOUR",
                      "load": "thursday_eve_first"
                    },
                    "third": {
                      "id": "third",
                      "title": "3RD HOUR",
                      "load": "thursday_eve_third"
                    },
                    "sixth": {
                      "id": "sixth",
                      "title": "6TH HOUR",
                      "load": "thursday_eve_sixth"
                    },
                    "ninth": {
                      "id": "ninth",
                      "title": "9TH HOUR",
                      "load": "thursday_eve_ninth"
                    },
                    "eleventh": {
                      "id": "eleventh",
                      "title": "11TH HOUR",
                      "load": "thursday_eve_eleventh"
                    },
                  }
                },

              }
            },
            "thursday": {
              "id" : "thursday",
              "title": "THURSDAY",
              "node": {
                "thursday_day": {
                  "id": "thursday_day",
                  "title": "THURSDAY DAY",
                  "node": {
                    "first": {
                      "id": "first",
                      "title": "1ST HOUR",
                      "load": "thursday_first"
                    },
                    "third": {
                      "id": "third",
                      "title": "3RD HOUR",
                      "load": "thursday_third"
                    },
                    "sixth": {
                      "id": "sixth",
                      "title": "6TH HOUR",
                      "load": "thursday_sixth"
                    },
                    "ninth": {
                      "id": "ninth",
                      "title": "9TH HOUR",
                      "load": "thursday_ninth"
                    },
                    "liturgy_water": {
                      "id": "liturgy_water",
                      "title": "LITURGY OF THE WATERS",
                      "load": "liturgy_waters"
                    },
// add in Liturgical portions for Covenant Thursday
                    "eleventh": {
                      "id": "eleventh",
                      "title": "11TH HOUR",
                      "load": "thursday_eleventh"
                    },
                  }

                },
                "friday_eve": {
                  "id": "friday_eve",
                  "title": "FRIDAY EVE",
                  "node": {
                    "first": {
                      "id": "first",
                      "title": "1ST HOUR",
                      "load": "friday_eve_first"
                    },
                    "third": {
                      "id": "third",
                      "title": "3RD HOUR",
                      "load": "friday_eve_third"
                    },
                    "sixth": {
                      "id": "sixth",
                      "title": "6TH HOUR",
                      "load": "friday_eve_sixth"
                    },
                    "ninth": {
                      "id": "ninth",
                      "title": "9TH HOUR",
                      "load": "friday_eve_ninth"
                    },
                    "eleventh": {
                      "id": "eleventh",
                      "title": "11TH HOUR",
                      "load": "friday_eve_eleventh"
                    },

                  }
                },

              }
            },
            "friday": {
              "id" : "friday",
              "title": "FRIDAY",
              "node": {
                "first": {
                  "id": "first",
                  "title": "1ST HOUR",
                  "load": "friday_first"
                },
                "third": {
                  "id": "third",
                  "title": "3RD HOUR",
                  "load": "friday_third"
                },
                "sixth": {
                  "id": "sixth",
                  "title": "6TH HOUR",
                  "load": "friday_sixth"
                },
                "ninth": {
                  "id": "ninth",
                  "title": "9TH HOUR",
                  "load": "friday_ninth"
                },
                "eleventh": {
                  "id": "eleventh",
                  "title": "11TH HOUR",
                  "load": "friday_eleventh"
                },
                "twelfth": {
                  "id": "twelfth",
                  "title": "12TH HOUR",
                  "load": "friday_twelfth"
                },
              }
            },
  
          }
        }
      }
    },
    
    

  
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
