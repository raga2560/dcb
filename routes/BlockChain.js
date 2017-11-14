var AssetsDAO = require('../assets').AssetsDAO;
// https://stackoverflow.com/questions/37559610
var blockchainconfig = require('./blockchainconfig.json');

var BlockChain = function (app, socket, db, multichain) {
    this.app = app;
    this.socket = socket;
    this.assets = new AssetsDAO(db, multichain);

    // Expose handler methods for events
    this.handler = {
        createasset: createasset.bind(this) ,// use the bind function to access this.app
        getasset:    getasset.bind(this) ,   // and this.socket in events
		getinfo: getinfo.bind(this)
    };


// Events

function createasset(data) {
    // Broadcast message to all sockets
    // this.app.allSockets.emit('message', text);
	var mysock = this.socket ;
	var assetmanageraddress = blockchainconfig.assetmanageraddress;
	var assetname = data.name;
	this.assets.issue(assetmanageraddress,assetname, function(err, record) {
		
		//console.log(record);
		if(err) {
			var myerror = {
				name: 'Blockchain:createasset',
				err : err
			};
			mysock.emit('error',myerror   );
				
			
		}
			mysock.emit('createdasset',record);
		
		});
		
	

}

function getinfo(text) {
    // Broadcast message to all sockets
    // this.app.allSockets.emit('message', text);
	var mysock = this.socket ;
	this.assets.getInfo(function(err, record) {
		
		//console.log(record);
		if(err) {
			mysock.emit('createdasset',err   );
				
			
		}
			mysock.emit('createdasset',record);
		
		});
		
	

}

function getasset(text) {
    // Broadcast message to all sockets
    // this.app.allSockets.emit('message', text);
	this.socket.emit('gotasset', 'PONG!');
}

function ping() {
    // Reply to sender
    this.socket.emit('message', 'PONG!');
};


	
	
	
  

	
	 
	
    
   
	
	function getInfo() {
		
		assets.getInfo(function(err, record) {
		
		//console.log(record);
		if(err) {
			
				return (err);
			
		}
		
		return (record);
		});
	}

	
	

}
module.exports = BlockChain;


