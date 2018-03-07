var daos=require('../daos/dao')
var util=require('../utilities/util')
var self = module.exports = {

	authenticateUser:async function(req) {
		let data=await daos.authenticateUserDao(req);
		console.log('authenticateUser',data)
		if(!data){
			
			return{
					"error": {
					status:false,
					"code": 401,
					"message": "Login Required"
					}
					}
		}
		
		if(data.error) {
			
			return data;
		}
		let token=util.generateToken(req.body.username);
		return{
				"success": {
				status:true,
				code:200,
				message:'successful login',
				token:token,
				data:data.roles
				}
			}

	},
	addInventory:async function(req) {
		 let data= await daos.addInventoryDao(req);
		 //console.log(data);
		
		if(data.error) {
			return data;
		}
		if(data.result.n>0){
			return util.responseSuccessObj('Inventory Addedd successfully');
		}else{
			return util.responseErrorObj('Inventory Addedd Failure');
			
		}
		
		
	},
	modifyInventory:async function(req) {
		let data= await daos.modifyInventoryDao(req);
		//console.log(data);
		
		if(data.error) {
			return data;
		}
		if(data.result.n>0){
			return util.responseSuccessObj('Inventory Modified successfully');
		}else{
			return util.responseErrorObj('Inventory Modified Failure');
			
		}
		
	},
	removeInventory:async function(req) {
		let data=await daos.removeInventoryDao(req);
		//console.log('removeInventory',data);
		if(data.error) {
			return data;
		}
		if(data.result.n>0){
			return util.responseSuccessObj('Inventory Removed successfully');
		}else{
			return util.responseErrorObj('Inventory Removed Failure');
			
		}
		
	},
	getInventoryDetails:async function(req) {
		let data= await daos.getInventoryDetailsDao(req);
		//console.log('getInventoryDetails',data);
		if(!data){
			
			return{
					"error": {
					status:false,
					"code": 204,
					"message": " No Content "
					}
					}
		}
		if(data.error) {
			return data;
		}
		
		return util.responseSuccessObj('Inventory Retrieved successfully',data);
		
		
	},
	getInventoryListDetails:async function(req) {
		let data= await daos.getInventoryListDetailsDao(req);
		//console.log('getInventoryListDetails',data);
		if(!data){
			
			return{
					"error": {
					status:false,
					"code": 204,
					"message": " No Content "
					}
					}
		}
		if(data.error) {
			return data;
		}
		
		return util.responseSuccessObj('Inventory Retrieved successfully',data);
		
	},
	approveInventory:async function(req) {
	
		return await daos.approveInventoryDao(req);
		
	},
	rejectInventory:async function(req) {
		return await daos.rejectInventoryDao(req);
		
	},
	rejectInventoryList:async function(req) {
		
		return await daos.rejectInventoryListDao(req);
		
	}

};