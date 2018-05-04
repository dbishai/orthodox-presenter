var CopticCalendar = require('../CopticCalendar.js');
var CopticDateComparator = CopticCalendar.CopticDateComparator;
var moment = require('moment');

var Psalmody = {

    MorningPraises: function (attributes) {
        var docs = [];
        docs.push("hymns/psalmody/morning_praises");
        docs.push("hymns/psalmody/conc_adam_theotokia");
        return docs;
    },

    VesperPraises: function (attributes) {
        var docs = [];


        return docs;
    },

    MidnightPraises: function (attributes) {
        var docs = [];


        return docs;
    }
}

module.exports = Psalmody;
