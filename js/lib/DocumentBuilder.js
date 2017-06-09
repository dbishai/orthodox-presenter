var CopticCalendar = require('CopticCalendar.js');

var verses_of_the_cymbals = function (attributes, selector) {
    var day_tune = CopticCalendar.AdamOrWatos(attributes.year, attributes.monthIndex, attributes.day);
    docs = []
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
    docs = []
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

var Vespers = function (attributes) {

    //var copticDate = CopticCalendar.getCopticDate(attributes.year, attributes.monthIndex, attributes.day);
    var docs = [];
    docs.push("prayers/intro_offering_of_incense.json");
    docs.push("prayers/our_father");
    docs.push("prayers/thanksgiving_prayer");
    docs.concat(verses_of_the_cymbals(attributes));
    docs.push("prayers/litanies/litany_departed");
    //docs.push("prayers/graciously_accord");
    docs.push("prayers/trisagion");
    docs.push("prayers/our_father");
    // doxologies
    docs.concat(doxologies(attributes, "vespers"));
    docs.push("prayers/intro_creed");
    docs.push("prayers/nicene_creed");
    docs.push("prayers/ogodhave_mercyonus");
    docs.push("prayers/litanies/litany_gospel");
    docs.push("hymns/response_gospel_annual.json");

    docs.push("prayers/litanies/litanies_peace_short");
    docs.push("prayers/litanies/litanies_fathers_short");
    docs.push("prayers/litanies/litany_place_short");
    docs.push("prayers/our_father");

    return docs;
}

var Matins = function (attributes) {

    //var copticDate = CopticCalendar.getCopticDate(attributes.year, attributes.monthIndex, attributes.day);
    var docs = [];
    var day = attributes.day;
    docs.push("prayers/intro_offering_of_incense.json");
    docs.push("prayers/our_father");
    docs.push("prayers/thanksgiving_prayer");
    docs.concat(verses_of_the_cymbals(attributes));

    // On Saturday morning Litany of Departed is said instead
    if (day < 6) {
        docs.push("prayers/litanies/litany_sick");
    } else {
        docs.push("prayers/litanies/litany_departed");
    }
    // On Saturdays, Sundays, and feasts of the Lord, Litany of Travelers is not said
    if (day != 6 && day != 0) {
        docs.push("prayers/litanies/litany_oblations");
    } else {
        docs.push("prayers/litanies/litany_travelers");
    }

    docs.push("prayers/litanies/the_gloria");
    //docs.push("prayers/let_us_praise);
    docs.push("prayers/trisagion");
    docs.push("prayers/our_father");
    // doxologies
    docs.concat(doxologies(attributes, "matins"));
    docs.push("prayers/intro_creed");
    docs.push("prayers/nicene_creed");
    docs.push("prayers/ogodhave_mercyonus");
    docs.push("prayers/litanies/litany_gospel");
    docs.push("hymns/response_gospel_annual.json");
    docs.push("prayers/litanies/litanies_peace_short");
    docs.push("prayers/litanies/litanies_fathers_short");
    docs.push("prayers/litanies/litany_place_short");
    docs.push("prayers/our_father");

    return docs;
}

module.exports.Vespers = Vespers;
module.exports.Matins = Matins;