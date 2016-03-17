var CopticMonthObjects = [
  {
    name: "Thout",
    month: 9,
    day: 11,
    leap: true
  },
  {
    name :"Paopi",
    month: 10,
    day: 11,
    leap: true
  },
  { 
    name:"Hathor",
    month: 11,
    day: 10,
    leap: true
  },
  {
    name: "Koiak",
    month: 12,
    day: 10,
    leap: true
  },
  {
    name: "Tobi",
    month: 1,
    day: 9,
    leap: true
  },
  {
    name: "Meshir",
    month: 2,
    day: 8,
    leap: true
  },
  {
    name: "Paremhat",
    month: 3,
    day: 10,
    leap: false
  },
  {
    name: "Parmouti",
    month: 4,
    day: 9,
    leap: false
  },
  {
    name: "Pashons",
    month: 5,
    day: 9,
    leap: false 
  },
  {
    name: "Paoni",
    month: 6,
    day: 8,
    leap: false
  },
  {
    name: "Epip",
    month: 7,
    day: 8,
    leap: false
  },
  {
    name: "Mesori",
    month: 8,
    day: 7,
    leap: false
  },
  {
    name: "Pi Kogi Enavot",
    month: 9,
    day: 6,
    leap: false
  }
];

var isLeapYear = function (year) {
  if ((year % 4 == 0 && year % 100 != 0) || year % 400 ==0) {
    return true;
  }
  return false;
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
  var leapYear = isLeapYear(year);
  // Coptic New Year
  if (monthIndex >= 8 && day >= (leapYear ? 12 : 11)) {
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
    if (monthIndex == 0 && m.name == "Kioak") {
      copticMonthStartDate = getCopticMonthDate(m, year - 1);
      copticMonthEndDate = getCopticMonthDate(m_next, year);
    } else if (monthIndex == 11 && m_next.name == "Tobi") {
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
  var date = getCopticDate(year, monthIndex, day);
  return date.month + " " + date.day + ", " + date.year;
};

var getEasterDate = function (year) {
  // Meeus Julian algorithm
  var a = year % 4;
  var b = year % 7;
  var c = year % 19;
  var d = (19*c + 15) % 30;
  var e = (2*a + 4*b - d + 34) % 7;
  var month = Math.floor((d + e + 114)/31);
  var day = ((d + e + 114) % 31) + 14;
  return new Date(year, month - 1, day); 
}

module.exports.getCopticDate = getCopticDate;
module.exports.getCopticDateString = getCopticDateString;
module.exports.getEasterDate = getEasterDate;
