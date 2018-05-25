var CopticCalendar = require('../CopticCalendar.js');
var CopticDateComparator = CopticCalendar.CopticDateComparator;
var moment = require('moment');

var Psalmody = {

    MorningPraises: function (attributes) {
        var docs = [];
        docs.push("hymns/psalmody/morning_praises");
        docs.push("hymns/psalmody/concl_adam_theotokia");
        return docs;
    },

    VesperPraises: function (attributes) {
        var day = attributes.todayDate.day();
        var day_tune = CopticCalendar.AdamOrWatos(attributes.year, attributes.monthIndex, attributes.day);
        var docs = [];
        docs.push("hymns/psalmody/intro_psalm_116");
        docs.push("hymns/psalmody/fourth_canticle");
        switch (day) {
            case 0:
            docs.push("hymns/psalmody/psali/standard_sunday");
            break;
            case 1:
            docs.push("hymns/psalmody/psali/standard_monday");
            break;
            case 2:
            docs.push("hymns/psalmody/psali/standard_tuesday");
            break;
            case 3:
            docs.push("hymns/psalmody/psali/standard_wednesday");
            break;
            case 4:
            docs.push("hymns/psalmody/psali/standard_thursday");
            break;
            case 5:
            docs.push("hymns/psalmody/psali/standard_friday");
            break;
            case 6:
            docs.push("hymns/psalmody/psali/standard_saturday");
            break;
        }
        if (day_tune == "adam") {
            docs.push("hymns/psalmody/concl_psali_adam");
            docs.push("hymns/psalmody/concl_adam_theotokia");
        } else {
            docs.push("hymns/psalmody/concl_psali_watos");
            docs.push("hymns/psalmody/concl_watos_theotokia");
        }

        docs.push("prayers/our_father");
        
        return docs;
    },

    MidnightPraises: function (attributes) {
        var docs = [];


        return docs;
    }
}

module.exports = Psalmody;
