
'use strict';

var cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const watchList = require('./watchList');

// Number of threads we're going to create.  This is a multiplier of the 
// number of CPUs.  For this exercise it doesn't add much value but fun to play with
let numThreads = numCPUs * process.env.THREAD_MULTIPLIER || 2;

// Master thread handler
if (cluster.isMaster) {

  // For fun we start a timer to determine the duration of execution
  var timerStart = Date.now();

  for (let t = 0; t < numThreads; t++) {
    var worker = cluster.fork();

    // When the workers signal complete we log message and kill the worker
    worker.on('message', function(message) {
      console.log(`Process ${this.process.pid} has completed processing`);

      this.destroy();
    });
    
    // Send the list to the worker for processing
    worker.send(watchList);
  }

  cluster.on('exit', function(worker) {
    // When the master has no more workers alive it
    // prints the elapsed time and then kills itself 
    if (Object.keys(cluster.workers).length === 0) {
      console.log(`Each worker has finished.`);
      console.log('Elapsed Time: ' + (Date.now() - timerStart) + 'ms');
    }
  });

} else {

  const yahoo = require('../lib/yahooFinanceQuote');

  process.on('message', async function(symbolArray) {
    console.log(`Worker ${process.pid} processing list`);

    for (let i = 0; i < symbolArray.length; i++) {
      let quote = await yahoo.currentPriceQuote(symbolArray[i]);

      console.log(quote);
    }

    process.send('done');
  });
}
