
'use strict';

const request = require('request');

  module.exports.currentPriceQuote = async function (symbol) {

    return new Promise((resolve, reject) => {

        let url = `${process.env.YAHOO_FINANCE_QUOTE_URL}/${symbol}/`;

        request(url, function (error, res, body) {
  
            if (error) { 
                reject(error);
             }

            if (res.statusCode !== 200) {
                reject(`${res.statusCode}: ${res.statusMessage}`);
            }

            try {

                // We need to do some trickery here.  When a symbol is not found the full body is still returned with statuscode = 200
                // We do the first split and if there is < 2 array elements we know the symbol was not found and reject
                let price = body.split(`"${symbol}":{"sourceInterval"`);
                
                if (price.length <= 1) {
                    reject('Symbol not found.');
                }

                price = price[1].split("regularMarketPrice")[1]
                .split("fmt\":\"")[1]
                .split("\"")[0];

                // Remove the comma for those prices > 999 and convert to float
                price = parseFloat(price.replace(/\,/g,''));

                resolve({ symbol: symbol, price: price });

            } catch (e) {
                reject(e)
            }
  
        });
      }).catch(error => { return error });
  }