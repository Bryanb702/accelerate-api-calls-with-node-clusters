
'use strict';

var notifier = require('./eventProcessor');

notifier.on('quote', processQuote);
notifier.on('quoteError', logQuoteError);

function processQuote(quote) {

    // Here is where the magic starts...
    console.log(quote);
}

function logQuoteError(message) {

    console.log(message);
}
