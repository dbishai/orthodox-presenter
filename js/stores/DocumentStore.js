var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var OPConstants = require('../constants/OPConstants');
var assign = require('object-assign');
var CopticCalendar = require('../lib/CopticCalendar.js');

var CHANGE_EVENT = 'change';

var Document = {1: require('../../docs/prayers/nicene_creed.json')};

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
    var day_tune = CopticCalendar.AdamOrWatos(attributes.year, attributes.monthIndex, attributes.day);
    var docs = [];
    if (category == "verses_of_the_cymbals") {
        if (day_tune == "adam") {
            docs.push("docs/hymns/adam_intro_verses_of_the_cymbals.json");
        } else {
            docs.push("docs/hymns/watos_intro_verses_of_the_cymbals.json");
        }
        docs.push("docs/hymns/verses_of_the_cymbals.json");
    }
    $.when($.getJSON(docs[0]), $.getJSON(docs[1]))
        .done(function (data, data2) {
            Document = {0: data[0], 1: data2[0]};
            console.log(JSON.stringify(Document));
            DocumentStore.emitChange();
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
}


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
