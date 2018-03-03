#!/usr/bin/env nodejs

const MarketManager = require('bittrex-market')

//set to true if you want to replay historic trades
const marketManager = new MarketManager(false)

//access the desired market
var fs = require('fs');

// book depth
var book_max=10;

function market_trigger(market){
    var ethereum_slice_ask=new Array(book_max);
    var ethereum_slice_bid=new Array (book_max);
    var bitcoin_slice_ask=new Array(book_max);
    var bitcoin_slice_bid=new Array (book_max);
if(market!="ETH"){
    marketManager.market('ETH-'+market, (err, ethereum) => {
        //print the fulfilled orders to stdout in real time
        //in case the connection drops and there is a reconnect
        //all fills from the past get replayed
        ethereum.on('fills', console.log)
        //fires each time changes have been applied to the orderbook, and prints the current state of the orderbook
        ethereum.on('orderbookUpdated', () => {
            //print the asks side of the current order book state
            //the format is an array of [ rate, quantity ]
            //i.e. [[ 0.10994992, 4.37637934 ], [ 0.10996992, 10.47637934 ] ...]
        // for (var j=0;j < book_max ; j++) {
            //     console.log(ethereum.asks[j])
        // }
            if(ethereum_slice_ask!=ethereum.asks.slice(0,10) && ethereum_slice_bid!=ethereum.bids.slice(0,10)){
                ethereum_slice_ask = ethereum.asks.slice(0,10);
                console.log(ethereum_slice_ask);

                console.log ("!!!!!!!!BIDS NOW!!!!!!!!");

                
                //for (var j=0;j < book_max ; j++) {
                    //same thing for the bids side
                //  console.log(ethereum.bids[j])
                //}
                
                ethereum_slice_bid = ethereum.bids.slice(0,10);
                console.log(ethereum_slice_bid);
                fs.writeFile("/home/emanuel/files/ETH-"+market+".txt", ethereum_slice_ask.concat(ethereum_slice_bid) , function(err) {
                    if(err) {
                        return console.log(err);
                    }
                
                    console.log("The file was saved!");
                }); 
            }
        })
    })


marketManager.market('BTC-'+market, (err, bitcoin) => {
    //print the fulfilled orders to stdout in real time
    //in case the connection drops and there is a reconnect
    //all fills from the past get replayed
    bitcoin.on('fills', console.log)
    //fires each time changes have been applied to the orderbook, and prints the current state of the orderbook
    bitcoin.on('orderbookUpdated', () => {
        //print the asks side of the current order book state
        //the format is an array of [ rate, quantity ]
        //i.e. [[ 0.10994992, 4.37637934 ], [ 0.10996992, 10.47637934 ] ...]
       // for (var j=0;j < book_max ; j++) {
        //     console.log(ethereum.asks[j])
       // }
        if(bitcoin_slice_ask!=bitcoin.asks.slice(0,10) && bitcoin_slice_bid!=bitcoin.bids.slice(0,10)){
            bitcoin_slice_ask = bitcoin.asks.slice(0,10);
            console.log(bitcoin_slice_ask);

            console.log ("!!!!!!!!BIDS NOW!!!!!!!!");

            
            //for (var j=0;j < book_max ; j++) {
                //same thing for the bids side
            //  console.log(ethereum.bids[j])
            //}
            bitcoin_slice_bid = bitcoin.bids.slice(0,10);
            console.log(bitcoin_slice_bid);
            fs.writeFile("/home/emanuel/files/BTC-"+market+".txt", bitcoin_slice_ask.concat(bitcoin_slice_bid) , function(err) {
                if(err) {
                    return console.log(err);
                }
            
                console.log("The file was saved!");
            }); 
        }
    })
})
}
else{
    marketManager.market('BTC-'+market, (err, bitcoin) => {
        //print the fulfilled orders to stdout in real time
        //in case the connection drops and there is a reconnect
        //all fills from the past get replayed
        bitcoin.on('fills', console.log)
        //fires each time changes have been applied to the orderbook, and prints the current state of the orderbook
        bitcoin.on('orderbookUpdated', () => {
            //print the asks side of the current order book state
            //the format is an array of [ rate, quantity ]
            //i.e. [[ 0.10994992, 4.37637934 ], [ 0.10996992, 10.47637934 ] ...]
           // for (var j=0;j < book_max ; j++) {
            //     console.log(ethereum.asks[j])
           // }
            if(bitcoin_slice_ask!=bitcoin.asks.slice(0,10) && bitcoin_slice_bid!=bitcoin.bids.slice(0,10)){
                bitcoin_slice_ask = bitcoin.asks.slice(0,10);
                console.log(bitcoin_slice_ask);
    
                console.log ("!!!!!!!!BIDS NOW!!!!!!!!");
    
                
                //for (var j=0;j < book_max ; j++) {
                    //same thing for the bids side
                //  console.log(ethereum.bids[j])
                //}
                bitcoin_slice_bid = bitcoin.bids.slice(0,10);
                console.log(bitcoin_slice_bid);
                fs.writeFile("/home/emanuel/files/BTC-"+market+".txt", bitcoin_slice_ask.concat(bitcoin_slice_bid) , function(err) {
                    if(err) {
                        return console.log(err);
                    }
                
                    console.log("The file was saved!");
                }); 
            }
        })
    })
}

}




