var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
var route=require('./server/route/route')
var config=require('./server/config/config')
var util=require('./server/utilities/util')
var config=require('./server/config/config')

app.use(express.static(__dirname+''));
var httpServer = http.createServer(app);
config.getConnecction();
app.get('/',(req,res)=>{
	res.sendFile( path.resolve('src/client/index.html') );
});
	//app.use(bodyParser.urlencoded({ extended: true }));
		app.use(function(req, res, next) {
			console.log(req.originalUrl)
		//cors apply//
	     res.header("Access-Control-Allow-Origin", "*");
		 res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
		 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		//cors apply//
	    //set common resp format//
	    res.setHeader('Content-Type', 'application/json');
	    //set common resp format//
	    console.log("Server initialization .. ");
	    if(req.originalUrl!='/login'){
	    	if(util.verifyToken(req.headers['x-auth-token'])){
				next();
			}else{
				res.json({message:'UnAuthorised Token!'})
			}
	    }else{
	    	next()
	    }
	    
	    
	  });
	app.use(bodyParser.json({}));
	app.use(bodyParser.urlencoded({ extended: true }));
	// app.use(util.verifyToken(req.headers['x-auth-token']))
	app.use('/',route)
	process.on('uncaughtException', function (err) {
  		console.log(err);
		});
	httpServer.on("error", (error)=>{
		if (error.syscall !== "listen") {
            throw error;
        }
        console.log('typeof this.httpPort',typeof this.httpPort)
        var bind = typeof this.httpPort === "string" ||typeof this.httpPort === "number"
            ? "Pipe " + this.httpPort
            : "Port " + this.httpPort;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                console.error(bind + " requires elevated privileges");
                //process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(bind + " is already in use");
                //process.exit(1);
                break;
            default:
                throw error;
        }
	});
	// start server on the specified port and binding host
	app.listen(3000, '0.0.0.0', function() {
		// print a message when the server starts listening
	  console.log("server starting on " + 3000);
	});
