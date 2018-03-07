# bittrex-market-js
This is a short repository that continuously saves to local files the Bid and Ask Books of chosen tokens on Bittrex that have both BTC and ETH markets.

# Requirements
Node.js >= 6.0.0

# Dependencies

[bittrex-market](https://github.com/gliwka/bittrex-market) repository: Copyright (c) 2017 Matthias Gliwka


# Installation
This repository is published on npm.
```bash
$ npm install --save bittrex-markets-to-file
```

# Motivation
I have used this script while developing a trading bot in the last quarter of 2017. As there existed no websocket support for python, I chose to improvise and save locally all markets data (bid/ask price and volume), data that I could after that read and process in my main python script. I realised that this was not the most efficient solution, but developing a functional trading bot was more important at the time for me.
Although I am not using this script for my project anymore (and neither nodeJs), I found the writing of this script to be both fun and educational.

# Mention
I am now using the repository found here: [python-bittrex-websocket](https://github.com/slazarov/python-bittrex-websocket)
Copyright (c) 2017 Stanislav Lazarov 

# Example
For Monaco token ([bittrex link for live BTC-MCO market](https://bittrex.com/Market/Index?MarketName=BTC-MCO))

```
const Trigger = require('bittrex-markets-to-file');
trigger = new Trigger();
trigger.market_trigger("MCO" , "/absolute/path" , 10);
// Don't forget to change "/absolute/path" with a path of your own choice
```
# Methods

```
market_trigger(token_name , path , book_depth);
//token_name has to be in the short form : e.g. "LTC", "XMR"
//path should be the absolute path where the files should be saved
//book_depth is the size of the book that needs to be collected
```
Important:
Two files will be created: "BTC-<token_name>.txt" and "ETH-<token_name>.txt". Each of the files will contain the ask and bid book details for the chosen depth.
The data will be printed to the file in the format:
```
first-ask-price , first-ask-quantity , second-ask-price , second-ask-quantity ... chosen_depth-ask-price , chosen_depth-ask-quantity , first-bid-price , first-bid-quantity , second-bid-price , second-bid-quantity ... chosen_depth-bid-price , chosen_depth-bid-quantity
```
e.g. BTC-MCO.txt
```
0.00076396,4.07088364,0.00076444,13.11902972,0.00076445,214.50282146,0.000765,2,0.00076506,130,0.0007651,130,0.00076691,13.11654328,0.00076758,169.42857818,0.00076781,195.84952242,0.00076789,250.00312504,0.000758,239.67142833,0.00075503,244.91487068,0.000755,467.25161238,0.0007534,4.02,0.00075316,287.566,0.00075315,39.73860406,0.00075312,52.98331342,0.00075301,26.49367206,0.000753,2.27201301,0.0007526,874.76747276
```
The method opens a websocket connection. If more markets are intended to be connected, call the market_trigger function in a loop that parses through the desired token names.

