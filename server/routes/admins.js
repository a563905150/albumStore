let express = require('express');
let router = express.Router();
let Admin = require('./../models/admins');
let ShippingMethods = require('./../models/shippingMethods');
let User = require('./../models/user');
let formidable = require('formidable');
let path = require('path');
let fs = require('fs');


router.post('/login',(req,res,next)=>{
		if(req.body.userId){
			Admin.findOne({_id:req.body.userId},(err,Doc)=>{
				if(err){
					res.json({
						status:1,
						msg:'err',
						result:''
					})
				}else{
					if(Doc){
						res.json({
							status:0,
							msg:'suc',
							result:{
								userName:Doc.userName
							}
						})
					}
				}
			})
		}else{
				let params = {
					userName:req.body.userName,
					userPwd:req.body.userPwd
				}
	
			Admin.findOne(params,(err,Doc)=>{
				if(err){
					console.log(err);
					res.json({
						status:1,
						msg:err.message
					})
				}else{
					if(Doc){
							res.cookie('adminId',Doc._id.toString(),{
							path:'/',
								maxAge:1000*60*60*24
							})
	//						res.session.user = Doc;
							res.json({
								status:0,
								msg:'suc',
								result:{
									userName:Doc.userName
								}
						})
					}else{
						res.json({
							status:1,
							msg:'fail'
						})
					}
	
					
				}
			})
		}
})

router.post('/logout',(req,res,next)=>{
	res.cookie('adminId','',{
		path:'/',
		maxAge:-1
	})
	res.json({
		status:0,
		msg:'logOut suc'
	})
})

router.post("/addShippingMethods",(req,res,next)=>{
	let shippingName =  req.body.shippingName;
	let shippingPrice = req.body.shippingPrice;
	let shippingDate = req.body.shippingDate;
	let shippingMethod = {
		shippingName : shippingName,
		shippingPrice : shippingPrice,
		shippingDate : shippingDate
	}
	ShippingMethods.create(shippingMethod,(err,Doc)=>{
		if(err){
			res.json({
				status:1,
				msg:err.message,
				result:''
			})
		}else{
			res.json({
				status:0,
				msg:'suc',
				result:Doc
			})
		}
	})
})

router.post("/editShippingMethods",(req,res,next)=>{
	let shippingName =  req.body.shippingName;
	let shippingPrice = req.body.shippingPrice;
	let shippingDate = req.body.shippingDate;
	let _id = req.body._id;
	ShippingMethods.update({_id:_id},{
		'shippingName':shippingName,
		'shippingPrice':shippingPrice,
		'shippingDate':shippingDate
	},(err,Doc)=>{
		if(err){
			res.json({
				status:1,
				msg:err.message,
				result:''
			})
		}else{
			res.json({
				status:0,
				msg:'suc',
				result:Doc
			})
		}
	})
})

router.post('/delShippingMethod',(req,res,next)=>{
	let _id = req.body._id;
	ShippingMethods.remove({_id:_id},(err,Doc)=>{
		if(err){
			res.json({
				status:1,
				msg:err.message,
				result:'err'
			})
		}else{
			res.json({
				status:0,
				msg:'suc',
				result:'suc'
			})
		}
	})
})



router.get('/orderTotal',(req,res,next)=>{
	let totalList = [];
	let total = 0;
	User.find({},(err,Doc)=>{
		Doc.forEach((item)=>{
			totalList = totalList.concat(item.orderList);
		})
		totalList.forEach((item)=>{
			total +=item.orderTotal;
		})
		res.json({
			status:0,
			msg:'suc',
			result:{
				total:total,
				registerNum:Doc.length,
				orderTotal:totalList.length
			}
		})
	})
})

router.post('/addUser',(req,res,next)=>{
	let userName = req.body.userName;
	let userPwd = req.body.userPwd;
	let registerUser = {
		'userName': userName,
		'userPwd': userPwd,
		'orderList':[],
		'cartList':[],
		'addressList':[]
	}
	User.create(registerUser,(err,Doc)=>{
		if(err){
			res.json({
				status:1,
				msg:err.message,
				result:''
			})
		}else{
			res.json({
				status:0,
				msg:'suc',
				result:'suc'
			})
		}
	})
})

router.get('/getOrderList',(req,res,next)=>{
	let page = req.param('page');
	let pageSize = parseInt(req.param('pageSize'));
	let skip = (page-1)*pageSize;
	let total = 0;
	let orderList = [];
	User.find({},(err,Doc)=>{
		Doc.forEach((item)=>{
			total += item.orderList.length;
			if(item.orderList.length>0){
				orderList = orderList.concat(item.orderList);
			}
		});
		res.json({
			status:0,
			msg:'suc',
			result:{
				total:total,
				orderList:orderList.slice(skip,skip+pageSize)
			}
		})
	});
})


router.get('/getUserOrderList',(req,res,next)=>{
	let page = req.param('page');
	let id = req.cookies.userId;
	let pageSize = parseInt(req.param('pageSize'));
	let skip = (page-1)*pageSize;
	let total = 0;
	User.findOne({_id:id},(err,Doc)=>{
		total = Doc.orderList.length;
		res.json({
			status:0,
			msg:'suc',
			result:{
				total:total,
				orderList:Doc.orderList.slice(skip,skip+pageSize)
			}
		})
	});
})


router.post('/deliverGoods',(req,res,next) =>{
	let userId = req.body.userId;
	let orderId = req.body.orderId;
	User.findOne({_id:userId},(err,Doc)=>{
		Doc.orderList.forEach((item) =>{
			if(item._id == orderId){
				item.orderStatus = 2;
			}
		})
		Doc.save((err1,Doc1) =>{
			if(err1){
				console.log(err1);
				res.json({
					status:1,
					msg:err1.message,
					result:'err'
				})
			}else{
				res.json({
					status:0,
					msg:'suc',
					result:'suc'
				})
			}
		});
	});
})


router.post('/takeDelivery',(req,res,next) =>{
	let userId = req.body.userId;
	let orderId = req.body.orderId;
	User.findOne({_id:userId},(err,Doc)=>{
		Doc.orderList.forEach((item) =>{
			if(item._id == orderId){
				item.orderStatus = 3;
			}
		})
		Doc.save((err1,Doc1) =>{
			if(err1){
				console.log(err1);
				res.json({
					status:1,
					msg:err1.message,
					result:'err'
				})
			}else{
				res.json({
					status:0,
					msg:'suc',
					result:'suc'
				})
			}
		});
	});
})


router.post('/delOrderAlbum',(req,res,next) =>{
	let userId = req.body.userId;
	let orderId = req.body.orderId;
	let goodsId = req.body.goodsId;
	let photoId = req.body.photoId;
	User.findOne({_id:userId},(err,Doc) =>{
		if(err){
			res.json({
				status:1,
				msg:err.message,
				result:''
			})
		}else{
			Doc.orderList.forEach((item) =>{
				if(item._id == orderId){
					item.goodsList.forEach((item1) =>{
						if(item1._id == goodsId){
							item1.album.forEach((item2) =>{
								if(item2._id == photoId){
									item1.album.splice(item1.album.indexOf(item2),1)
								}
							})
						}
					})
				}
			})
			Doc.save((err1,Doc1) =>{
				if(err1){
					res.json({
						status:1,
						msg:err1.message,
						result:''
					})
				}else{
					res.json({
						status:0,
						msg:'suc',
						result:'suc'
					})
				}
			})
		}
	})
//	User.update({_id:userId,'orderList._id':orderId,'goodsList._id':goodsId},{$pull:{'orderList.$.goodsLst.$.album':{_id:photoId}}},(err,Doc)=>{
//		if(err){
//			res.json({
//				status:1,
//				msg:err.message,
//				result:''
//			})
//		}else{
//			res.json({
//				status:0,
//				msg:"suc",
//				result:''
//			})
//		}
//	})
})


router.post('/addOrderAlbum',(req,res,next) =>{
	var uploadDir='static/album/';
	var form=new formidable.IncomingForm();
		 //文件的编码格式
	 form.encoding='utf-8';
	 //文件的上传路径
	 form.uploadDir=uploadDir;
	 //文件的后缀名
	 form.extensions=true;
	 //文件的大小限制
	 form.maxFieldsSize = 1024 * 1024 * 1024;
	 form.parse(req, function (err, fields, files) {
	 //fields上传的string类型的信息
	 //files为上传的文件
	   let userId = fields.userId;
	   let orderId = fields._id;
	   let goodsId = fields.goodsId;
	   var file=files.file;
	 
	   var oldpath=path.normalize(file.path);//返回正确格式的路径
	   var r = Math.floor(Math.random()*100000000);
	   var newfilename=r+file.name;
	   var newpath=uploadDir+newfilename;
	   var index = 0;
	   var index1 = 0;
	   //写入数据库的信息
	  var album={
	   		'url':newfilename
	  };
	 fs.rename(oldpath,newpath,function(err){
	   if(err){
	    console.error("失败"+err.message);
	   }
	   else {
	     User.findOne({_id:userId},(err1,Doc)=>{
	     	if(err1){
	     		res.json({
	     			status:1,
	     			msg:err1.message,
	     			result:'err'
	     		})
	     	}else{
	     		if(Doc){
	     			Doc.orderList.forEach((item)=>{
	     				if(item._id == orderId){
	     					index = Doc.orderList.indexOf(item);
	     					item.goodsList.forEach((item1) =>{
	     						if(item1._id == goodsId){
	     							item1.album.push(album);
	     							index1 = item.goodsList.indexOf(item1);
	     						}
	     					})
	     				}
	     			})
	     			Doc.save((err2,Doc1)=>{
	     				if(err2){
	     					res.json({
	     						status:1,
	     						msg:err2.message,
	     						result:'err'
	     					})
	     				}else{
	     					res.json({
	     						status:0,
	     						msg:'suc',
	     						result:{
	     							_id:Doc1.orderList[index].goodsList[index1].album[Doc1.orderList[index].goodsList[index1].album.length-1]._id,
	     							count:Doc1.orderList[index].goodsList[index1].album.length
	     						}
	     					})
	     				}
	     			})
	     		}
	     	}
	     })
	   }
	  });
	  //将老的图片路径改为新的图片路径

	 })
})




module.exports = router;
