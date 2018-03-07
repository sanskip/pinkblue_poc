var propertyKey=require('../properties/configuration')
var MongoClient = require("mongodb").MongoClient;
var isConnected;
var self=module.exports = {

    dbConnecction : async function(){
    try{
			// let client = await MongoClient.connect('mongodb://localhost:27017');
			let client = await MongoClient.connect(propertyKey['mongo.db.url']);
			isConnected=client.db(propertyKey['schema']);
			
		}catch(error){
			console.log(error)
		}
		return isConnected
    },
    getConnecction : async function(){
    	if(!isConnected){
    		
    		return await self.dbConnecction();
    	}
		return isConnected
    }
};












