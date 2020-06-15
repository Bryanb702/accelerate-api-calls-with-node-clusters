# accelerate-api-calls-with-node-clusters

This demo stems from a machine learning project that I have been working on wherein the program
needs to query the Yahoo Quote page quite often.  Without the use of clustering the process of 
getting quotes back was taking an excessive amount of time.  Thought I would share the solution.  Thank you clusters!!!

## use

Edit the /processor/watchList.js file to include the stock symbols you want to look up.

node index.js
