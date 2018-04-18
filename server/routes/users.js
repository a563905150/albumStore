let express = require('express');
let router = express.Router();
let User = require('./../models/user');
let formidable = require('formidable');
let path = require('path');
let fs = require('fs');
require('./../utils/util');
/* GET users listing. */
router.get('/', function(req, res, next) {
  	res.send('respond with a resource');
});


router.post('/login',(req,res,next)=>{
		if(req.body.userId){
			User.findOne({_id:req.body.userId},(err,Doc)=>{
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
								userName:Doc.userName,
								cartNum:Doc.cartList.length
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
	
			User.findOne(params,(err,Doc)=>{
				if(err){
					console.log(err);
					res.json({
						status:1,
						msg:err.message
					})
				}else{
					if(Doc){
							res.cookie('userId',Doc._id.toString(),{
							path:'/',
								maxAge:1000*60*60*24
							})
	//						res.session.user = Doc;
							res.json({
								status:0,
								msg:'suc',
								result:{
									userName:Doc.userName,
									cartNum:Doc.cartList.length
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

router.post('/logOut',(req,res,next)=>{
	res.cookie('userId','',{
		path:'/',
		maxAge:-1
	})
	res.json({
		status:0,
		msg:'logOut suc',
		result:''
	})
})

router.get('/cartList',(req,res,next)=>{
	let params = {
		_id:req.cookies.userId
	}
	User.findOne(params,(err,Doc)=>{
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
					result:Doc.cartList
				})
			}else{
				res.json({
					status:1,
					msg:'err',
					result:'err'
				})
			}
		}
	})
})

router.post('/cartDel',(req,res,next)=>{
	let productId = req.body._id;
	let userId = req.cookies.userId;
	User.update({_id:userId},{$pull:{'cartList':{_id:productId}}},(err,Doc)=>{
		if(err){
			res.json({
				status:1,
				msg:'err',
				result:''
			})
		}else{
			res.json({
				status:0,
				msg:'suc',
				result:''
			})
		}
	})
})

router.post('/cartEdit',(req,res,next)=>{
	let userId = req.cookies.userId;
	let productId = req.body._id;
	let productNum = req.body.productNum;
	let checked = req.body.checked;
	User.update({_id:userId,'cartList._id':productId},{
		'cartList.$.productNum':productNum,
		'cartList.$.checked':checked
	},(err,Doc)=>{
		if(err){
			res.json({
				status:1,
				msg:'err',
				result:''
			})
		}else{
			res.json({
				status:0,
				msg:'suc',
				result:''
			})
		}
	})
})

router.post('/editCheckAll',(req,res,next)=>{
	let userId = req.cookies.userId;
	let check = req.body.check?'1':'0';
	User.findOne({_id:userId},(err,Doc)=>{
		if(err){
			res.json({
				status:1,
				msg:err.message,
				result:''
			})
		}else{
			if(Doc){
				Doc.cartList.forEach((item)=>{
					item.checked = check;
				})
				Doc.save((err1,Doc2)=>{
					if(err1){
						res.json({
							status:1,
							msg:'err2',
							result:''
						})
					}else{
						res.json({
							status:0,
							msg:'suc',
							result:''
						})
					}
				})
			}
		}
	})
})

router.get("/addressList",(req,res,next)=>{
	let userId = req.cookies.userId;
	User.findOne({_id:userId},(err,Doc)=>{
		if(err){
			res.json({
				status:1,
				msg:err.message,
				result:''
			})
		}else{
			if(Doc){
				res.json({
					status:0,
					msg:'suc',
					result:Doc.addressList
				})
			}
		}
	})
})

router.post('/setDefault',(req,res,next)=>{
	let userId = req.cookies.userId;
	let addressId = req.body.addressId;
	User.findOne({_id:userId},(err,Doc)=>{
		if(err){
			res.json({
				status:1,
				msg:err.message,
				result:''
			})
		}else{
			if(Doc){
				Doc.addressList.forEach((item)=>{
					if(item._id == addressId){
						item.isDefault = true;
					}else{
						item.isDefault = false;
					}
				})
				Doc.save((err1,Doc1)=>{
					res.json({
						status:0,
						msg:"suc",
						result:''
					})
				})
			}
		}
	})
})

router.post('/delAddress',(req,res,next)=>{
	let userId = req.cookies.userId;
	let addressId = req.body._id;
	User.update({_id:userId},{$pull:{'addressList':{_id:addressId}}},(err,Doc)=>{
		if(err){
			res.json({
				status:1,
				msg:err.message,
				result:''
			})
		}else{
			res.json({
				status:0,
				msg:"suc",
				result:''
			})
		}
	})
})

router.post('/editAddress',(req,res,next) =>{
	let userId = req.cookies.userId;
	let addrId = req.body._id;
	let userName = req.body.userName;
	let tel = req.body.tel;
	let postCode = req.body.postCode;
	let streetName = req.body.streetName;
	User.findOne({_id:userId},(err,Doc) =>{
		if(err){
			res.json({
				status:1,
				msg:err.message,
				result:''
			})
		}else{
			Doc.addressList.forEach((item) =>{
				if(item._id.toString() == addrId){
					item.userName = userName;
					item.tel = tel;
					item.postCode = postCode;
					item.streetName = streetName;
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
})


router.post('/addAddress',(req,res,next)=>{
	let userId = req.cookies.userId;
	let userName = req.body.userName;
	let tel = req.body.tel;
	let postCode = req.body.postCode;
	let streetName = req.body.streetName;
	console.log(userName);
	User.findOne({_id:userId},(err,Doc)=>{
		if(err){
			res.json({
				status:1,
				msg:err.message,
				result:''
			})
		}else{
			if(Doc){
				let address = {
					userName:userName,
					tel:tel,
					postCode:postCode,
					streetName:streetName,
					isDefault:false
				}
				Doc.addressList.push(address);
				Doc.save((err1,Doc1)=>{
					if(err1){
						res.json({
							status:1,
							msg:err1.message,
							result:''
						})
					}else{
						res.json({
							status:0,
							msg:"suc",
							result:Doc1._id
						})
					}
				})
			}
		}
	})
})



router.post('/payMent',(req,res,next)=>{
	let userId = req.cookies.userId;
	let orderTotal = req.body.orderTotal;
	let addressId = req.body.addressId;
	let shippingMethodId = req.body.shippingMethodId;
	let ShippingMethods = require('./../models/shippingMethods');
	let shippingMethodInfo = null;
	let Goods = require('./../models/goods');
	ShippingMethods.findOne({_id:shippingMethodId},(e,D)=>{
	if(e){
		res.json({
			status:1,
			msg:e.message,
			result:'err'
		})
	}else{
		shippingMethodInfo = D;
		User.findOne({_id:userId},(err,Doc)=>{
			if(err){
				res.json({
					status:1,
					msg:err.message,
					result:''
				})
			}else{
	
				let addressInfo = '';
				Doc.addressList.forEach((item)=>{
					if(item._id ==addressId){
						addressInfo = item;
					}
				});
				let goodsList = [];
				Doc.cartList.forEach((item)=>{
					if(item.checked == 1){
						goodsList.push(item);
						Goods.findOne({_id:item._id},(err2,Doc2) =>{
							if(err2){
								res.json({
									status:1,
									msg:err2.message,
									result:'err'
								})
							}else{
								
								Doc2.saleNum = parseInt(Doc2.saleNum)+parseInt(item.productNum);
								Doc2.save();
								
							}
						})
					}
				})
				let platform = '211';
				let r1 = Math.floor(Math.random()*10);
				let r2 = Math.floor(Math.random()*10);
				let sysDate = new Date().Format('yyyyMMddhhmmss');
				let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
				let orderId = platform+r1+sysDate+r2;
				let order = {
					orderId:orderId,
					orderTotal:orderTotal,
					addressInfo:addressInfo,
					shippingMethodInfo:shippingMethodInfo,
					goodsList:goodsList,
					orderStatus:1,
					createDate:createDate
				}
				Doc.orderList.push(order);
				Doc.save((err1,Doc1)=>{
					if(err1){
						res.json({
							status:1,
							msg:err.message,
							result:''
						})
					}else{
						res.json({
							status:0,
							msg:"suc",
							result:{
								orderId:order.orderId,
								orderTotal:order.orderTotal
							}
						})
					}
				})
			
			}
		})
	}
	
	})

})

router.get('/orderDetail',(req,res,next)=>{
	let userId = req.cookies.userId;
	let orderId = req.param('orderId');
	let orderTotal = '';
	User.findOne({_id:userId},(err,Doc)=>{
		if(err){
			res.json({
				status:1,
				msg:err.message,
				result:''
			})
		}else{
			if(Doc){
				Doc.orderList.forEach((item)=>{
					if(item.orderId == orderId){
						orderTotal = item.orderTotal;
					}
				})
				res.json({
					status:0,
					msg:'suc',
					result:{
						orderId:orderId,
						orderTotal:orderTotal
					}
				})
			}
		}
	})
})


router.post('/register',(req,res,next)=>{
	let userName = req.body.userName;
	let userPwd = req.body.userPwd;
	User.findOne({userName:userName},(err1,Doc1)=>{
		if(err1){
			res.json({
				status:1,
				msg:err1.message,
				result:'err'
			})
		}else{
			if(Doc1){
				res.json({
					status:1,
					msg:'userNameExist',
					result:''
				})
			}else{
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
						res.cookie('userId',Doc._id.toString(),{
							path:'/',
							maxAge:1000*60*60*24
						})
						res.json({
							status:0,
							msg:'suc',
							result:Doc.userName
						})
					}
				})
			}
		}
	})

})

router.get("/getShippingMethods",(req,res,next)=>{
	let ShippingMethods = require('./../models/shippingMethods');
	ShippingMethods.find({},(err,Doc)=>{
		if(err){
			res.json({
				status:1,
				msg:err.message,
				result:''
			})
		}else{
			if(Doc){
				res.json({
					status:0,
					msg:'suc',
					result:Doc
				})
			}
		}
	})
})

router.get('/usersList',(req,res,next)=>{
	let page = req.param('page');
	let pageSize = parseInt(req.param('pageSize'));
	let skip = (page-1)*pageSize;
	let total = 0;
	User.find({},(err,Doc)=>{
		total = Doc.length;
	});
	let UserModel = User.find({}).skip(skip).limit(pageSize);
	UserModel.exec((err1,Doc1)=>{
		if(err1){
			res.json({
				status:1,
				msg:err1.message,
				result:'err'
			})
		}else{
			res.json({
				status:0,
				msg:'suc',
				result:{
					usersList:Doc1,
					total:total
				}
			})
		}
	})
})

router.post('/delUser',(req,res,next)=>{
	let _id = req.body._id;
	User.remove({_id:_id},(err,Doc)=>{
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

router.post('/editUser',(req,res,next)=>{
	let _id = req.body._id;
	let userName = req.body.userName;
	let userPwd = req.body.userPwd;
	User.update({_id:_id},{
		'userName':userName,
		'userPwd':userPwd
	},(err,Doc)=>{
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

router.post('/addAlbum',(req,res,next)=>{
	let _id = req.cookies.userId;
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
	   let cartItemId = fields._id;
	   var file=files.file;
	 
	   var oldpath=path.normalize(file.path);//返回正确格式的路径
	   var r = Math.floor(Math.random()*100000000);
	   var newfilename=r+file.name;
	   var newpath=uploadDir+newfilename;
	   var index = 0;
	   //写入数据库的信息
	  var album={
	   		'url':newfilename
	  };
	 fs.rename(oldpath,newpath,function(err){
	   if(err){
	    console.error("失败"+err.message);
	   }
	   else {
	     User.findOne({_id:_id},(err1,Doc)=>{
	     	if(err1){
	     		res.json({
	     			status:1,
	     			msg:err1.message,
	     			result:'err'
	     		})
	     	}else{
	     		if(Doc){
	     			Doc.cartList.forEach((item)=>{
	     				if(item._id == cartItemId){
	     					item.album.push(album);
	     					index = Doc.cartList.indexOf(item);
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
	     							_id:Doc1.cartList[index].album[Doc1.cartList[index].album.length-1]._id,
	     							count:Doc1.cartList[index].album.length
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

router.post('/delPhoto',(req,res,next)=>{
	let userId = req.cookies.userId;
	let cartItemId = req.body.cartItemId;
	let photoId = req.body.photoId;
	User.update({_id:userId,'cartList._id':cartItemId},{$pull:{'cartList.$.album':{_id:photoId}}},(err,Doc)=>{
		if(err){
			res.json({
				status:1,
				msg:err.message,
				result:''
			})
		}else{
			res.json({
				status:0,
				msg:"suc",
				result:''
			})
		}
	})
})


//密码重置
router.post('/resetPwd',(req,res,next)=>{
	let _id = req.cookies.userId;
	let oldPwd = req.body.oldPwd;
	let newPwd = req.body.newPwd;
	User.findOne({_id:_id,userPwd:oldPwd},(err,Doc) =>{
		if(err){
			res.json({
				status:1,
				msg:err.message,
				result:''
			})
		}else{
			if(Doc){
				Doc.userPwd = newPwd;
				Doc.save((err1,Doc1) =>{
					if(err1){
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
			}else{
				res.json({
					status:1,
					msg:'',
					result:'原始密码不正确'
				})
			}
		}
	})
})



module.exports = router;
