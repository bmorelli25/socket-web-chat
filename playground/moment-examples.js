var moment = require('moment');
var now = moment();

console.log(now.format());
console.log(now.format('X')); // Unix time stamp
console.log(now.format('x')); // JS Unix time stamp
console.log(now.valueOf()); // Returns a number

now.subtract(1, 'year');
console.log(now.format());

// now use a format string
console.log(now.format("MMM Do YYYY, h:mma"));

// ** REVERSE, REVERSE ** \\

var timestamp = 1477087991555;
var timestampMoment = moment.utc(timestamp);
console.log(timestampMoment.local().format("h:mma"));
