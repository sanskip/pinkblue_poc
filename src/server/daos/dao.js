var config=require('../config/config')
var propertyKey=require('../properties/configuration')
var self = module.exports = {

	authenticateUserDao:async function(req) {
		try {
			
		  let dbConn=await config.getConnecction();

          return  await dbConn.collection(propertyKey.usersCollection).findOne({"_id":req.body.username,"password" : req.body.password},{"roles":1,"_id": 0,"password" :0});

        } catch(error) {
          console.log(error)
          return {"error": {
					status:false,
					"code": 500,
					"name": error.name,
					"message": error.message
					}};
        }
		
	},
	addInventoryDao:async function(req) {
		try {
			
		  let dbConn=await config.getConnecction();
		  req.body['_id']=req.body.productid;
          return  await dbConn.collection(propertyKey.productsCollection).insert(req.body);

        } catch(error) {
          console.log(error)
          return {"error": {
					status:false,
					"code": 500,
					"name": error.name,
					"message": error.message
					}};
        }
		
	},
	modifyInventoryDao:async function(req) {
		try {
		
		  let dbConn=await config.getConnecction();
		  req.body['_id']=req.body.productid;
		  let role=req.body.roles;
		  delete req.body.roles;
		  req.body['status']='Approved';
		  if(role=='Department Manager'){
		  	req.body['status']='Pending';
			return  await dbConn.collection(propertyKey.subs_productsCollection).save(req.body);
		  }
		  delete req.body.action;
          return  await dbConn.collection(propertyKey.productsCollection).save(req.body);

        } catch(error) {
          console.log(error)
          return {"error": {
					status:false,
					"code": 500,
					"name": error.name,
					"message": error.message
					}};
        }
		
	},
	removeInventoryDao:async function(req) {
		try {
			
		  let dbConn=await config.getConnecction();
		  req.body['_id']=req.body.productid;
		  let role=req.body.roles;
		  delete req.body.roles;
		  if(role=='Department Manager'){
		  	req.body['action']='delete';
		  	return  await dbConn.collection(propertyKey.subs_productsCollection).save(req.body);
		  }
          return  await dbConn.collection(propertyKey.productsCollection).deleteOne({"_id":req.body.productid});

        } catch(error) {
          console.log(error)
          return {"error": {
					status:false,
					"code": 500,
					"name": error.name,
					"message": error.message
					}};
        }
		
	},
	getInventoryDetailsDao:async function(req) {
		try {
			
		  let dbConn=await config.getConnecction();

          return  await dbConn.collection(propertyKey.productsCollection).find({}).toArray();

        } catch(error) {
          console.log(error)
          return {"error": {
					status:false,
					"code": 500,
					"name": error.name,
					"message": error.message
					}};
        }
		
	},
	getInventoryListDetailsDao:async function(req) {
		try {
			
		  let dbConn=await config.getConnecction();

          return  await dbConn.collection(propertyKey.subs_productsCollection).find().toArray();

        } catch(error) {
          console.log(error)
          return {"error": {
					status:false,
					"code": 500,
					"name": error.name,
					"message": error.message
					}};
        }
		
	},
	approveInventoryDao:async function(req) {
		try {
			
		  let dbConn=await config.getConnecction();
		  if(req.body.action=='modify'){
		  	req.body['status']='Approved'
		  	 await dbConn.collection(propertyKey.productsCollection).save(req.body);
		  }else{
		  	await dbConn.collection(propertyKey.productsCollection).deleteOne({"_id":req.body.productid});
		  }
		  
		  return  await dbConn.collection(propertyKey.subs_productsCollection).deleteOne({"_id":req.body.productid});

        } catch(error) {
          console.log(error)
          return {"error": {
					status:false,
					"code": 500,
					"name": error.name,
					"message": error.message
					}};
        }
		
	},
	rejectInventoryDao:async function(req) {
		try {
			
		  let dbConn=await config.getConnecction();
		  req.body.status='reject'
		  return  await dbConn.collection(propertyKey.subs_productsCollection).save(req.body);
		  
        } catch(error) {
          console.log(error)
          return {"error": {
					status:false,
					"code": 500,
					"name": error.name,
					"message": error.message
					}};
        }
		
	},
	rejectInventoryListDao:async function(req) {
		try {
			
		  let dbConn=await config.getConnecction();
		  
		  return  await dbConn.collection(propertyKey.subs_productsCollection).find({status:'reject'}).toArray();
		  
        } catch(error) {
          console.log(error)
          return {"error": {
					status:false,
					"code": 500,
					"name": error.name,
					"message": error.message
					}};
        }
		
	}

};