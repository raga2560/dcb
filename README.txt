
Steps to run
1. Unzip the mongo_angularjs_nodejs_demoapp.zip 
2. Run the command
	npm install
3. Run the command
	node server.js
4. Go to browser
	http://localhost:8080/public/index.html
5. Enter player names


Description of what demoapp does
---------------------------------
This app demonstrates, use of 
1. mongodb to store data
2. use of node.js to interact with mongodb
3. use of angular.js to take data from browser and insert into mongodb.
4. integration of mongodb, node.js, angular.js


File organization
-----------------

server.js	
	- contains initialization of mongodb	
	- port on which node.js application is listening.
routes/index.js
	- This is point of entry for routing calls to backend application
	
routes/demo.js
	- Functions of backend to receive calls from router. These calls in turn calls other functions
	
Blockchain.js, assets.js
	- function calls that interact with multichain blockchain.
	
public/index.html
	- It contains angular.js application, for testing.
	
package.json
	- The dependencies to install
	
	
	
