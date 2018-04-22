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
        if (dayIndex == 0) {
            if (hour < 9) {
                docs = Liturgy.Matins(attributes);
            } else if (hour < 10) {
                docs = Liturgy.StBasilWord(attributes);
            } else if (hour < 11) {
                docs = Liturgy.StBasilFaithful(attributes);
            } else {
                docs = this.getAgpeyaHour(attributes);
            }
        } else {
            docs = this.getAgpeyaHour(attributes);
        }

        return docs;
    },

    build: function (category, attributes) {
        var docs;
        switch (category) {
            case "vespers":
                docs = Liturgy.Vespers(attributes);
                break;
            case "matins":
                docs = Liturgy.Matins(attributes);
                break;
            case "stbasil_offering":
                docs = Liturgy.StBasilOffering(attributes);
                break;
            case "stbasil_word":
                docs = Liturgy.StBasilWord(attributes);
                break;
            case "stbasil_faithful":
                docs = Liturgy.StBasilFaithful(attributes);
                break;
            case "stbasil_distribution":
                docs = Liturgy.StBasilDistribution(attributes);
                break;
            case "first_hour":
                docs = Agpeya.FirstHour(attributes);
                break;
            case "third_hour":
                docs = Agpeya.ThirdHour(attributes);
                break;
            case "sixth_hour":
                docs = Agpeya.SixthHour(attributes);
                break;
            case "ninth_hour":
                docs = Agpeya.NinthHour(attributes);
                break;
            case "eleventh_hour":
                docs = Agpeya.EleventhHour(attributes);
                break;
            case "twelfth_hour":
                docs = Agpeya.TwelfthHour(attributes);
                break;
            case "veil_hour":
                docs = Agpeya.Veil(attributes);
                break;
            /*
                docs = Agpeya.Midnight(attributes);
                break;
            */
            case "selectedprayers":
                docs = Agpeya.SelectedPrayers(attributes);
                break;
            case "sp_meals":
                docs = Agpeya.Meals(attributes);
                break;
            case "sp_confession":
                docs = Agpeya.Confession(attributes);
                break;
            case "sp_guidance":
                docs = Agpeya.Guidance(attributes);
                break;
            case "sp_deacons":
                docs = Agpeya.Deacons(attributes);
                break;
            case "sp_priests":
                docs = Agpeya.Priests(attributes);
                break;
            case "funeral_pascha":
                docs = Pascha.FuneralPascha(attributes);
                break;
            case "pascha_sunday_ninth":
                docs = Pascha.PaschaSundayNinth(attributes);
                break;
            case "pascha_sunday_eleventh":
                docs = Pascha.PaschaSundayEleventh(attributes);
                break;

            default:
                docs = ["prayers/nicene_creed"];
        }
        return docs;
    }
}

module.exports = DocumentBuilder;
