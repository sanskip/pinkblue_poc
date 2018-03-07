var express = require('express');
var router = express.Router();
var path = require('path');
var service=require('../service/service');
router.post('/login',async (req, res)=>{
	
	let data=await service.authenticateUser(req);
	res.json(data)
});
router.post('/inventory',async (req, res)=>{
	let data=await service.addInventory(req);
	res.json(data)
});
router.put('/inventory',async (req, res)=>{
	let data=await service.modifyInventory(req);
	res.json(data)
});
router.delete('/inventory',async (req, res)=>{
	let data=await service.removeInventory(req);
	res.json(data)
});
router.get('/inventory',async (req, res)=>{
	
	let data=await service.getInventoryDetails(req);
	res.json(data)
});
router.get('/inventorylist',async (req, res)=>{
	let data=await service.getInventoryListDetails(req);
	res.json(data)
});
router.put('/approve',async (req, res)=>{
	let data=await service.approveInventory(req);
	res.json(data)
});
router.put('/reject',async (req, res)=>{
	let data=await service.rejectInventory(req);
	res.json(data)
});
router.get('/rejectlist',async (req, res)=>{
	let data=await service.rejectInventoryList(req);
	res.json(data)
});

module.exports = router;