var CopticCalendar = require('./CopticCalendar.js');
var CopticDateComparator = CopticCalendar.CopticDateComparator;
var moment = require('moment');

var verses_of_the_cymbals = function (attributes, selector) {
    var day_tune = CopticCalendar.AdamOrWatos(attributes.year, attributes.monthIndex, attributes.day);
    var docs = []
    if (day_tune == "adam") {
        docs.push("hymns/adam_intro_verses_of_the_cymbals");
    } else {
        docs.push("hymns/watos_intro_verses_of_the_cymbals");
    }
    docs.push("hymns/verses_of_the_cymbals");

    return docs;
};

var doxologies = function (attributes, selector) {
    //var copticDate = CopticCalendar.getCopticDate(attributes.year, attributes.monthIndex, attributes.day);
    //var easterDate = CopticCalendar.getEasterDate(attributes.year);
    var docs = []
    docs.push("hymns/doxologies/doxologies_intro");
    if (selector == "vespers") {
        docs.push("hymns/doxologies/stmary_vespers");
    } else if (selector == "matins") {
        docs.push("hymns/doxologies/stmary_matins");
    }
    docs.push("hymns/doxologies/heavenly_beings");
    docs.push("hymns/doxologies/apostles_first");
    docs.push("hymns/doxologies/apostles_second");
    docs.push("hymns/doxologies/stmark_first");
    docs.push("hymns/doxologies/stmark_second");
    docs.push("hymns/doxologies/doxologies_concl");

    return docs;
};

var short_litanies = function (attributes) {
    var docs = [];
    var copticDate = CopticCalendar.getCopticDate(attributes.year, attributes.monthIndex, attributes.day);
    var copticMonthIndex = copticDate.monthIndex;
    var copticDay = copticDate.day;

    docs.push("prayers/litanies/litanies_peace_short");
    docs.push("prayers/litanies/litanies_fathers_short");
    docs.push("prayers/litanies/litany_place_short");
    // start and end dates are inclusive

    if (CopticDateComparator("Tobe", 11, "Paone", 11, copticMonthIndex, copticDay)) {
        docs.push("prayers/litanies/litanies_airandfruit_short");
    }
    docs.push("prayers/litanies/litany_assemblies");

    return docs;
};

var concluding_hymn = function (attributes) {
    var docs = []
    var copticDate = CopticCalendar.getCopticDate(attributes.year, attributes.monthIndex, attributes.day);
    var copticMonthIndex = copticDate.monthIndex;
    var copticDay = copticDate.day;
    // start and end dates are inclusive
    if (CopticDateComparator("Paone", 12, "Paope", 9, copticMonthIndex, copticDay)) {
        docs.push("hymns/concluding_hymn_waters");
    } else if (CopticDateComparator("Paope", 10, "Tobe", 10, copticMonthIndex, copticDay)) {
        docs.push("hymns/concluding_hymn_seeds");
    } else if (CopticDateComparator("Tobe", 11, "Paone", 11, copticMonthIndex, copticDay)) {
        docs.push("hymns/concluding_hymn_air");
    }

    return docs;
};

var offering_hymn = function (attributes) {
    var docs = [];
    if (CopticCalendar.isInFast(attributes)) {
            docs.push("hymns/alleluia_the_thought_of_man");
    } else {
        docs.push("hymns/alleluia_this_is_the_day");
    }

    return docs;
};

var censer_hymn = function (attributes) {
    var docs = [];
    if (CopticCalendar.isInFast(attributes)) {
            docs.push("hymns/tishori");
    } else {
        docs.push("hymns/taishori");
    }

    return docs;
};

var Vespers = function (attributes) {

    var docs = [];
    docs.push("prayers/intro_offering_of_incense");
    docs.push("prayers/our_father");
    docs.push("prayers/thanksgiving_prayer");
    docs = docs.concat(verses_of_the_cymbals(attributes));
    docs.push("prayers/litanies/litany_departed");
    docs.push("prayers/graciously_accord");
    docs.push("prayers/trisagion");
    docs.push("prayers/our_father");
    // doxologies
    docs = docs.concat(doxologies(attributes, "vespers"));
    docs.push("prayers/intro_creed");
    docs.push("prayers/nicene_creed");
    docs.push("prayers/o_god_have_mercy_on_us");
    docs.push("prayers/litanies/litany_gospel");
    docs.push("hymns/response_gospel_annual_raising_incense");
    docs = docs.concat(short_litanies(attributes));
    docs.push("prayers/our_father");
    docs = docs.concat(concluding_hymn(attributes));

    return docs;
};

var Matins = function (attributes) {

    //var copticDate = CopticCalendar.getCopticDate(attributes.year, attributes.monthIndex, attributes.day);
    var docs = [];
    var day = attributes.day;
    docs.push("prayers/intro_offering_of_incense");
    docs.push("prayers/our_father");
    docs.push("prayers/thanksgiving_prayer");
    docs = docs.concat(verses_of_the_cymbals(attributes));

    // On Saturday morning Litany of Departed is said instead
    if (day < 6) {
        docs.push("prayers/litanies/litany_sick");
    } else {
        docs.push("prayers/litanies/litany_departed");
    }
    // On Saturdays, Sundays, and feasts of the Lord, Litany of Travelers is not said
    if (day != 6 && day != 0) {
        docs.push("prayers/litanies/litany_travelers");
    } else {
        docs.push("prayers/litanies/litany_oblations");
    }

    docs.push("prayers/the_gloria");
    docs.push("prayers/trisagion");
    docs.push("prayers/our_father");
    // doxologies
    docs = docs.concat(doxologies(attributes, "matins"));
    docs.push("prayers/intro_creed");
    docs.push("prayers/nicene_creed");
    docs.push("prayers/o_god_have_mercy_on_us");
    docs.push("prayers/litanies/litany_gospel");
    docs.push("hymns/response_gospel_annual_raising_incense");
    docs = docs.concat(short_litanies(attributes));
    docs.push("prayers/our_father");
    docs = docs.concat(concluding_hymn(attributes));

    return docs;
};

var daysToMilliseconds = function (numOfDays) {
    return numOfDays * 60 * 60 * 24 * 1000
};

var StBasilOffering = function (attributes) {
    var docs = [];
    docs.push("hymns/hymn_blessing");
    docs.push("hymns/hail_to_mary_offering");
    docs.push("prayers/trisagion");
    docs.push("prayers/our_father");
    docs.push("prayers/intro_creed");
    docs.push("prayers/nicene_creed");
    docs.push("hymns/lord_have_mercy_offering_of_the_lamb");
    docs.push("prayers/holy_holy_holy");
    docs.push("prayers/our_father");


    if (CopticCalendar.isInFast(attributes)) {
        docs.push("hymns/apinav_shopi")
    }
    docs.push("prayers/procession_of_the_lamb");
    docs = docs.concat(offering_hymn(attributes));
    docs.push("prayers/khen_efran_offertory");
    docs.push("prayers/thanksgiving_prayer");
    docs.push("hymns/nisavev_tero");
    docs.push("hymns/saved_amen");
    docs.push("prayers/prayer_absolution_son");

    return docs;
};

var StBasilWord = function (attributes) {
    var docs = [];
    var day = attributes.day;
    // On Saturdays, Sundays, and feasts of the Lord, Alleluia This is the Day is prayed
    docs = docs.concat(censer_hymn(attributes));
//    docs.push("hymns/response_pauline");
//    docs.push("hymns/coptic_pauline_intro");
//    docs.push("hymns/coptic_pauline_concl");
//    docs.push("hymns/coptic_catholic_intro");
//    docs.push("hymns/coptic_catholic_concl");
    docs.push("hymns/praxis_response_standard");
//    docs.push("hymns/coptic_praxis_intro");
//    docs.push("hymns/coptic_praxis_concl");
      docs.push("hymns/trisagion_hymn");
      docs.push("prayers/litanies/litany_gospel");


    return docs;

};



module.exports.Vespers = Vespers;
module.exports.Matins = Matins;
module.exports.StBasilOffering = StBasilOffering;
module.exports.StBasilWord = StBasilWord;
