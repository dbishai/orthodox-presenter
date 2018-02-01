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
    docs.push("prayers/intro_offering_of_incense_vespers");
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
    docs.push("prayers/thanksgiving_prayer");
    docs = docs.concat(verses_of_the_cymbals(attributes));

    // On Saturday morning Litany of Departed is said instead
    if (day != 6) {
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
    docs.push ("prayers/the_short_blessing");
    docs.push("prayers/our_father");

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
    // On Saturdays, Sundays, and feasts of the Lord, Taishori is prayed
    docs = docs.concat(censer_hymn(attributes));
    docs.push("hymns/hymn_intercessions_liturgy_of_the_word");
    /*    docs.push("hymns/response_pauline");
          docs.push("hymns/coptic_pauline_intro");
          docs.push("hymns/coptic_pauline_concl");
          docs.push("hymns/coptic_catholic_intro");
          docs.push("hymns/coptic_catholic_concl");
    */    docs.push("hymns/praxis_response_standard");
    //    docs.push("hymns/coptic_praxis_intro");
    //    docs.push("hymns/coptic_praxis_concl");
    docs.push("hymns/trisagion_hymn");
    docs.push("prayers/litanies/litany_gospel");
    docs.push("prayers/litanies/litany_gospel2");

    return docs;

};
var StBasilFaithful = function (attributes) {
    var docs = [];
    docs.push("hymns/response_gospel_annual_liturgy"); // This will need to be changed to the attributes.day to accommodate for other gospel responses
    //    docs.push("prayers/litanies/three_great_litanies");
    //    docs.push("prayers/responses/in_the_wisdom");
    docs.push("prayers/nicene_creed");
    docs.push("prayers/prayer_reconciliation");
    docs.push("prayers/responses/greet_one_another_standard");
    docs.push("hymns/hymn_intercessions_liturgy_of_the_faithful");
    docs.push("prayers/anaphora_stbasil");
    docs.push("prayers/prayer_agios_stbasil");
    docs.push("prayers/institution_stbasil");
    docs.push("hymns/amen_amen_amen_your_death");
    docs.push("prayers/prayer_epiclesis");
    docs.push("prayers/yea_we_ask_you");
    docs.push("prayers/intro_seven_short_litanies");
    docs.push("prayers/litanies/litany_peace_liturgy");
    docs.push("prayers/litanies/litany_fathers_liturgy");
    docs.push("prayers/litanies/litany_clergy");
    docs.push("prayers/litanies/litany_mercy");
    docs.push("prayers/litanies/litany_place_liturgy");





    return docs;

};
var FirstHour = function (attributes) { //content for the first hour of the book of hours
    var docs = [];
    docs.push("prayers/bookofhours/first_hour");
    docs.push("prayers/our_father");
    docs.push("prayers/bookofhours/thanksgiving_prayer");
    docs.push("prayers/bookofhours/psalm_50");
    docs.push("prayers/bookofhours/come_let_us_kneel_down");
    docs.push("prayers/bookofhours/pauline_epistle");
    docs.push("prayers/bookofhours/faith_of_the_church");
    docs.push("prayers/bookofhours/first_hour_intro");
    docs.push("prayers/bookofhours/psalms/psalm_1");
    docs.push("prayers/bookofhours/psalms/psalm_2");
    docs.push("prayers/bookofhours/psalms/psalm_3");
    docs.push("prayers/bookofhours/psalms/psalm_4");
    docs.push("prayers/bookofhours/psalms/psalm_5");
    docs.push("prayers/bookofhours/psalms/psalm_6");
    docs.push("prayers/bookofhours/psalms/psalm_8");
    docs.push("prayers/bookofhours/psalms/psalm_11");
    docs.push("prayers/bookofhours/psalms/psalm_12");
    docs.push("prayers/bookofhours/psalms/psalm_14");
    docs.push("prayers/bookofhours/psalms/psalm_15");
    docs.push("prayers/bookofhours/psalms/psalm_18");
    docs.push("prayers/bookofhours/psalms/psalm_24");
    docs.push("prayers/bookofhours/psalms/psalm_26");
    docs.push("prayers/bookofhours/psalms/psalm_62");
    docs.push("prayers/bookofhours/psalms/psalm_66");
    docs.push("prayers/bookofhours/psalms/psalm_69");
    docs.push("prayers/bookofhours/psalms/psalm_112");
    docs.push("prayers/bookofhours/psalms/psalm_142");
    docs.push("prayers/bookofhours/gospel_first_hour");
    docs.push("prayers/bookofhours/first_hour_litanies");
    docs.push("prayers/the_gloria");
    docs.push("prayers/trisagion");
    docs.push("prayers/our_father");
    docs.push("prayers/bookofhours/hail_to_you");
    docs.push("prayers/intro_creed");
    docs.push("prayers/nicene_creed");
    docs.push("prayers/bookofhours/lord_have_mercy_41");
    docs.push("prayers/holy_holy_holy");
    docs.push("prayers/our_father");
    docs.push("prayers/bookofhours/first_absolution");
    docs.push("prayers/bookofhours/second_absolution");
    docs.push("prayers/bookofhours/conclusion_every_hour");

    return docs;
};
var ThirdHour = function (attributes) {
    var docs = [];
    docs.push("prayers/bookofhours/third_hour");
    docs.push("prayers/our_father");
    docs.push("prayers/bookofhours/thanksgiving_prayer");
    docs.push("prayers/bookofhours/psalm_50");
    docs.push("prayers/bookofhours/third_hour_intro");
    docs.push("prayers/bookofhours/psalms/psalm_22");
    docs.push("prayers/bookofhours/psalms/psalm_23");
    docs.push("prayers/bookofhours/psalms/psalm_25");
    docs.push("prayers/bookofhours/psalms/psalm_28");
    docs.push("prayers/bookofhours/psalms/psalm_29");
    docs.push("prayers/bookofhours/psalms/psalm_33");
    docs.push("prayers/bookofhours/psalms/psalm_40");
    docs.push("prayers/bookofhours/psalms/psalm_42");
    docs.push("prayers/bookofhours/psalms/psalm_44");
    docs.push("prayers/bookofhours/psalms/psalm_45");
    docs.push("prayers/bookofhours/psalms/psalm_46");
    docs.push("prayers/bookofhours/gospel_third_hour");
    docs.push("prayers/bookofhours/third_hour_litanies");
    docs.push("prayers/trisagion");
    docs.push("prayers/our_father");
    docs.push("prayers/bookofhours/hail_to_you");
    docs.push("prayers/intro_creed");
    docs.push("prayers/nicene_creed");
    docs.push("prayers/bookofhours/lord_have_mercy_41");
    docs.push("prayers/holy_holy_holy");
    docs.push("prayers/our_father");
    docs.push("prayers/bookofhours/third_hour_absolution");
    docs.push("prayers/bookofhours/conclusion_every_hour");

    return docs;
};
var SixthHour = function (attributes) {
    var docs = [];
    docs.push("prayers/bookofhours/sixth_hour");
    docs.push("prayers/our_father");
    docs.push("prayers/bookofhours/thanksgiving_prayer");
    docs.push("prayers/bookofhours/psalm_50");
    docs.push("prayers/bookofhours/sixth_hour_intro");
    docs.push("prayers/bookofhours/psalms/psalm_53");
    docs.push("prayers/bookofhours/psalms/psalm_56");
    docs.push("prayers/bookofhours/psalms/psalm_60");
    docs.push("prayers/bookofhours/psalms/psalm_62");
    docs.push("prayers/bookofhours/psalms/psalm_66");
    docs.push("prayers/bookofhours/psalms/psalm_69");
    docs.push("prayers/bookofhours/psalms/psalm_83");
    docs.push("prayers/bookofhours/psalms/psalm_84");
    docs.push("prayers/bookofhours/psalms/psalm_85");
    docs.push("prayers/bookofhours/psalms/psalm_86");
    docs.push("prayers/bookofhours/psalms/psalm_90");
    docs.push("prayers/bookofhours/psalms/psalm_92");
    docs.push("prayers/bookofhours/gospel_sixth_hour");
    docs.push("prayers/bookofhours/sixth_hour_litanies");
    docs.push("prayers/trisagion");
    docs.push("prayers/our_father");
    docs.push("prayers/bookofhours/hail_to_you");
    docs.push("prayers/intro_creed");
    docs.push("prayers/nicene_creed");
    docs.push("prayers/bookofhours/lord_have_mercy_41");
    docs.push("prayers/holy_holy_holy");
    docs.push("prayers/our_father");
    docs.push("prayers/bookofhours/sixth_hour_absolution");
    docs.push("prayers/bookofhours/conclusion_every_hour");

    return docs;
};
var NinthHour = function (attributes) {
    var docs = [];
    docs.push("prayers/bookofhours/ninth_hour");
    docs.push("prayers/our_father");
    docs.push("prayers/bookofhours/thanksgiving_prayer");
    docs.push("prayers/bookofhours/psalm_50");
    docs.push("prayers/bookofhours/ninth_hour_intro");
    docs.push("prayers/bookofhours/psalms/psalm_95");
    docs.push("prayers/bookofhours/psalms/psalm_96");
    docs.push("prayers/bookofhours/psalms/psalm_97");
    docs.push("prayers/bookofhours/psalms/psalm_98");
    docs.push("prayers/bookofhours/psalms/psalm_99");
    docs.push("prayers/bookofhours/psalms/psalm_100");
    docs.push("prayers/bookofhours/psalms/psalm_109");
    docs.push("prayers/bookofhours/psalms/psalm_110");
    docs.push("prayers/bookofhours/psalms/psalm_111");
    docs.push("prayers/bookofhours/psalms/psalm_112");
    docs.push("prayers/bookofhours/psalms/psalm_114");
    docs.push("prayers/bookofhours/psalms/psalm_115");
    docs.push("prayers/bookofhours/gospel_ninth_hour");
    docs.push("prayers/bookofhours/ninth_hour_litanies");
    docs.push("prayers/intro_creed");
    docs.push("prayers/nicene_creed");
    docs.push("prayers/bookofhours/lord_have_mercy_41");
    docs.push("prayers/holy_holy_holy");
    docs.push("prayers/our_father");
    docs.push("prayers/bookofhours/ninth_hour_absolution");
    docs.push("prayers/bookofhours/conclusion_every_hour");

    return docs;
};
var EleventhHour = function (attributes) {
    var docs = [];
    docs.push("prayers/bookofhours/eleventh_hour");
    docs.push("prayers/our_father");
    docs.push("prayers/bookofhours/thanksgiving_prayer");
    docs.push("prayers/bookofhours/psalm_50");
    docs.push("prayers/bookofhours/eleventh_hour_intro");
    docs.push("prayers/bookofhours/psalms/psalm_116");
    docs.push("prayers/bookofhours/psalms/psalm_117");
    docs.push("prayers/bookofhours/psalms/psalm_119");
    docs.push("prayers/bookofhours/psalms/psalm_120");
    docs.push("prayers/bookofhours/psalms/psalm_121");
    docs.push("prayers/bookofhours/psalms/psalm_122");
    docs.push("prayers/bookofhours/psalms/psalm_123");
    docs.push("prayers/bookofhours/psalms/psalm_124");
    docs.push("prayers/bookofhours/psalms/psalm_125");
    docs.push("prayers/bookofhours/psalms/psalm_126");
    docs.push("prayers/bookofhours/psalms/psalm_127");
    docs.push("prayers/bookofhours/psalms/psalm_128");
    docs.push("prayers/bookofhours/gospel_eleventh_hour");
    docs.push("prayers/bookofhours/eleventh_hour_litanies");
    docs.push("prayers/trisagion");
    docs.push("prayers/our_father");
    docs.push("prayers/bookofhours/hail_to_you");
    docs.push("prayers/bookofhours/lord_have_mercy_41");
    docs.push("prayers/holy_holy_holy");
    docs.push("prayers/our_father");
    docs.push("prayers/bookofhours/eleventh_hour_absolution");
    docs.push("prayers/bookofhours/conclusion_every_hour");

    return docs;
};
var TwelfthHour = function (attributes) {
    var docs = [];
    docs.push("prayers/bookofhours/twelfth_hour");
    docs.push("prayers/our_father");
    docs.push("prayers/bookofhours/thanksgiving_prayer");
    docs.push("prayers/bookofhours/psalm_50");
    docs.push("prayers/bookofhours/twelfth_hour_intro");
    docs.push("prayers/bookofhours/psalms/psalm_129");
    docs.push("prayers/bookofhours/psalms/psalm_130");
    docs.push("prayers/bookofhours/psalms/psalm_131");
    docs.push("prayers/bookofhours/psalms/psalm_132");
    docs.push("prayers/bookofhours/psalms/psalm_133");
    docs.push("prayers/bookofhours/psalms/psalm_136");
    docs.push("prayers/bookofhours/psalms/psalm_137");
    docs.push("prayers/bookofhours/psalms/psalm_140");
    docs.push("prayers/bookofhours/psalms/psalm_141");
    docs.push("prayers/bookofhours/psalms/psalm_145");
    docs.push("prayers/bookofhours/psalms/psalm_146");
    docs.push("prayers/bookofhours/psalms/psalm_147");
    docs.push("prayers/bookofhours/gospel_twelfth_hour");
    docs.push("prayers/bookofhours/twelfth_hour_litanies");
    docs.push("prayers/graciously_accord");
    docs.push("prayers/trisagion");
    docs.push("prayers/our_father");
    docs.push("prayers/bookofhours/hail_to_you");
    docs.push("prayers/intro_creed");
    docs.push("prayers/nicene_creed");
    docs.push("prayers/bookofhours/lord_have_mercy_41");
    docs.push("prayers/holy_holy_holy");
    docs.push("prayers/our_father");
    docs.push("prayers/bookofhours/twelfth_hour_absolution");
    docs.push("prayers/bookofhours/conclusion_every_hour");

    return docs;
};
var Veil = function (attributes) {
    var docs = [];
    docs.push("prayers/bookofhours/veil");
    docs.push("prayers/our_father");
    docs.push("prayers/bookofhours/thanksgiving_prayer");
    docs.push("prayers/bookofhours/psalm_50");
    docs.push("prayers/bookofhours/veil_intro");
    docs.push("prayers/bookofhours/psalms/psalm_4");
    docs.push("prayers/bookofhours/psalms/psalm_6");
    docs.push("prayers/bookofhours/psalms/psalm_12");
    docs.push("prayers/bookofhours/psalms/psalm_15");
    docs.push("prayers/bookofhours/psalms/psalm_24");
    docs.push("prayers/bookofhours/psalms/psalm_26");
    docs.push("prayers/bookofhours/psalms/psalm_66");
    docs.push("prayers/bookofhours/psalms/psalm_69");
    docs.push("prayers/bookofhours/psalms/psalm_22");
    docs.push("prayers/bookofhours/psalms/psalm_29");
    docs.push("prayers/bookofhours/psalms/psalm_42");
    docs.push("prayers/bookofhours/psalms/psalm_56");
    docs.push("prayers/bookofhours/psalms/psalm_85");
    docs.push("prayers/bookofhours/psalms/psalm_90");
    docs.push("prayers/bookofhours/psalms/psalm_96");
    docs.push("prayers/bookofhours/psalms/psalm_109");
    docs.push("prayers/bookofhours/psalms/psalm_114");
    docs.push("prayers/bookofhours/psalms/psalm_115");
    docs.push("prayers/bookofhours/psalms/psalm_120");
    docs.push("prayers/bookofhours/psalms/psalm_128");
    docs.push("prayers/bookofhours/psalms/psalm_129");
    docs.push("prayers/bookofhours/psalms/psalm_130");
    docs.push("prayers/bookofhours/psalms/psalm_131");
    docs.push("prayers/bookofhours/psalms/psalm_132");
    docs.push("prayers/bookofhours/psalms/psalm_133");
    docs.push("prayers/bookofhours/psalms/psalm_136");
    docs.push("prayers/bookofhours/psalms/psalm_140");
    docs.push("prayers/bookofhours/psalms/psalm_145");
    docs.push("prayers/bookofhours/psalms/psalm_118_20");
    docs.push("prayers/bookofhours/psalms/psalm_118_21");
    docs.push("prayers/bookofhours/psalms/psalm_118_22");
    docs.push("prayers/bookofhours/gospel_veil");
    docs.push("prayers/bookofhours/veil_litanies");
    docs.push("prayers/trisagion");
    docs.push("prayers/our_father");
    docs.push("prayers/bookofhours/hail_to_you");
    docs.push("prayers/intro_creed");
    docs.push("prayers/nicene_creed");
    docs.push("prayers/bookofhours/lord_have_mercy_41");
    docs.push("prayers/holy_holy_holy");
    docs.push("prayers/our_father");
    docs.push("prayers/bookofhours/veil_absolution");
    docs.push("prayers/bookofhours/conclusion_every_hour");

    return docs;
};
var Confession = function (attributes){
    var docs = [];
    docs.push("prayers/bookofhours/prayer_repentance");
    docs.push("prayers/bookofhours/prayer_before_confession");
    docs.push("prayers/bookofhours/prayer_after_confession");

    return docs;

};
var Guidance = function (attributes){
    var docs = [];
    docs.push("prayers/bookofhours/prayer_guidance");
    docs.push("prayers/bookofhours/prayer_accompaniment");

    return docs;

};
var Meals = function (attributes) {
    var docs = [];
    docs.push("prayers/bookofhours/prayer_before_meals");
    docs.push("prayers/bookofhours/prayer_after_meals");

    return docs;
};
var Deacons = function (attributes) {
    var docs = [];
    docs.push("prayers/bookofhours/psalms/psalm_121");
    docs.push("prayers/bookofhours/psalms/psalm_26_deacon");
    docs.push("prayers/bookofhours/psalms/psalm_64_deacon");
    docs.push("prayers/bookofhours/psalms/psalm_83");
    docs.push("prayers/bookofhours/psalms/psalm_5_deacon");
    docs.push("prayers/bookofhours/psalms/psalm_122");
    docs.push("prayers/bookofhours/psalms/psalm_29");
    docs.push("prayers/bookofhours/psalms/psalm_92");

    return docs;
};
var Priests = function (attributes) {
    var docs = [];
    docs.push("prayers/bookofhours/psalms/psalm_26");
    docs.push("prayers/bookofhours/psalms/psalm_46");
    docs.push("prayers/bookofhours/psalms/psalm_121");
    docs.push("prayers/bookofhours/psalms/psalm_29");
    docs.push("prayers/bookofhours/psalms/psalm_92");

    return docs;
}


module.exports.Vespers = Vespers;
module.exports.Matins = Matins;
module.exports.StBasilOffering = StBasilOffering;
module.exports.StBasilWord = StBasilWord;
module.exports.StBasilFaithful = StBasilFaithful;
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
