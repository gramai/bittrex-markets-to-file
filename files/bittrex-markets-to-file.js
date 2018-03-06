#!/usr/bin/env nodejs
const MarketManager = require('bittrex-market')
const EventEmitter = require('events')
//set to true if you want to replay historic trades
const marketManager = new MarketManager(false)

var fs = require('fs');

class Trigger extends EventEmitter{
    constructor(){super()}
    market_trigger(market,path,book_depth){
        var ethereum_slice_ask=new Array(book_depth); 
        var ethereum_slice_bid=new Array (book_depth); 
        var bitcoin_slice_ask=new Array(book_depth);
        var bitcoin_slice_bid=new Array (book_depth);
        //check if token_name is "ETH", in which case only data from "BTC-ETH" will be collected
        if(market!="ETH"){ 
            marketManager.market('ETH-'+market, (err, ethereum) => {
                ethereum.on('fills', console.log)
                //fires each time changes have been applied to the orderbook, and prints the current state of the orderbook
                ethereum.on('orderbookUpdated', () => {
                    //print the asks side of the current order book state
                    //the format is an array of [ rate, quantity ]
                    //i.e. [[ 0.10994992, 4.37637934 ], [ 0.10996992, 10.47637934 ] ...]
                    if(ethereum_slice_ask!=ethereum.asks.slice(0,book_depth) && ethereum_slice_bid!=ethereum.bids.slice(0,book_depth)){
                        ethereum_slice_ask = ethereum.asks.slice(0,book_depth);
                        //console.log(ethereum_slice_ask);             
                        ethereum_slice_bid = ethereum.bids.slice(0,book_depth);
                        //console.log(ethereum_slice_bid);
                        fs.writeFile(path+"/ETH-"+market+".txt", ethereum_slice_ask.concat(ethereum_slice_bid) , function(err) {
                            if(err) {
                                return console.log(err);
                            }
                        }); 
                    }
                })
            })


            marketManager.market('BTC-'+market, (err, bitcoin) => {
                //print the fulfilled orders to stdout in real time
                bitcoin.on('fills', console.log)
                //fires each time changes have been applied to the orderbook, and prints the current state of the orderbook
                bitcoin.on('orderbookUpdated', () => {
                    //print the asks side of the current order book state
                    //the format is an array of [ rate, quantity ]
                    //i.e. [[ 0.10994992, 4.37637934 ], [ 0.10996992, 10.47637934 ] ...]
                if(bitcoin_slice_ask!=bitcoin.asks.slice(0,book_depth) && bitcoin_slice_bid!=bitcoin.bids.slice(0,book_depth)){
                        bitcoin_slice_ask = bitcoin.asks.slice(0,book_depth);
                        //console.log(bitcoin_slice_ask);
                        bitcoin_slice_bid = bitcoin.bids.slice(0,book_depth);
                        //console.log(bitcoin_slice_bid);
                        fs.writeFile(path+"/BTC-"+market+".txt", bitcoin_slice_ask.concat(bitcoin_slice_bid) , function(err) {
                            if(err) {
                                return console.log(err);
                            }
                        }); 
                    }
                })
            })
        }
        else{
            marketManager.market('BTC-'+market, (err, bitcoin) => {
                //print the fulfilled orders to stdout in real time
                bitcoin.on('fills', console.log)
                //fires each time changes have been applied to the orderbook, and prints the current state of the orderbook
                bitcoin.on('orderbookUpdated', () => {
                    //print the asks side of the current order book state
                    //the format is an array of [ rate, quantity ]
                    //i.e. [[ 0.10994992, 4.37637934 ], [ 0.10996992, 10.47637934 ] ...]
                    if(bitcoin_slice_ask!=bitcoin.asks.slice(0,book_depth) && bitcoin_slice_bid!=bitcoin.bids.slice(0,book_depth)){
                        bitcoin_slice_ask = bitcoin.asks.slice(0,book_depth);
                        //console.log(bitcoin_slice_ask);
                        bitcoin_slice_bid = bitcoin.bids.slice(0,book_depth);
                        //console.log(bitcoin_slice_bid);
                        fs.writeFile(path+"/BTC-"+market+".txt", bitcoin_slice_ask.concat(bitcoin_slice_bid) , function(err) {
                            if(err) {
                                return console.log(err);
                            }
                        }); 
                    }
                })
            })
        }

    }
}
module.exports = Trigger;
