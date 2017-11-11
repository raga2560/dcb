
function AssetsDAO(db, multichain) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof AssetsDAO)) {
        console.log('Warning: SportsDAO constructor called without "new" operator');
        return new AssetsDAO(db);
    }

    var sportsdata = db.collection("sports");
	
	
	
	
	
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


	this.sendAssetFrom = function (someAddress, someOtherAddress,  callback) {
        "use strict";

		multichain.sendAssetFrom({from: someAddress, to: someOtherAddress, asset: "zcoin", qty: 5}, (err, tx) => {
		console.log(tx);
		})




	}

	

	this.issue = function (someAddress,  callback) {
        "use strict";

		console.log(someAddress);
		multichain.issue({address: someAddress, asset: "zcoin1", qty: 50000, units: 0.01, details: {hello: "world"}}, (err, res) => {
		if(err){
			console.log(err);
        throw err;
		}
		console.log(res);
		callback(null, res);
		
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
