var CopticMonthObjects = [
  {
    name: "Thout",
    startDate: "09/11",
    leap: true
  },
  {
    name :"Paopi",
    startDate: "10/11",
    leap: true
  },
  { 
    name:"Hathor",
    startDate: "11/10",
    leap: true
  },
  {
    name: "Koiak",
    startDate: "12/10",
    leap: true
  },
  {
    name: "Tobi",
    startDate: "01/09",
    leap: true
  },
  {
    name: "Meshir",
    startDate: "02/08",
    leap: true
  },
  {
    name: "Paremhat",
    startDate: "03/10",
    leap: false
  },
  {
    name: "Parmouti",
    startDate: "04/09",
    leap: false
  },
  {
    name: "Pashons",
    startDate: "05/09",
    leap: false 
  },
  {
    name: "Paoni",
    startDate: "06/08",
    leap: false
  },
  {
    name: "Epip",
    startDate: "07/08",
    leap: false
  },
  {
    name: "Mesori",
    startDate: "08/07",
    leap: false
  },
  {
    name: "Pi Kogi Enavot",
    startDate: "09/06",
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
  var strArray = CopticMonthObject.startDate.split("/");
  var m = parseInt(strArray[0]);
  var d = parseInt(strArray[1]);
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
  if ((monthIndex + 1) >= 9 && day >= (leapYear ? 12 : 11)) {
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
    var gregDate = new Date(year, monthIndex, day);
    var copticMonthStartDate = getCopticMonthDate(m, year);
    var copticMonthEndDate = getCopticMonthDate(m_next, year);

    // special cases for new Gregorian year
    if ((monthIndex + 1) == 1 && m.name == "Kioak") {
      copticMonthStartDate = getCopticMonthDate(m, year - 1);
    } else if ((monthIndex + 1) == 12 && m_next.name == "Tobi") {
      copticMonthEndDate = getCopticMonthDate(m, year + 1);
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
