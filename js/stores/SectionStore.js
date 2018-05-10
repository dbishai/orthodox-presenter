var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var OPConstants = require('../constants/OPConstants');
var SectionLoadConstants = require('../constants/SectionLoadConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var sections = {
  "1a": {
    "id": "1a",
    "title": "LITURGIES",
    "node": {
      "1b": {
        "id": "1b",
        "title": "ST. BASIL",
        "node": {
          "1c": {
            "id": "1c",
            "title": "OFFERING OF THE LAMB",
            "load": SectionLoadConstants.OFFERING_OF_THE_LAMB
          },
          "1d": {
            "id": "1d",
            "title": "LITURGY OF THE WORD",
            "load": SectionLoadConstants.LITURGY_OF_THE_WORD
          },
          "1e": {
            "id": "1e",
            "title": "LITURGY OF THE FAITHFUL",
            "load": SectionLoadConstants.ST_BASIL_LITURGY_OF_THE_FAITHFUL
          },
          "1f": {
            "id": "1f",
            "title": "DISTRIBUTION",
            "load": SectionLoadConstants.DISTRIBUTION
          },

        },

      },
      "1g": {
        "id": "1g",
        "title": "ST. GREGORY",
        "node": {
          "1h": {
            "id": "1h",
            "title": "OFFERING OF THE LAMB",
            "load": SectionLoadConstants.OFFERING_OF_THE_LAMB
          },
          "1i":{
            "id": "1i",
            "title": "LITURGY OF THE WORD",
            "load": SectionLoadConstants.LITURGY_OF_THE_WORD
          },
          "1j": {
            "id": "1j",
            "title": "LITURGY OF THE FAITHFUL",
            "load": SectionLoadConstants.ST_GREGORY_LITURGY_OF_THE_FAITHFUL
          },
          "1k": {
            "id": "1k",
            "title": "DISTRIBUTION",
            "load": SectionLoadConstants.DISTRIBUTION
          },

        },

      },
      "1l": {
        "id": "1l",
        "title": "ST. CYRIL",
        "node": {
          "1m": {
            "id": "1m",
            "title": "OFFERING OF THE LAMB",
            "load": SectionLoadConstants.OFFERING_OF_THE_LAMB
          },
          "1n":{
            "id": "1n",
            "title": "LITURGY OF THE WORD",
            "load": SectionLoadConstants.LITURGY_OF_THE_WORD
          },
          "1o": {
            "id": "1o",
            "title": "LITURGY OF THE FAITHFUL",
            "load": SectionLoadConstants.ST_CYRIL_LITURGY_OF_THE_FAITHFUL
          },
          "1p": {
            "id": "1p",
            "title": "DISTRIBUTION",
            "load": SectionLoadConstants.DISTRIBUTION
          },

        },

      },      
      "2b": {
        "id": "2b",
        "title": "VESPERS",
        "load": SectionLoadConstants.VESPERS
      },
      "3b": {
        "id": "3b",
        "title": "MATINS",
        "load": SectionLoadConstants.MATINS
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
        "load": SectionLoadConstants.AGPEYA_1ST_HOUR
      },
      "terce": {
        "id": "terce",
        "title": "3RD HOUR",
        "load": SectionLoadConstants.AGPEYA_3RD_HOUR
      },
      "sext": {
        "id": "sext",
        "title": "6TH HOUR",
        "load": SectionLoadConstants.AGPEYA_6TH_HOUR
      },
      "none": {
        "id": "none",
        "title": "9TH HOUR",
        "load": SectionLoadConstants.AGPEYA_9TH_HOUR
      },
      "vespers": {
        "id": "vespers",
        "title": "11TH HOUR",
        "load": SectionLoadConstants.AGPEYA_11TH_HOUR

      },
      "twelfth": {
        "id": "twelfth",
        "title": "12TH HOUR",
        "load": SectionLoadConstants.AGPEYA_12TH_HOUR
      },
      "veil": {
        "id": "veil",
        "title": "VEIL",
        "load": SectionLoadConstants.AGPEYA_VEIL
      },
      "midnightwatch": {
        "id": "midnightwatch",
        "title": "MIDNIGHT HOUR",
        //"load": "midnight_watch"
      },
      "selectedprayers": {
        "id": "selectedprayers",
        "title": "SELECTED PRAYERS",
        "node": {
          "confession": {
            "id": "confession",
            "title": "CONFESSION",
            "load": SectionLoadConstants.AGPEYA_CONFESSION
          },
          "communion": {
            "id": "communion",
            "title": "COMMUNION",
            "load" : SectionLoadConstants.AGPEYA_COMMUNION
          },
          "guidance": {
            "id": "guidance",
            "title": "GUIDANCE",
            "load": SectionLoadConstants.AGPEYA_GUIDANCE
          },
          "meals": {
            "id": "meals",
            "title": "MEALS",
            "load": SectionLoadConstants.AGPEYA_MEALS
          },
          "priests": {
            "id": "priests",
            "title": "PRIESTS",
            "load": SectionLoadConstants.AGPEYA_PRIESTS
          },
          "deacons": {
            "id": "deacons",
            "title": "DEACONS",
            "load": SectionLoadConstants.AGPEYA_DEACONS
          },
        }
      }
    }
  },
  "3a": {
    "id":"3a",
    "title": "PSALMODY",
    "node": {
      "vesper_praises": {
        "id": "vesper_praises",
        "title": "VESPER PRAISES",
        "load": SectionLoadConstants.VESPER_PRAISES
      },
      "midnight_praises": {
        "id": "midnight_praises",
        "title": "MIDNIGHT PRAISES",
        "load": SectionLoadConstants.MIDNGIHT_PRAISES
      },
      "morning_praises": {
        "id": "morning_praises",
        "title": "MORNING PRAISES",
        "load": SectionLoadConstants.MORNING_PRAISES
      }, 
    }
  },
  "4a": {
    "id": "4a",
    "title": "SPECIAL",
    "node": {
      "pascha": {
        "id": "pascha",
        "title": "PASCHA",
        "node": {
          "sunday": {
            "id": "sunday",
            "title": "SUNDAY",
            "node": {
              "funeral": {
                "id": "funeral",
                "title": "GENERAL FUNERAL PRAYER",
                "load": SectionLoadConstants.PASCHA_GENERAL_FUNERAL_PRAYER
              },
              "sunday_day": {
                "id": "sunday_day",
                "title": "SUNDAY DAY",
                "node": {
                  "ninth": {
                    "id": "ninth",
                    "title": "9TH HOUR",
                    "load": SectionLoadConstants.PASCHA_SUN_9TH_HOUR
                  },
                  "eleventh": {
                    "id": "eleventh",
                    "title": "11TH HOUR",
                    "load": SectionLoadConstants.PASCHA_SUN_11TH_HOUR
                  },
                }
              }
            }
          }
        }
      }
    }
  }
};
/*,
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
*/




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
