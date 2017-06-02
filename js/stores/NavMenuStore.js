//var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var NavMenu = {
    "home": {
        "id": "home",
        "title": "Home",
        "url": "index.html",
        "span_class": "glyphicon glyphicon-home"
    },
    "date": {
        "id": "date",
        "title": "Date",
        "url": null,
        "span_class": "glyphicon glyphicon-calendar"
    },
    "lang": {
        "id": "lang",
        "title": "Languages",
        "url": null,
        "span_class": "glyphicon glyphicon-list"
    },
    "mode": {
        "id": "mode",
        "title": "Presentation Mode",
        "url": null,
        "span_class": "glyphicon glyphicon-blackboard"
    },
    "theme": {
        "id": "theme",
        "title": "Theme",
        "url": null,
        "span_class": "glyphicon glyphicon-text-background"
}
};


var NavMenuStore = assign({}, EventEmitter.prototype, {

    /**
     * @return {object}
     */
    getAll: function() {
        return NavMenu;
    }
});


module.exports = NavMenuStore;
