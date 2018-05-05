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
        if (day == 0) {
            docs.push("hymns/psalmody/psali/standard_sunday");
        } 
        if (day == 1) {
            docs.push("hymns/psalmody/psali/standard_monday");
        } 
        if (day == 2) {
            docs.push("hymns/psalmody/psali/standard_tuesday");
        } 
        if (day == 3) {
            docs.push("hymns/psalmody/psali/standard_wednesday");
        } 
        if (day == 4) {
            docs.push("hymns/psalmody/psali/standard_thursday");
        } 
        if (day == 5) {
            docs.push("hymns/psalmody/psali/standard_friday");
        } 
        if (day == 6) {
            docs.push("hymns/psalmody/psali/standard_saturday");
        } 
        if (day_tune == "adam") {
            docs.push("hymns/psalmody/concl_psali_adam");
        } else {
            docs.push("hymns/psalmody/concl_psali_watos");
        }

        if (day_tune == "adam") {
            docs.push("hymns/psalmody/concl_adam_theotokia");
        } else {
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
