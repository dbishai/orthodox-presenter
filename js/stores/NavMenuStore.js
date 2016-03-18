//var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var CopticCalendar = require('../lib/CopticCalendar.js');

var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

var date = new Date();
var day = date.getDate();
var monthIndex = date.getMonth();
var year = date.getFullYear();
var gregDate = monthNames[monthIndex] + " " + day + ", " + year;
var copticDate = CopticCalendar.getCopticDateString(year, monthIndex, day);

var NavMenus = {
    "home": {
        "id": "home",
        "title": "Home",
        "url": "index.html",
        "span_class": "glyphicon glyphicon-home"
    },
    "date": {
        "id": "date",
        "title": gregDate, 
        "url": "#",
        "span_class": "glyphicon glyphicon-calendar"
    },
    "coptic_date": {
        "id": "coptic_date",
        "title": copticDate,
        "url": "#",
        "span_class": "glyphicon glyphicon-calendar"
    },
    "lang": {
        "id": "lang",
        "title": "Languages",
        "url": "#",
        "span_class": "glyphicon glyphicon-list"
    },
    "mode": {
        "id": "mode",
        "title": "Presentation Mode",
        "url": "#",
        "span_class": "glyphicon glyphicon-blackboard"
    },
    "theme": {
        "id": "theme",
        "title": "Theme",
        "url": "#",
        "span_class": "glyphicon glyphicon-text-background"
    },
    "feedback": {
        "id": "feedback",
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
