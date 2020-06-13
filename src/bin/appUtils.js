
'use strict';

module.exports.unixToDate = function (unixTimestamp) {

    // Multiply the provided timstamp by 1000 to convert unix time to current timestamp
    return new Date(unixTimestamp * 1000);
}

module.exports.isEmpty = function (obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

module.exports.addDays = function(paramDate, days) {
    let newDate = new Date(paramDate);

    newDate = newDate.setDate(newDate.getDate() + days);

    return newDate;
}

// module.exports.transformParameters = function(startDate, endDate, interval) {

//     let parameterObject = {};
    
//     // If either the startDate or endDate are undefined we will set the range to retrieve the current date
//     if (startDate === 'undefined' || endDate === 'undefined') {
//         const startDate = Math.floor(Date.UTC(startYear, startMonth, startDay, 0, 0, 0) / 1000);
//         const endDate = Math.floor(Date.UTC(endYear, endMonth, endDay, 0, 0, 0) / 1000);
    
//     } else {
//         parameterObject.rangeStart = startDate;
//         paramaterObject.rangeend = endDate;
//     }

//     if (interval === 'undefined') {

//     } else {
//         parameterObject.interval = interval;
//     }

//     return parameterObject
// }
  