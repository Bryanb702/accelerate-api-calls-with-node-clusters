
'use strict';

// Create the EventEmitter instance in a separate module in order that we can use it as
// a singleton object

let EventEmitter = require('events').EventEmitter;
let notifier = new EventEmitter();

module.exports = notifier;