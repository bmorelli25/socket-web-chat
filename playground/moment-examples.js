var moment = require('moment');
var now = moment();

console.log(now.format());

now.subtract(1, 'year');
console.log(now.format());

// now use a format string
console.log(now.format("MMM Do YYYY, h:mma"));
