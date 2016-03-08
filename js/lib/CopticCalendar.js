var isLeapYear = function (year) {
  if ((year % 4 == 0 && year % 100 != 0) || year % 400 ==0) {
    return true;
  }
  return false;
};

var getCopticMonthDate = function (CopticMonthObject, year) {
  var leapYear = isLeapYear(year);
  var strArray = CopticMonthObject.startDate.split("/");
  var _m = parseInt(strArray[0]);
  var _d = parseInt(strArray[1]);
  if (CopticMonthObject.leap && leapYear) {
    _d++;
  }
  return new Date(year, _m, _d);
};

var getCopticDate = function (monthIndex, day, year) {
  var copticMonth = "";
  var copticDay = day;
  var copticYear = year - 284;
  var leapYear = isLeapYear(year);
  //Coptic New Year
  if ((monthIndex + 1) >= 9 && day >= (leapYear ? 12 : 11)) {
    copticYear++;
  }
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
  },
  ];

  for (var i = 0; i < CopticMonthObjects.length; i++) {
    var m = CopticMonthObjects[i];
    var m_next;
    if ((i + 1) < CopticMonthObjects.length) {
      m_next = CopticMonthObjects[i+1]; 
    } else {
      m_next = CopticMonthObjects[0];
    }
    var gregDate = new Date(year, monthIndex + 1, day);
    var copticStartDate = getCopticMonthDate(m, year);
    var copticEndDate = getCopticMonthDate(m_next, year);

    if (gregDate >= copticStartDate && gregDate < copticEndDate) {
      copticMonth = m.name;
      copticDay = Math.floor((gregDate - copticStartDate)/(1000 * 24 * 3600));
      break;
    }
  }

  return {
    "month": copticMonth,
    "day": copticDay,
    "year": copticYear
  };
};

module.exports.getCopticDate = getCopticDate;
module.exports.getCopticDateString = function(monthIndex, day, year) {
  var date = getCopticDate(monthIndex, day, year);
  return date.month + " " + date.day + ", " + date.year;
};
