var AssetsDAO = require('../assets').AssetsDAO;
// https://stackoverflow.com/questions/37559610
var blockchainconfig = require('./blockchainconfig.json');

var todosDBB = require('../blockstore').blockstore;


function BlockChain(io, db, multichain) {
    
    
    var assets = new AssetsDAO(db, multichain);

    
    var blockchain = io.of('/blockchain');
	var todosDB = new todosDBB(db);
 
    blockchain.on('connection', function(socket) {
 
        socket.on('getAllAssetsDB', function() {
			
            todosDB.getAllAssetsDB(function(err, data) {
            if (err) {
				var error ={
					function:'getAllAssetsDB',
					file:'BlockChain.js',
					err: err
				};
				io.of('/blockchain').emit('errorReport', error);
				//throw err; // You can emit the error to a socket 
			}
            io.of('/blockchain').emit('allAssetsDB', data);
          });
		
        });
 
        socket.on('getAllAssetsBC', function() {
	
		    assets.listAssets( function(err, record) {
		
		
			if(err) {
			var error ={
					function:'getAllAssetsBC',
					file:'BlockChain.js',
					err: err
				};
			io.of('/blockchain').emit('errorReport', error);
				
			
		    }
			io.of('/blockchain').emit('allAssetsBC', record);
		
		});
		});
		
		socket.on('getAllAddressesBC', function() {
	
		    assets.listAddresses( function(err, record) {
		
		
			if(err) {
			var error ={
					function:'getAllAddressesBC',
					file:'BlockChain.js',
					err: err
				};
			io.of('/blockchain').emit('errorReport', error);
				
			
		    }
			io.of('/blockchain').emit('allAddressesBC', record);
		
		});
		});
		socket.on('issueAsset', function(data) {
			/*
			{
            address: address1, 
            asset: {
                name: "foocoin",
                open: true
            },
            qty: 1000, 
            units: 0.1
            }
			*/
	
		    assets.issue(data.address, data.asset, data.qty, data.details, function(err, tx) {
		
		
			if(err) {
			var error ={
					function:'issueAsset',
					file:'BlockChain.js',
					err: err
				};
			io.of('/blockchain').emit('errorReport', error);
				
			
		    }
			var msg = {
				tx: tx,
				addresses: data.address
			};
			
			todosDB.saveTransaction(msg, function(err, data) {
            if (err) {
				var error ={
					function:'issueAsset',
					file:'BlockChain.js',
					err: err
				};
				io.of('/blockchain').emit('errorReport', error);
				//throw err; // You can emit the error to a socket 
			}
            io.of('/blockchain').emit('issuedAsset', msg);
          });
		  
			
		
		});
		});
		
		socket.on('issueAsset', function(data) {
			/*
			{
			from: fromaddress
            to: toaddress, 
            asset: {
                name: "foocoin",
                open: true
            },
            qty: 1000, 
            units: 0.1
            }
			*/
	
		    assets.issueFrom(data.fromaddress, data.toaddress, data.asset, data.qty, data.details, function(err, tx) {
		
		
			if(err) {
			var error ={
					function:'issueAsset',
					file:'BlockChain.js',
					err: err
				};
			io.of('/blockchain').emit('errorReport', error);
				
			
		    }
			
			var msg = {
				tx: tx,
				addresses: [data.fromaddress, data.toaddress]
				};
			
			todosDB.saveTransaction(msg, function(err, data) {
            if (err) {
				var error ={
					function:'issueAsset',
					file:'BlockChain.js',
					err: err
				};
				io.of('/blockchain').emit('errorReport', error);
				//throw err; // You can emit the error to a socket 
			}
            io.of('/blockchain').emit('issuedAsset', msg);
          });
		  
			
		
		});
	
	
	
		});
 
   
   });
 
 return blockchain;
}


module.exports = BlockChain;

