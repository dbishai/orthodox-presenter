var CopticMonthObjects = [
  {
    name: "Thoout",
    index: 0,
    month: 9,
    day: 11,
    leap: true
  },
  {
    name: "Paope",
    index: 1,
    month: 10,
    day: 11,
    leap: true
  },
  {
    name: "Hathor",
    index: 2,
    month: 11,
    day: 10,
    leap: true
  },
  {
    name: "Koiahk",
    index: 3,
    month: 12,
    day: 10,
    leap: true
  },
  {
    name: "Tobe",
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
    name: "Paremhotep",
    index: 6,
    month: 3,
    day: 10,
    leap: false
  },
  {
    name: "Parmoute",
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
    name: "Paone",
    index: 9,
    month: 6,
    day: 8,
    leap: false
  },
  {
    name: "Epep",
    index: 10,
    month: 7,
    day: 8,
    leap: false
  },
  {
    name: "Mesore",
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

// enumerate Coptic months
var CMs = {
  "Thoout": 0,
  "Paope": 1,
  "Hathor": 2,
  "Koiahk": 3,
  "Tobe": 4,
  "Meshir": 5,
  "Paremhotep": 6,
  "Parmoute": 7,
  "Pashons": 8,
  "Paone": 9,
  "Epep": 10,
  "Mesore": 11,
  "Pi Kogi Enavot": 12
};

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
  var leapYear = isLeapYear(year + 1);
  var m = CopticMonthObject.month;
  var d = CopticMonthObject.day;
  if (CopticMonthObject.leap && leapYear) {
    d++;
  }
  return new Date(year, m - 1, d);
};

var getCopticDate = function (year, monthIndex, day) {
  var copticMonth = "";
  var copticMonthIndex = 0;
  var copticDay = day;
  var copticYear = year - 284;
  var copticNewYearDay = isLeapYear(year + 1) ? 12 : 11;
  // Coptic New Year
  if (monthIndex >= 8 && day >= copticNewYearDay) {
    copticYear++;
  }

  for (var i = 0; i < CopticMonthObjects.length; i++) {
    var m = CopticMonthObjects[i];
    // wrap around to beginning
    var m_next = CopticMonthObjects[(i + 1) % CopticMonthObjects.length];

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
      copticMonthIndex = m.index;
      copticDay = Math.floor((gregDate - copticMonthStartDate) / (1000 * 24 * 3600)) + 1;
      break;
    }
  }

  return {
    month: copticMonth,
    monthIndex: copticMonthIndex,
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
  var d = (19 * c + 15) % 30;
  var e = (2 * a + 4 * b - d + 34) % 7;
  var monthIndex = Math.floor((d + e + 114) / 31) - 1;
  var day = ((d + e + 114) % 31) + 14;
  return new Date(year, monthIndex, day);
};

var getDateString = function (year, monthIndex, day) {
  return monthNames[monthIndex] + " " + day + ", " + year;
};

var getNumericDateString = function (year, monthIndex, day) {
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

var AdamOrWatos = function (year, monthIndex, day) {
  var date = new Date(year, monthIndex, day)
  if (date.getDay() < 3) {
    return "adam";
  }
  return "watos";
}

var CopticDateComparator = function (month1, day1, month2, day2, monthIndex0, day0) {
  /*
  test if date0 is between date1 and date2 by treating Coptic months as circular array
  */

  var monthIndex1 = CMs[month1];
  var monthIndex2 = CMs[month2];
  var offset;

  if (monthIndex2 < monthIndex1) {
    offset = (monthIndex2 + 13) - monthIndex1;
  } else {
    offset = monthIndex2 - monthIndex1;
  }

  // wrap around to beginning of year
  for (var i = monthIndex1; i <= monthIndex1 + offset; i++) {
    if (monthIndex0 == i % 13) {
      // edge cases
      if ((monthIndex0 == monthIndex1 && day0 >= day1)
          || (monthIndex0 == monthIndex2 && day0 <= day2)
          || (monthIndex0 != monthIndex1 && monthIndex0 != monthIndex2)) {
            return true
      }
    }
  }
  return false;
}

module.exports.getCopticDate = getCopticDate;
module.exports.getCopticDateString = getCopticDateString;
module.exports.getEasterDate = getEasterDate;
module.exports.getDateString = getDateString;
module.exports.getNumericDateString = getNumericDateString;
module.exports.AdamOrWatos = AdamOrWatos;
module.exports.CopticDateComparator = CopticDateComparator;