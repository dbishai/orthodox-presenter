var CopticCalendar = require('./CopticCalendar.js');
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
    } else if (CopticDateComparator("Paope", 10, "Tobe", 10, copticMonthIndex, copticDay)){
        docs.push("prayers/litanies/seeds_and_herbs");
    } else if (CopticDateComparator("Paone", 12, "Paope", 9, copticMonthIndex, copticDay)){
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
    } else if (CopticDateComparator("Paope", 10, "Tobe", 10, copticMonthIndex, copticDay)){
        docs.push("prayers/litanies/seeds_and_herbs");
    } else if (CopticDateComparator("Paone", 12, "Paope", 9, copticMonthIndex, copticDay)){
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

var Vespers = function (attributes) {

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
    docs.push ("prayers/the_short_blessing");
    docs.push("prayers/our_father");

    return docs;
};

var Matins = function (attributes) {

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
    docs.push ("prayers/the_short_blessing");
    docs.push("prayers/our_father");

    return docs;
};

var daysToMilliseconds = function (numOfDays) {
    return numOfDays * 60 * 60 * 24 * 1000
};

var StBasilOffering = function (attributes) {
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
};

var StBasilWord = function (attributes) {
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

};
var StBasilFaithful = function (attributes) {
    var docs = [];
    var copticDate = CopticCalendar.getCopticDate(attributes.year, attributes.monthIndex, attributes.day);
    var copticMonthIndex = copticDate.monthIndex;
    var copticDay = copticDate.day;
    docs.push("hymns/standard/response_gospel_standard_liturgy"); // This will need to be changed to the attributes.day to accommodate for other gospel responses
    //    docs.push("prayers/litanies/three_great_litanies");
    docs.push("prayers/responses/in_the_wisdom");
    docs.push("prayers/nicene_creed");
    docs.push("prayers/responses/service_intro");
    docs.push("prayers/prayer_reconciliation");
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

};
var StBasilDistribution = function (attributes){
    var docs = [];
    docs.push("prayers/distribution");
    docs.push("hymns/standard/psalm150_standard") // This will need to be changed to the attributes.day to accommodate for other occasions


    return docs;
};
var FirstHour = function (attributes) { //content for the first hour of the book of hours
    var docs = [];
    docs.push("bookofhours/first_hour");
    docs.push("prayers/our_father");
    docs.push("bookofhours/thanksgiving_prayer");
    docs.push("bookofhours/psalm_50");
    docs.push("bookofhours/come_let_us_kneel_down");
    docs.push("bookofhours/pauline_epistle");
    docs.push("bookofhours/faith_of_the_church");
    docs.push("bookofhours/first_hour_intro");
    docs.push("bookofhours/psalms/psalm_1");
    docs.push("bookofhours/psalms/psalm_2");
    docs.push("bookofhours/psalms/psalm_3");
    docs.push("bookofhours/psalms/psalm_4");
    docs.push("bookofhours/psalms/psalm_5");
    docs.push("bookofhours/psalms/psalm_6");
    docs.push("bookofhours/psalms/psalm_8");
    docs.push("bookofhours/psalms/psalm_11");
    docs.push("bookofhours/psalms/psalm_12");
    docs.push("bookofhours/psalms/psalm_14");
    docs.push("bookofhours/psalms/psalm_15");
    docs.push("bookofhours/psalms/psalm_18");
    docs.push("bookofhours/psalms/psalm_24");
    docs.push("bookofhours/psalms/psalm_26");
    docs.push("bookofhours/psalms/psalm_62");
    docs.push("bookofhours/psalms/psalm_66");
    docs.push("bookofhours/psalms/psalm_69");
    docs.push("bookofhours/psalms/psalm_112");
    docs.push("bookofhours/psalms/psalm_142");
    docs.push("bookofhours/gospel_first_hour");
    docs.push("bookofhours/first_hour_litanies");
    docs.push("prayers/the_gloria");
    docs.push("prayers/trisagion");
    docs.push("prayers/our_father");
    docs.push("bookofhours/hail_to_you");
    docs.push("prayers/intro_creed");
    docs.push("prayers/nicene_creed");
    docs.push("bookofhours/lord_have_mercy_41");
    docs.push("prayers/holy_holy_holy");
    docs.push("prayers/our_father");
    docs.push("bookofhours/first_absolution");
    docs.push("bookofhours/second_absolution");
    docs.push("bookofhours/conclusion_every_hour");

    return docs;
};
var ThirdHour = function (attributes) {
    var docs = [];
    docs.push("bookofhours/third_hour");
    docs.push("prayers/our_father");
    docs.push("bookofhours/thanksgiving_prayer");
    docs.push("bookofhours/psalm_50");
    docs.push("bookofhours/third_hour_intro");
    docs.push("bookofhours/psalms/psalm_22");
    docs.push("bookofhours/psalms/psalm_23");
    docs.push("bookofhours/psalms/psalm_25");
    docs.push("bookofhours/psalms/psalm_28");
    docs.push("bookofhours/psalms/psalm_29");
    docs.push("bookofhours/psalms/psalm_33");
    docs.push("bookofhours/psalms/psalm_40");
    docs.push("bookofhours/psalms/psalm_42");
    docs.push("bookofhours/psalms/psalm_44");
    docs.push("bookofhours/psalms/psalm_45");
    docs.push("bookofhours/psalms/psalm_46");
    docs.push("bookofhours/gospel_third_hour");
    docs.push("bookofhours/third_hour_litanies");
    docs.push("prayers/trisagion");
    docs.push("prayers/our_father");
    docs.push("bookofhours/hail_to_you");
    docs.push("prayers/intro_creed");
    docs.push("prayers/nicene_creed");
    docs.push("bookofhours/lord_have_mercy_41");
    docs.push("prayers/holy_holy_holy");
    docs.push("prayers/our_father");
    docs.push("bookofhours/third_hour_absolution");
    docs.push("bookofhours/conclusion_every_hour");

    return docs;
};
var SixthHour = function (attributes) {
    var docs = [];
    docs.push("bookofhours/sixth_hour");
    docs.push("prayers/our_father");
    docs.push("bookofhours/thanksgiving_prayer");
    docs.push("bookofhours/psalm_50");
    docs.push("bookofhours/sixth_hour_intro");
    docs.push("bookofhours/psalms/psalm_53");
    docs.push("bookofhours/psalms/psalm_56");
    docs.push("bookofhours/psalms/psalm_60");
    docs.push("bookofhours/psalms/psalm_62");
    docs.push("bookofhours/psalms/psalm_66");
    docs.push("bookofhours/psalms/psalm_69");
    docs.push("bookofhours/psalms/psalm_83");
    docs.push("bookofhours/psalms/psalm_84");
    docs.push("bookofhours/psalms/psalm_85");
    docs.push("bookofhours/psalms/psalm_86");
    docs.push("bookofhours/psalms/psalm_90");
    docs.push("bookofhours/psalms/psalm_92");
    docs.push("bookofhours/gospel_sixth_hour");
    docs.push("bookofhours/sixth_hour_litanies");
    docs.push("prayers/trisagion");
    docs.push("prayers/our_father");
    docs.push("bookofhours/hail_to_you");
    docs.push("prayers/intro_creed");
    docs.push("prayers/nicene_creed");
    docs.push("bookofhours/lord_have_mercy_41");
    docs.push("prayers/holy_holy_holy");
    docs.push("prayers/our_father");
    docs.push("bookofhours/sixth_hour_absolution");
    docs.push("bookofhours/conclusion_every_hour");

    return docs;
};
var NinthHour = function (attributes) {
    var docs = [];
    docs.push("bookofhours/ninth_hour");
    docs.push("prayers/our_father");
    docs.push("bookofhours/thanksgiving_prayer");
    docs.push("bookofhours/psalm_50");
    docs.push("bookofhours/ninth_hour_intro");
    docs.push("bookofhours/psalms/psalm_95");
    docs.push("bookofhours/psalms/psalm_96");
    docs.push("bookofhours/psalms/psalm_97");
    docs.push("bookofhours/psalms/psalm_98");
    docs.push("bookofhours/psalms/psalm_99");
    docs.push("bookofhours/psalms/psalm_100");
    docs.push("bookofhours/psalms/psalm_109");
    docs.push("bookofhours/psalms/psalm_110");
    docs.push("bookofhours/psalms/psalm_111");
    docs.push("bookofhours/psalms/psalm_112");
    docs.push("bookofhours/psalms/psalm_114");
    docs.push("bookofhours/psalms/psalm_115");
    docs.push("bookofhours/gospel_ninth_hour");
    docs.push("bookofhours/ninth_hour_litanies");
    docs.push("prayers/intro_creed");
    docs.push("prayers/nicene_creed");
    docs.push("bookofhours/lord_have_mercy_41");
    docs.push("prayers/holy_holy_holy");
    docs.push("prayers/our_father");
    docs.push("bookofhours/ninth_hour_absolution");
    docs.push("bookofhours/conclusion_every_hour");

    return docs;
};
var EleventhHour = function (attributes) {
    var docs = [];
    docs.push("bookofhours/eleventh_hour");
    docs.push("prayers/our_father");
    docs.push("bookofhours/thanksgiving_prayer");
    docs.push("bookofhours/psalm_50");
    docs.push("bookofhours/eleventh_hour_intro");
    docs.push("bookofhours/psalms/psalm_116");
    docs.push("bookofhours/psalms/psalm_117");
    docs.push("bookofhours/psalms/psalm_119");
    docs.push("bookofhours/psalms/psalm_120");
    docs.push("bookofhours/psalms/psalm_121");
    docs.push("bookofhours/psalms/psalm_122");
    docs.push("bookofhours/psalms/psalm_123");
    docs.push("bookofhours/psalms/psalm_124");
    docs.push("bookofhours/psalms/psalm_125");
    docs.push("bookofhours/psalms/psalm_126");
    docs.push("bookofhours/psalms/psalm_127");
    docs.push("bookofhours/psalms/psalm_128");
    docs.push("bookofhours/gospel_eleventh_hour");
    docs.push("bookofhours/eleventh_hour_litanies");
    docs.push("prayers/trisagion");
    docs.push("prayers/our_father");
    docs.push("bookofhours/hail_to_you");
    docs.push("bookofhours/lord_have_mercy_41");
    docs.push("prayers/holy_holy_holy");
    docs.push("prayers/our_father");
    docs.push("bookofhours/eleventh_hour_absolution");
    docs.push("bookofhours/conclusion_every_hour");

    return docs;
};
var TwelfthHour = function (attributes) {
    var docs = [];
    docs.push("bookofhours/twelfth_hour");
    docs.push("prayers/our_father");
    docs.push("bookofhours/thanksgiving_prayer");
    docs.push("bookofhours/psalm_50");
    docs.push("bookofhours/twelfth_hour_intro");
    docs.push("bookofhours/psalms/psalm_129");
    docs.push("bookofhours/psalms/psalm_130");
    docs.push("bookofhours/psalms/psalm_131");
    docs.push("bookofhours/psalms/psalm_132");
    docs.push("bookofhours/psalms/psalm_133");
    docs.push("bookofhours/psalms/psalm_136");
    docs.push("bookofhours/psalms/psalm_137");
    docs.push("bookofhours/psalms/psalm_140");
    docs.push("bookofhours/psalms/psalm_141");
    docs.push("bookofhours/psalms/psalm_145");
    docs.push("bookofhours/psalms/psalm_146");
    docs.push("bookofhours/psalms/psalm_147");
    docs.push("bookofhours/gospel_twelfth_hour");
    docs.push("bookofhours/twelfth_hour_litanies");
    docs.push("prayers/graciously_accord");
    docs.push("prayers/trisagion");
    docs.push("prayers/our_father");
    docs.push("bookofhours/hail_to_you");
    docs.push("prayers/intro_creed");
    docs.push("prayers/nicene_creed");
    docs.push("bookofhours/lord_have_mercy_41");
    docs.push("prayers/holy_holy_holy");
    docs.push("prayers/our_father");
    docs.push("bookofhours/twelfth_hour_absolution");
    docs.push("bookofhours/conclusion_every_hour");

    return docs;
};
var Veil = function (attributes) {
    var docs = [];
    docs.push("bookofhours/veil");
    docs.push("prayers/our_father");
    docs.push("bookofhours/thanksgiving_prayer");
    docs.push("bookofhours/psalm_50");
    docs.push("bookofhours/veil_intro");
    docs.push("bookofhours/psalms/psalm_4");
    docs.push("bookofhours/psalms/psalm_6");
    docs.push("bookofhours/psalms/psalm_12");
    docs.push("bookofhours/psalms/psalm_15");
    docs.push("bookofhours/psalms/psalm_24");
    docs.push("bookofhours/psalms/psalm_26");
    docs.push("bookofhours/psalms/psalm_66");
    docs.push("bookofhours/psalms/psalm_69");
    docs.push("bookofhours/psalms/psalm_22");
    docs.push("bookofhours/psalms/psalm_29");
    docs.push("bookofhours/psalms/psalm_42");
    docs.push("bookofhours/psalms/psalm_56");
    docs.push("bookofhours/psalms/psalm_85");
    docs.push("bookofhours/psalms/psalm_90");
    docs.push("bookofhours/psalms/psalm_96");
    docs.push("bookofhours/psalms/psalm_109");
    docs.push("bookofhours/psalms/psalm_114");
    docs.push("bookofhours/psalms/psalm_115");
    docs.push("bookofhours/psalms/psalm_120");
    docs.push("bookofhours/psalms/psalm_128");
    docs.push("bookofhours/psalms/psalm_129");
    docs.push("bookofhours/psalms/psalm_130");
    docs.push("bookofhours/psalms/psalm_131");
    docs.push("bookofhours/psalms/psalm_132");
    docs.push("bookofhours/psalms/psalm_133");
    docs.push("bookofhours/psalms/psalm_136");
    docs.push("bookofhours/psalms/psalm_140");
    docs.push("bookofhours/psalms/psalm_145");
    docs.push("bookofhours/psalms/psalm_118_20");
    docs.push("bookofhours/psalms/psalm_118_21");
    docs.push("bookofhours/psalms/psalm_118_22");
    docs.push("bookofhours/gospel_veil");
    docs.push("bookofhours/veil_litanies");
    docs.push("prayers/trisagion");
    docs.push("prayers/our_father");
    docs.push("bookofhours/hail_to_you");
    docs.push("prayers/intro_creed");
    docs.push("prayers/nicene_creed");
    docs.push("bookofhours/lord_have_mercy_41");
    docs.push("prayers/holy_holy_holy");
    docs.push("prayers/our_father");
    docs.push("bookofhours/veil_absolution");
    docs.push("bookofhours/conclusion_every_hour");

    return docs;
};
var Confession = function (attributes){
    var docs = [];
    docs.push("bookofhours/prayer_repentance");
    docs.push("bookofhours/prayer_before_confession");
    docs.push("bookofhours/prayer_after_confession");

    return docs;

};
var Guidance = function (attributes){
    var docs = [];
    docs.push("bookofhours/prayer_guidance");
    docs.push("bookofhours/prayer_accompaniment");

    return docs;

};
var Meals = function (attributes) {
    var docs = [];
    docs.push("bookofhours/prayer_before_meals");
    docs.push("bookofhours/prayer_after_meals");

    return docs;
};
var Deacons = function (attributes) {
    var docs = [];
    docs.push("bookofhours/psalms/psalm_121");
    docs.push("bookofhours/psalms/psalm_26_deacon");
    docs.push("bookofhours/psalms/psalm_64_deacon");
    docs.push("bookofhours/psalms/psalm_83");
    docs.push("bookofhours/psalms/psalm_5_deacon");
    docs.push("bookofhours/psalms/psalm_122");
    docs.push("bookofhours/psalms/psalm_29");
    docs.push("bookofhours/psalms/psalm_92");

    return docs;
};
var Priests = function (attributes) {
    var docs = [];
    docs.push("bookofhours/psalms/psalm_26");
    docs.push("bookofhours/psalms/psalm_46");
    docs.push("bookofhours/psalms/psalm_121");
    docs.push("bookofhours/psalms/psalm_29");
    docs.push("bookofhours/psalms/psalm_92");

    return docs;
};
var FuneralPascha = function (attributes) {
    var docs = [];
    docs.push("prayers/intro_general_funeral");
    docs.push("prayers/our_father");
    docs.push("prayers/responses/in_christ_intro");
    docs.push("prayers/thanksgiving_prayer");
    // + verses of cymbals for funeral
    docs.push("bookofhours/psalm_50");
    docs.push("prayers/responses/glory_be_to_our_god");
    docs.push("readings/pascha/sunday/funeral/ezekiel_37");
    docs.push("prayers/litanies/sick");
    docs.push("hymns/pascha/responses/every_night");
    docs.push("hymns/pascha/tenousht");
    docs.push("hymns/pascha/coptic_pauline");
    docs.push("readings/pascha/sunday/funeral/1_cor_15");
    docs.push("hymns/pascha/trisagion");
    docs.push("prayers/litanies/gospel");
    docs.push("prayers/litanies/gospel_alt");
    docs.push("readings/pascha/sunday/funeral/psalm");
    docs.push("hymns/pascha/ke_eperto");
    docs.push("readings/pascha/sunday/funeral/gospel");
    docs.push("hymns/pascha/funeral_gospel_response");
    // + three great litanies
    docs.push("prayers/responses/in_the_wisdom");
    docs.push("prayers/nicene_creed");
    docs.push("prayers/litanies/departed");
    docs.push("prayers/our_father");
    // + prayer after Our Father + Submission to the Son
    docs.push("prayers/prayer_absolution_son");
    docs.push("hymns/pascha/pascha_conclusion");
    docs.push("hymns/concluding_hymn/pascha");
    docs.push ("prayers/pascha/short_blessing_pascha");

    return docs;
};
var PaschaSundayNinth = function (attributes) {
    var docs = [];
    docs.push("prayers/pascha/introduction/sunday_ninth");
    docs.push("readings/pascha/sunday/day/ninth_hour/lamentations");
    docs.push("readings/pascha/sunday/day/ninth_hour/zephaniah");
    docs.push("prayers/pascha/introduction/intro_paschal_praise_sunday_ninth");
    docs.push("hymns/pascha/thine_is_the_power_short");
    docs.push("prayers/our_father");
    docs.push("readings/pascha/sunday/day/ninth_hour/psalm");
    docs.push("hymns/pascha/ke_eperto");
    docs.push("readings/pascha/sunday/day/ninth_hour/gospel");
    docs.push("hymns/pascha/exposition_intro");
    docs.push("readings/pascha/sunday/day/ninth_hour/exposition");
    docs.push("hymns/pascha/exposition_conc");

    return docs;
};
var PaschaSundayEleventh = function (attributes) {
    var docs = [];
    docs.push("prayers/pascha/introduction/sunday_eleventh");
    docs.push("readings/pascha/sunday/day/eleventh_hour/isaiah");
    docs.push("readings/pascha/sunday/day/eleventh_hour/nahum");
    docs.push("prayers/pascha/introduction/intro_paschal_praise_sunday_eleventh");
    docs.push("hymns/pascha/thine_is_the_power_short");
    docs.push("prayers/our_father");
    docs.push("readings/pascha/sunday/day/eleventh_hour/psalm");
    docs.push("hymns/pascha/ke_eperto");
    docs.push("readings/pascha/sunday/day/eleventh_hour/gospel");
    docs.push("hymns/pascha/exposition_intro");
    docs.push("readings/pascha/sunday/day/eleventh_hour/exposition");
    docs.push("hymns/pascha/exposition_conc");
    docs.push("prayers/pascha/daytime_litanies");
    docs.push("hymns/pascha/pascha_conclusion");
    docs.push("hymns/concluding_hymn/pascha");
    docs.push ("prayers/pascha/short_blessing_pascha");

    return docs;
};



module.exports.Vespers = Vespers;
module.exports.Matins = Matins;
module.exports.StBasilOffering = StBasilOffering;
module.exports.StBasilWord = StBasilWord;
module.exports.StBasilFaithful = StBasilFaithful;
module.exports.StBasilDistribution = StBasilDistribution;
module.exports.FirstHour = FirstHour;
module.exports.ThirdHour = ThirdHour;
module.exports.SixthHour = SixthHour;
module.exports.NinthHour = NinthHour;
module.exports.EleventhHour = EleventhHour;
module.exports.TwelfthHour = TwelfthHour;
module.exports.Veil = Veil;
// module.exports.Midnight = Midnight;
module.exports.Meals = Meals;
module.exports.Confession = Confession;
module.exports.Guidance = Guidance;
module.exports.Deacons = Deacons;
module.exports.Priests = Priests;
module.exports.FuneralPascha = FuneralPascha;
module.exports.PaschaSundayNinth = PaschaSundayNinth;
module.exports.PaschaSundayEleventh = PaschaSundayEleventh;
