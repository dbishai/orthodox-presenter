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
    0: {
        "id": 0,
        "html_id": "home",
        "title": "Home",
        "url": "index.html",
        "span_class": "glyphicon glyphicon-home"
    },
    1: {
        "id": 1,
        "html_id": "date",
        "title": gregDate, 
        "url": "#",
        "span_class": "glyphicon glyphicon-calendar"
    },
    2: {
        "id": 2,
        "html_id": "coptic_date",
        "title": copticDate,
        "url": "#",
        "span_class": "glyphicon glyphicon-calendar"
    },
    3: {
        "id": 3,
        "html_id": "lang",
        "title": "Languages",
        "url": "#",
        "span_class": "glyphicon glyphicon-list"
    },
    4: {
        "id": 4,
        "html_id": "mode",
        "title": "Presentation Mode",
        "url": "#",
        "span_class": "glyphicon glyphicon-blackboard"
    },
    5: {
        "id": 5,
        "html_id": "theme",
        "title": "Theme",
        "url": "#",
        "span_class": "glyphicon glyphicon-text-background"
    },
    6: {
        "id": 6,
        "html_id": "feedback",
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
