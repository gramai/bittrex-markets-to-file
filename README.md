# bittrex-market-js
This is a short repository that continuously saves to local files the Bid and Ask Books of all tokens on Bittrex that have both BTC and ETH markets.

# Requirements
Node.js >= 6.0.0

[bittrex-market](https://github.com/gliwka/bittrex-market) repository: Copyright (c) 2017 Matthias Gliwka

``` bash
$ npm install --save bittrex-market
```
# Motivation
I have used this script while developing a trading bot in the last quarter of 2017. As there existed no websocket support for python, I chose to improvise and save locally all markets data (bid/ask price and volume), data that I could after that read and process in my main python script. I realised that this was not the most efficient solution, but developing a functional trading bot was more important at the time for me.
Although I am not using this script for my project anymore (and neither nodeJs), I found the writing of this script to be both fun and educational.

# Mention
I am now using the repository found here: [python-bittrex-websocket](https://github.com/slazarov/python-bittrex-websocket)
Copyright (c) 2017 Stanislav Lazarov 
