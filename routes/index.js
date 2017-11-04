var Demo = require('./demo')

	module.exports = exports = function(app, db, multichain) {
	
	var demo = new Demo(db, multichain);
	
    

	
	app.post('/demo/getInfo', demo.getInfo);
	app.post('/demo/insertplayer', demo.insertplayer);
	app.post('/demo/getplayer', demo.getplayer);
	app.get('/demo/getplayers', demo.getplayers);
	
}
