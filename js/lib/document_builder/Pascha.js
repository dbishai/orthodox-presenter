var Pascha = {

    PaschaSundayNinth: function (attributes) {
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
    },

    PaschaSundayEleventh: function (attributes) {
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
        docs.push("prayers/pascha/short_blessing_pascha");

        return docs;
    },

    FuneralPascha: function (attributes) {
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
        docs.push("prayers/pascha/short_blessing_pascha");

        return docs;
    }
}

module.exports = Pascha;
