const bluebird = require("bluebird");
const assert = require('assert');

let listenForConfirmations = (txid, cb) => {
    console.log("WAITING FOR CONFIRMATIONS")
    var interval = setInterval(() => {
        getConfirmations(txid, (err, confirmations) => {
            if(confirmations > 0){
                clearInterval(interval);
                return cb(null, true);
            }
            return cb(null, false);
        }) 
    }, 5000)
}

let getConfirmations = (txid, cb) => {
    multichain.getWalletTransaction({
        txid: txid
    }, (err, tx) => {
        if(err){
            console.log("look for confirmed state", err)
            return cb(err)
        }
        return cb(null, tx.confirmations);
    })
}

function AssetsDAO(db, multichain) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof AssetsDAO)) {
        console.log('Warning: SportsDAO constructor called without "new" operator');
        return new AssetsDAO(db);
    }

    var sportsdata = db.collection("sports");
	
var multichainp = bluebird.promisifyAll((multichain), {suffix: "Promise"});	
	
	
	
//---------------------------------1.1-------------------------------------------//
	
	

var someAddress = '1PuAGAudofQAC4hrE2vWf1QwVBiFXCdZWKzV5r';
var someOtherAddress = '1PuAGAudofQAC4hrE2vWf1QwVBiFXCdZWKzV5r';
var someTxId = '231a4f30e2eeba817e4277e39ca65880ff848c52694bf789c5dc0af0ac8bbc31';



	this.getInfo = function (  callback) {
        "use strict";

		multichain.getInfo((err, info) => {
		if(err){
        throw err;
		}
		console.log(info);
		callback(null, info);
		})



	}


	this.sendAssetFrom = function (fromAddress, toAddress,  callback) {
        "use strict";

		multichain.sendAssetFrom({from: fromAddress, to: toAddress, asset: "zcoin", qty: 5}, (err, tx) => {
		if(err){
			console.log(err);
        throw err;
		}
		console.log(res);
		callback(null, res);
		
		})




	}

	

	this.issue = function (someAddress, assetname, callback) {
        "use strict";

		console.log(someAddress);
		multichain.issuePromise({address: someAddress, asset: assetname, qty: 50000, units: 0.01, details: {hello: "world"}}, (err, res) => {
		if(err){
			console.log(err);
			callback(err, null);
        
		}
		console.log(res);
		callback(null, res);
		
		}).then(issueTxid => {
        assert(issueTxid);
        listenForConfirmations(issueTxid, (err, confirmed) => {
            if(err){
                callback(err, null);
            }
            if(confirmed === true){
                //confirmCallback1.call(this);
				
				callback(null, res);
            }
        })
    })
    .catch(err => {
        console.log(err)
		callback(err, null);
        
    })



	}

	this.getRawTransaction = function (someTxId,  callback) {
        "use strict";

		multichain.getRawTransaction({txid: someTxId}, (err, tx) => {

		multichain.decodeRawTransaction({"hexstring": tx}, (err, dTx) => {
        console.log(dTx)
		})
		})


	}
	
	this.getAddresses = function (addresses,  callback) {
        "use strict";

		multichain.getAddresses((err, addresses) => {

		multichain.createMultiSig({nrequired: 2, keys: addresses}, (err, wallet) => {
			if(err){
			console.log(err);
        throw err;
		}
		console.log(res);
		callback(null, res);
		
		
        console.log(wallet)
		});
    
		})


	}
	
	
	this.insertplayer = function (player,  callback) {
        "use strict";
        
		

        

		  
			
			sportsdata.insert(player, function (err, result) {
            "use strict";

            if (!err) {
                console.log("Inserted new player");
                return callback(null, result[0]);
            }

            return callback(err, null);
			});
		

		
		
    }
	
	
	this.getplayer = function(player, callback) {
        "use strict";
		
        sportsdata.findOne({'name': player.name}, function(err, data) {
            "use strict";

			console.log(data);
            if (err) return callback(err, null);

            callback(null, data);
        });
    }
	
	this.getplayers = function( callback) {
        "use strict";
		
        sportsdata.find({}).toArray(function(err, data) {
            "use strict";

			console.log(data);
            if (err) return callback(err, null);

            callback(null, data);
        });
    }
	
	
	
}

module.exports.AssetsDAO = AssetsDAO;
