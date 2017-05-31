var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var OPConstants = require('../constants/OPConstants');
var assign = require('object-assign');
var CopticCalendar = require('../lib/CopticCalendar.js');

var CHANGE_EVENT = 'change';

var Document = { 1: require('../../docs/prayers/nicene_creed.json') };

function load(doc, attributes) {
    $.getJSON(doc)
        .done(function (data) {
            Document = data;
            DocumentStore.emitChange();
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
}

function autoLoad(category, attributes) {
    var docs;
    if (category == "vespers") {
        docs = section.Vespers(attributes);
    } else {
        docs = ["prayers/nicene_creed"];
    }
    downloadAsync(docs);
}

function downloadAsync(docs) {
    /*
    Using Deferred Objects, return when all downloads finish. Each resource is only requested once. On Success,
    notify components of change.
    */

    // use slice() to copy array by value
    var docsUnique = $.unique(docs.slice())
    var promises = [];
    var fileDir = "docs/";
    var fileType = ".json";

    for (var i = 0; i < docsUnique.length; i++) {
        promises.push($.getJSON(fileDir + docsUnique[i] + fileType));
    }

    $.when.apply(this, promises)
        .done(function () {
            var docsHash = {};
            Document = {};

            for (var i = 0; i < arguments.length; i++) {
                // When requesting a single resource, three objects will be returned rather than an array
                // of objects. We only need the return JSON in either case.
                if (docsUnique.length == 1) {
                    docsHash[docsUnique[i]] = arguments[i]
                    break;
                } else {
                    docsHash[docsUnique[i]] = arguments[i][0];
                }
            }

            for (var i = 0; i < docs.length; i++) {
                Document[i] = docsHash[docs[i]];
            }

            DocumentStore.emitChange();
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
};

var section = {

    Vespers: function (attributes) {
        var day_tune = CopticCalendar.AdamOrWatos(attributes.year, attributes.monthIndex, attributes.day);
        var docs = [];
        docs.push("prayers/our_father");
        docs.push("prayers/thanksgiving_prayer");
        if (day_tune == "adam") {
            docs.push("hymns/adam_intro_verses_of_the_cymbals");
        } else {
            docs.push("hymns/watos_intro_verses_of_the_cymbals");
        }
        docs.push("hymns/verses_of_the_cymbals");
        docs.push("prayers/litanies/litany_departed");
        //docs.push("prayers/graciously_accord");
        docs.push("prayers/trisagion");
        docs.push("prayers/our_father");
        docs.push("hymns/doxologies/doxologies_intro");
        docs.push("hymns/doxologies/stmary_vespers");
        docs.push("hymns/doxologies/doxologies_concl");
        docs.push("prayers/intro_creed");
        docs.push("prayers/nicene_creed");
        docs.push("prayers/ogodhave_mercyonus");
        docs.push("prayers/litanies/litany_gospel");
        docs.push("prayers/litanies/litanies_peace_short");
        docs.push("prayers/litanies/litanies_fathers_short");
        docs.push("prayers/litanies/litany_place_short");
        docs.push("prayers/our_father");

        return docs;
    }
};

var DocumentStore = assign({}, EventEmitter.prototype, {

    getAll: function () {
        return Document;
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function (action) {

    switch (action.actionType) {
        case OPConstants.LOAD:
            autoLoad(action.doc, action.attributes);
            break;
    }
});

module.exports = DocumentStore;