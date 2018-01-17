var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var OPConstants = require('../constants/OPConstants');
var assign = require('object-assign');
var CopticCalendar = require('../lib/CopticCalendar.js');
var DocumentBuilder = require('../lib/DocumentBuilder.js');

var CHANGE_EVENT = 'change';

var Document = { 1: require('../../docs/prayers/nicene_creed.json') };
var lastCategory;

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
    lastCategory = category;
    var docs;
    switch (category) {
        case "vespers":
            docs = DocumentBuilder.Vespers(attributes);
            break;
        case "matins":
            docs = DocumentBuilder.Matins(attributes);
            break;
        case "stbasil_offering":
            docs = DocumentBuilder.StBasilOffering(attributes);
            break;
        case "stbasil_word":
              docs = DocumentBuilder.StBasilWord(attributes);
              break;
        case "stbasil_faithful":
              docs = DocumentBuilder.StBasilFaithful(attributes);
              break;
        default:
            docs = ["prayers/nicene_creed"];
    }
    downloadAsync(docs);
}

function refresh(attributes) {
    autoLoad(lastCategory, attributes);
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



var DocumentStore = assign({}, EventEmitter.prototype, {

    getAll: function () {
        return Document;
    },

    getDocuments: function (category, attributes) {
        autoLoad(category, attributes);
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
        case OPConstants.REFRESH:
            refresh(action.attributes);
            break;
    }
});

module.exports = DocumentStore;
