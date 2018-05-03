var SectionLoadConstants = require('../constants/SectionLoadConstants');
var Liturgy = require("./document_builder/Liturgy");
var Agpeya = require("./document_builder/Agpeya");
var Pascha = require("./document_builder/Pascha");


var DocumentBuilder = {
    getAgpeyaHour: function (attributes) {
        var hour = attributes.time;
        if (hour < 9) {
            return Agpeya.FirstHour(attributes);
        } else if (hour < 12) {
            return Agpeya.ThirdHour(attributes);
        } else if (hour < 15) {
            return Agpeya.SixthHour(attributes);
        } else if (hour < 17) {
            return Agpeya.NinthHour(attributes);
        } else if (hour < 18) {
            return Agpeya.EleventhHour(attributes);
        } else {
            return Agpeya.TwelfthHour(attributes);
        }
    },

    autoLoad: function (attributes) {
        var dayIndex = attributes.todayDate.day();
        var hour = attributes.time;
        // Sunday
        if (dayIndex == 0) {
            if (hour < 9) {
                return Liturgy.Matins(attributes);
            } else if (hour < 10) {
                return Liturgy.StBasilWord(attributes);
            } else if (hour < 11) {
                return Liturgy.StBasilFaithful(attributes);
            }
        // Saturday 6PM - 8PM
        } else if (dayIndex == 6 && (18 < hour && hour < 20)) {
            return Liturgy.Vespers(attributes);
        }
        return this.getAgpeyaHour(attributes);
    },

    build: function (category, attributes) {
        switch (category) {
            case SectionLoadConstants.VESPERS:
                return Liturgy.Vespers(attributes);
            case SectionLoadConstants.MATINS:
                return Liturgy.Matins(attributes);
            case SectionLoadConstants.OFFERING_OF_THE_LAMB:
                return Liturgy.StBasilOffering(attributes);
            case SectionLoadConstants.LITURGY_OF_THE_WORD:
                return Liturgy.StBasilWord(attributes);
            case SectionLoadConstants.ST_BASIL_LITURGY_OF_THE_FAITHFUL:
                return Liturgy.StBasilFaithful(attributes);
            case SectionLoadConstants.DISTRIBUTION:
                return Liturgy.StBasilDistribution(attributes);
            case SectionLoadConstants.ST_GREGORY_LITURGY_OF_THE_FAITHFUL:
                return Liturgy.StGregoryFaithful(attributes);
            case SectionLoadConstants.ST_CYRIL_LITURGY_OF_THE_FAITHFUL:
                return Liturgy.StCyrilFaithful(attributes);
            case SectionLoadConstants.AGPEYA_1ST_HOUR:
                return Agpeya.FirstHour(attributes);
            case SectionLoadConstants.AGPEYA_3RD_HOUR:
                return Agpeya.ThirdHour(attributes);
            case SectionLoadConstants.AGPEYA_6TH_HOUR:
                return Agpeya.SixthHour(attributes);
            case SectionLoadConstants.AGPEYA_9TH_HOUR:
                return Agpeya.NinthHour(attributes);
            case SectionLoadConstants.AGPEYA_11TH_HOUR:
                return Agpeya.EleventhHour(attributes);
            case SectionLoadConstants.AGPEYA_1ST_HOUR:
                return Agpeya.TwelfthHour(attributes);
            case SectionLoadConstants.AGPEYA_VEIL:
                return Agpeya.Veil(attributes);
            /*
                return Agpeya.Midnight(attributes);
            */
            case SectionLoadConstants.AGPEYA_SELECTED_PRAYERS:
                return Agpeya.SelectedPrayers(attributes);
            case SectionLoadConstants.AGPEYA_MEALS:
                return Agpeya.Meals(attributes);
            case SectionLoadConstants.AGPEYA_CONFESSION:
                return Agpeya.Confession(attributes);
            case SectionLoadConstants.AGPEYA_GUIDANCE:
                return Agpeya.Guidance(attributes);
            case SectionLoadConstants.AGPEYA_DEACONS:
                return Agpeya.Deacons(attributes);
            case SectionLoadConstants.AGPEYA_PRIESTS:
                return Agpeya.Priests(attributes);
            case SectionLoadConstants.PASCHA_GENERAL_FUNERAL_PRAYER:
                return Pascha.FuneralPascha(attributes);
            case SectionLoadConstants.PASCHA_SUN_9TH_HOUR:
                return Pascha.PaschaSundayNinth(attributes);
            case SectionLoadConstants.PASCHA_SUN_11TH_HOUR:
                return Pascha.PaschaSundayEleventh(attributes);
            default:
                return ["prayers/nicene_creed"];
        }
    }
}

module.exports = DocumentBuilder;
