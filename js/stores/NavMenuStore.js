//var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var NavMenus = {
    0: {
        "id": 0,
        "title": "Home",
        "url": "index.html",
        "span_class": "glyphicon glyphicon-home"
    },
    1: {
        "id": 1,
        "title": "Languages",
        "url": "#",
        "span_class": "glyphicon glyphicon-list"
    },
    2: {
        "id": 2,
        "title": "Presentation Mode",
        "url": "#",
        "span_class": "glyphicon glyphicon-blackboard"
    },
    3: {
        "id": 3,
        "title": "Theme",
        "url": "#",
        "span_class": "glyphicon glyphicon-text-background"
    },
    4: {
        "id": 4,
        "title": "Feedback",
        "url": "mailto:dbishai@outlook.com",
        "span_class": "glyphicon glyphicon-envelope"
    }
};


var NavMenuStore = assign({}, EventEmitter.prototype, {

    /**
     * @return {object}
     */
    getAll: function() {
        return NavMenus;
    }
});


module.exports = NavMenuStore;
