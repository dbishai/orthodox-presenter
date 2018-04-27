var CopticCalendar = require('../CopticCalendar.js');
var CopticDateComparator = CopticCalendar.CopticDateComparator;
var moment = require('moment');

var verses_of_the_cymbals = function (attributes, selector) {
    var day_tune = CopticCalendar.AdamOrWatos(attributes.year, attributes.monthIndex, attributes.day);
    var docs = []
    if (day_tune == "adam") {
        docs.push("hymns/verses_of_cymbals/adam_intro_verses_of_the_cymbals");
    } else {
        docs.push("hymns/verses_of_cymbals/watos_intro_verses_of_the_cymbals");
    }
    docs.push("hymns/verses_of_cymbals/verses_of_the_cymbals");

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

    docs.push("prayers/litanies/peace_short");
    docs.push("prayers/litanies/fathers_short");
    docs.push("prayers/litanies/place_short");
    // start and end dates are inclusive

    if (CopticDateComparator("Tobe", 11, "Paone", 11, copticMonthIndex, copticDay)) {
        docs.push("prayers/litanies/air_and_fruit");
    } else if (CopticDateComparator("Paope", 10, "Tobe", 10, copticMonthIndex, copticDay)) {
        docs.push("prayers/litanies/seeds_and_herbs");
    } else if (CopticDateComparator("Paone", 12, "Paope", 9, copticMonthIndex, copticDay)) {
        docs.push("prayers/litanies/waters");
    }
    docs.push("prayers/litanies/assemblies");

    return docs;
};
var season_litanies = function (attributes) {
    var docs = [];
    var copticDate = CopticCalendar.getCopticDate(attributes.year, attributes.monthIndex, attributes.day);
    var copticMonthIndex = copticDate.monthIndex;
    var copticDay = copticDate.day;
    // start and end dates are inclusive
    if (CopticDateComparator("Tobe", 11, "Paone", 11, copticMonthIndex, copticDay)) {
        docs.push("prayers/litanies/air_and_fruit");
    } else if (CopticDateComparator("Paope", 10, "Tobe", 10, copticMonthIndex, copticDay)) {
        docs.push("prayers/litanies/seeds_and_herbs");
    } else if (CopticDateComparator("Paone", 12, "Paope", 9, copticMonthIndex, copticDay)) {
        docs.push("prayers/litanies/waters");
    }

    return docs;
};

var concluding_hymn = function (attributes) {
    var docs = []
    var copticDate = CopticCalendar.getCopticDate(attributes.year, attributes.monthIndex, attributes.day);
    var copticMonthIndex = copticDate.monthIndex;
    var copticDay = copticDate.day;
    // start and end dates are inclusive
    if (CopticDateComparator("Paone", 12, "Paope", 9, copticMonthIndex, copticDay)) {
        docs.push("hymns/concluding_hymn/waters");
    } else if (CopticDateComparator("Paope", 10, "Tobe", 10, copticMonthIndex, copticDay)) {
        docs.push("hymns/concluding_hymn/seeds");
    } else if (CopticDateComparator("Tobe", 11, "Paone", 11, copticMonthIndex, copticDay)) {
        docs.push("hymns/concluding_hymn/air");
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

var Liturgy = {
    Vespers: function (attributes) {

        var docs = [];
        docs.push("prayers/intro_offering_of_incense_vespers");
        docs.push("prayers/our_father");
        docs.push("prayers/responses/in_christ_intro");
        docs.push("prayers/thanksgiving_prayer");
        docs = docs.concat(verses_of_the_cymbals(attributes));
        docs.push("prayers/litanies/departed");
        docs.push("prayers/graciously_accord");
        docs.push("prayers/trisagion");
        docs.push("prayers/our_father");
        // doxologies
        docs = docs.concat(doxologies(attributes, "vespers"));
        docs.push("prayers/intro_creed");
        docs.push("prayers/nicene_creed");
        docs.push("prayers/o_god_have_mercy_on_us");
        docs.push("prayers/litanies/gospel");
        docs.push("prayers/litanies/gospel_alt");
        docs.push("hymns/standard/response_gospel_standard_raising_incense");
        docs = docs.concat(short_litanies(attributes));
        docs.push("prayers/our_father");
        docs.push("prayers/responses/in_christ_jesus_our_lord");
        docs.push("prayers/prayer_absolution_son");
        docs = docs.concat(concluding_hymn(attributes));
        docs.push("prayers/the_short_blessing");
        docs.push("prayers/our_father");

        return docs;
    },
    Matins: function (attributes) {

        //var copticDate = CopticCalendar.getCopticDate(attributes.year, attributes.monthIndex, attributes.day);
        var docs = [];
        var day = attributes.todayDate.day();
        docs.push("prayers/intro_offering_of_incense_matins");
        docs.push("prayers/our_father");
        docs.push("prayers/responses/in_christ_intro");
        docs.push("prayers/thanksgiving_prayer");
        docs = docs.concat(verses_of_the_cymbals(attributes));

        // On Saturday morning Litany of Departed is said instead
        if (day != 6) {
            docs.push("prayers/litanies/sick");
        } else {
            docs.push("prayers/litanies/departed");
        }
        // On Saturdays, Sundays, and feasts of the Lord, Litany of Travelers is not said
        if (day != 6 && day != 0) {
            docs.push("prayers/litanies/travelers");
        } else {
            docs.push("prayers/litanies/oblations");
        }

        docs.push("prayers/the_gloria");
        docs.push("prayers/trisagion");
        docs.push("prayers/our_father");
        // doxologies
        docs = docs.concat(doxologies(attributes, "matins"));
        docs.push("prayers/intro_creed");
        docs.push("prayers/nicene_creed");
        docs.push("prayers/o_god_have_mercy_on_us");
        docs.push("prayers/litanies/gospel");
        docs.push("prayers/litanies/gospel_alt");
        docs.push("hymns/standard/response_gospel_standard_raising_incense");
        docs = docs.concat(short_litanies(attributes));
        docs.push("prayers/our_father");
        docs.push("prayers/responses/in_christ_jesus_our_lord");
        docs.push("prayers/prayer_absolution_son");
        docs = docs.concat(concluding_hymn(attributes));
        docs.push("prayers/the_short_blessing");
        docs.push("prayers/our_father");

        return docs;
    },
    StBasilOffering: function (attributes) {
        var docs = [];
        docs.push("hymns/standard/hymn_blessing");
        docs.push("hymns/standard/hail_to_mary_offering");
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
        docs.push("prayers/responses/doxa_patri");
        docs.push("prayers/thanksgiving_prayer");
        docs.push("hymns/papal/nisavev_tero");
        docs.push("hymns/saved_amen");
        docs.push("prayers/prayer_absolution_son");

        return docs;
    },
    StBasilWord: function (attributes) {
        var docs = [];
        // On Saturdays, Sundays, and feasts of the Lord, Taishori is prayed
        docs = docs.concat(censer_hymn(attributes));
        docs.push("hymns/hymn_intercessions_liturgy_of_the_word");
    /*    docs.push("hymns/papal/response_pauline");
          docs.push("hymns/coptic_readings/coptic_pauline_intro");
          docs.push("hymns/coptic_readings/coptic_pauline_concl");
          docs.push("hymns/coptic_readings/coptic_catholic_intro");
          docs.push("hymns/coptic_readings/coptic_catholic_concl");
    */    docs.push("hymns/standard/praxis_response_standard");
        //    docs.push("hymns/coptic_readings/coptic_praxis_intro");
        //    docs.push("hymns/coptic_readings/coptic_praxis_concl");
        docs.push("hymns/standard/trisagion_hymn");
        docs.push("prayers/litanies/gospel");
        docs.push("prayers/litanies/gospel_alt");

        return docs;

    },
    StBasilFaithful: function (attributes) {
        var docs = [];
        var copticDate = CopticCalendar.getCopticDate(attributes.year, attributes.monthIndex, attributes.day);
        var copticMonthIndex = copticDate.monthIndex;
        var copticDay = copticDate.day;
        docs.push("hymns/standard/response_gospel_standard_liturgy"); // This will need to be changed to the attributes.day to accommodate for other gospel responses
        //    docs.push("prayers/litanies/three_great_litanies");
        docs.push("prayers/responses/in_the_wisdom");
        docs.push("prayers/nicene_creed");
        docs.push("prayers/responses/service_intro");
        docs.push("prayers/reconciliation_stbasil");
        docs.push("prayers/responses/greet_one_another_standard");
        docs.push("hymns/hymn_intercessions_liturgy_of_the_faithful_come");
        docs.push("prayers/anaphora_stbasil");
        docs.push("prayers/prayer_agios_stbasil");
        docs.push("prayers/institution_stbasil");
        docs.push("hymns/standard/amen_amen_amen_your_death");
        docs.push("prayers/therefore_as_we_also_1");
        docs.push("prayers/inaudible/epiclesis");
        docs.push("prayers/therefore_as_we_also_2");
        docs.push("prayers/yea_we_ask_you");
        docs.push("prayers/litanies/intro_seven_short");
        docs.push("prayers/litanies/peace_liturgy");
        docs.push("prayers/litanies/fathers_liturgy");
        docs.push("prayers/litanies/clergy");
        docs.push("prayers/litanies/mercy");
        docs.push("prayers/litanies/place_liturgy");
        docs.push("prayers/for_your_people");
        docs = docs.concat(season_litanies(attributes));
        docs.push("prayers/healing_to_the_sick");
        docs.push("prayers/litanies/oblations_liturgy");
        docs.push("prayers/commemoration_stbasil");
        docs.push("prayers/responses/may_their_holy_blessing");
        docs.push("prayers/those_o_lord");
        docs.push("prayers/responses/as_it_was_alt");
        docs.push("prayers/lead_us_throughout");
        docs.push("prayers/intro_fraction_stbasil");
        docs.push("prayers/fractions/standard_stbasil");
        docs.push("prayers/our_father");
        docs.push("prayers/responses/in_christ_jesus_our_lord");
        docs.push("prayers/prayer_before_confession");
        docs.push("prayers/responses/one_is_the_holy_father_alt");
        docs.push("prayers/responses/peace_be_with_all");
        docs.push("prayers/prayer_before_confession_cont");
        docs.push("prayers/the_confession");
        return docs;

    },
    StBasilDistribution: function (attributes) {
        var docs = [];
        docs.push("prayers/distribution");
        docs.push("hymns/standard/psalm150_standard") // This will need to be changed to the attributes.day to accommodate for other occasions


        return docs;
    },  
    StGregoryFaithful: function (attributes) {
        var docs = [];
        var copticDate = CopticCalendar.getCopticDate(attributes.year, attributes.monthIndex, attributes.day);
        var copticMonthIndex = copticDate.monthIndex;
        var copticDay = copticDate.day;
        docs.push("hymns/standard/response_gospel_standard_liturgy"); // This will need to be changed to the attributes.day to accommodate for other gospel responses
        // docs.push("prayers/litanies/three_great_litanies");
        docs.push("prayers/responses/in_the_wisdom");
        docs.push("prayers/nicene_creed");
        docs.push("prayers/responses/service_intro");
        docs.push("prayers/reconciliation_stgregory");
        docs.push("prayers/responses/greet_one_another_standard");
        docs.push("hymns/hymn_intercessions_liturgy_of_the_faithful_come");
        docs.push("prayers/anaphora_stgregory");
        docs.push("prayers/prayer_agios_stgregory");
        return docs;

    },
    StCyrilFaithful: function (attributes) {
        var docs = [];
        var copticDate = CopticCalendar.getCopticDate(attributes.year, attributes.monthIndex, attributes.day);
        var copticMonthIndex = copticDate.monthIndex;
        var copticDay = copticDate.day;
        docs.push("hymns/standard/response_gospel_standard_liturgy"); // This will need to be changed to the attributes.day to accommodate for other gospel responses
        // docs.push("prayers/litanies/three_great_litanies");
        docs.push("prayers/responses/in_the_wisdom");
        docs.push("prayers/nicene_creed");
        docs.push("prayers/responses/service_intro");

        return docs;

    },    

}
module.exports = Liturgy;
