var CopticMonthObjects = [
  {
    name: "Thout",
    index: 0,
    month: 9,
    day: 11,
    leap: true
  },
  {
    name :"Paopi",
    index: 1,
    month: 10,
    day: 11,
    leap: true
  },
  { 
    name:"Hathor",
    index: 2,
    month: 11,
    day: 10,
    leap: true
  },
  {
    name: "Koiak",
    index: 3,
    month: 12,
    day: 10,
    leap: true
  },
  {
    name: "Tobi",
    index: 4,
    month: 1,
    day: 9,
    leap: true
  },
  {
    name: "Meshir",
    index: 5,
    month: 2,
    day: 8,
    leap: true
  },
  {
    name: "Paremhat",
    index: 6,
    month: 3,
    day: 10,
    leap: false
  },
  {
    name: "Parmouti",
    index: 7,
    month: 4,
    day: 9,
    leap: false
  },
  {
    name: "Pashons",
    index: 8,
    month: 5,
    day: 9,
    leap: false 
  },
  {
    name: "Paoni",
    index: 9,
    month: 6,
    day: 8,
    leap: false
  },
  {
    name: "Epip",
    index: 10,
    month: 7,
    day: 8,
    leap: false
  },
  {
    name: "Mesori",
    index: 11,
    month: 8,
    day: 7,
    leap: false
  },
  {
    name: "Pi Kogi Enavot",
    index: 12,
    month: 9,
    day: 6,
    leap: false
  }
];

var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

var isLeapYear = function (year) {
  return ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0);
};

var getCopticMonthDate = function (CopticMonthObject, year) {
  var leapYear = isLeapYear(year);
  var m = CopticMonthObject.month;
  var d = CopticMonthObject.day;
  if (CopticMonthObject.leap && leapYear) {
    d++;
  }
  return new Date(year, m - 1, d);
};

var getCopticDate = function (year, monthIndex, day) {
  var copticMonth = "";
  var copticDay = day;
  var copticYear = year - 284;
  var copticNewYearDay = isLeapYear(year) ? 12 : 11;
  // Coptic New Year
  if (monthIndex >= 8 && day >= copticNewYearDay) {
    copticYear++;
  }

  for (var i = 0; i < CopticMonthObjects.length; i++) {
    var m = CopticMonthObjects[i];
    var m_next;
    if ((i + 1) < CopticMonthObjects.length) {
      m_next = CopticMonthObjects[i+1]; 
    } else {
      // wrap around
      m_next = CopticMonthObjects[0];
    }
    var gregDate = new Date(year, monthIndex, day, 12, 0, 0);
    var copticMonthStartDate;
    var copticMonthEndDate;

    // special cases for new Gregorian year
    if (monthIndex == 0 && m.index == 3) {
      copticMonthStartDate = getCopticMonthDate(m, year - 1);
      copticMonthEndDate = getCopticMonthDate(m_next, year);
    } else if (monthIndex == 11 && m_next.index == 4) {
      copticMonthStartDate = getCopticMonthDate(m, year);
      copticMonthEndDate = getCopticMonthDate(m_next, year + 1);
    } else {
      copticMonthStartDate = getCopticMonthDate(m, year);
      copticMonthEndDate = getCopticMonthDate(m_next, year);
    }

    if (gregDate >= copticMonthStartDate && gregDate < copticMonthEndDate) {
      copticMonth = m.name;
      copticDay = Math.floor((gregDate - copticMonthStartDate)/(1000 * 24 * 3600)) + 1;
      break;
    }
  }

  return {
    month: copticMonth,
    day: copticDay,
    year: copticYear
  };
};

var getCopticDateString = function (year, monthIndex, day) {
  var copticDate = getCopticDate(year, monthIndex, day);
  return copticDate.month + " " + copticDate.day + ", " + copticDate.year;
};

var getEasterDate = function (year) {
  // Meeus Julian algorithm
  var a = year % 4;
  var b = year % 7;
  var c = year % 19;
  var d = (19*c + 15) % 30;
  var e = (2*a + 4*b - d + 34) % 7;
  var monthIndex = Math.floor((d + e + 114)/31) - 1;
  var day = ((d + e + 114) % 31) + 14;
  return new Date(year, monthIndex, day); 
};

var getDateString = function(year, monthIndex, day) {
  return monthNames[monthIndex] + " " + day + ", " + year;
};

var getNumericDateString = function(year, monthIndex, day) {
  var pad = "0";
  var strDay = day.toString();
  var strMonth = (monthIndex + 1).toString();
  if (strMonth.length < 2) {
    strMonth = "0" + strMonth;
  }
  if (strDay.length < 2) {
    strDay = "0" + strDay;
  }

  return strMonth + "/" + strDay + "/" + year;
};

module.exports.getCopticDate = getCopticDate;
module.exports.getCopticDateString = getCopticDateString;
module.exports.getEasterDate = getEasterDate;
module.exports.getDateString = getDateString;
module.exports.getNumericDateString = getNumericDateString;
