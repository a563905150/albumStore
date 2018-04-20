let express = require('express');
let router = express.Router();
let Goods = require('../models/goods');
let mongoose = require('mongoose');
let formidable = require('formidable');
let fs = require('fs');
let path = require('path');
require('./../utils/util');
mongoose.connect('mongodb://127.0.0.1:27017/albumdb');

mongoose.connection.on('open',()=>{
	console.log('MongoDB connect success');
});
mongoose.connection.on('error',()=>{
	console.log('MongoDB connect fail');
});
mongoose.connection.on('disconnect',()=>{
	console.log('MongoDB connect disconnect');
});



//获取商品列表
router.get('/list',(req,res,next)=>{
	let page = req.param('page');
	let pageSize = parseInt(req.param('pageSize'));
	let sort = req.param('sort');
	let priceLevel = req.param('priceLevel');
	let productType = req.param('productType');
	let addTimeSort = req.param('addTimeSort');
	let skip = (page-1)*pageSize;
	let params = {};
	let priceGt = '';
	let priceLte = '';
	let total = 0;
	let searchValue = req.param('searchValue');
	if(priceLevel != 'all'){
		switch (priceLevel){
			case '0':priceGt = 0;priceLte = 100;break;
			case '1':priceGt = 100;priceLte = 200;break;
			case '2':priceGt = 200;priceLte = 300;break;
			case '3':priceGt = 300;priceLte = 500;break;
		}
		params = {
			salePrice:{
				$gt:priceGt,
				$lte:priceLte
			}
		}
	}
	if(productType != 'all'){
		switch (productType){
			case '0':productType = "爱情";break;
			case '1':productType = "儿童";break;
			case '2':productType = "亲情";break;
			case '3':productType = "婚礼";break;
		}
		params.productType = productType;
	}
	if(searchValue){
		params.productName = new RegExp(searchValue,'i');
	}
	sort = JSON.parse(sort);
	Goods.find({},(err,Doc)=>{
		total = Doc.length;
	});
	if(sort.hasOwnProperty('default')){
		sort = {};
	}else if(sort.hasOwnProperty('priceSort')){
		sort = {
			'salePrice':sort.priceSort?-1:1
		}
	}else if(sort.hasOwnProperty('timeSort')){
		sort = {
			'addDate':sort.timeSort?-1:1
		}
	}else if(sort.hasOwnProperty('numSort')){
		sort = {
			'saleNum':sort.numSort?-1:1
		}
	}
	let goodsModel = Goods.find(params).sort(sort);
	goodsModel.exec((err,doc) =>{
		if(err){
			res.json({
				status : 1,
				msg : err.message
			});
		}else{
			total= doc.length;
			goodsModel = goodsModel.skip(skip).limit(pageSize);
			goodsModel.exec((err1,doc1) =>{
				if(err1){
					res.json({
						status : 1,
						msg : err1.message
					});
				}else{
					res.json({
						status : 0,
						msg : '',
						result : {
							count : doc1.length,
							list : doc1,
							total : total
						}
					})
				}
			})
			
		}
	})
})

//添加商品
router.post('/addProduct',(req,res,next)=>{
	var uploadDir='static/';
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
	   var productName=fields.productName;
	   var salePrice=fields.salePrice;
	   var productType = fields.productType;
	   var file=files.file;
	 
	   var oldpath =path.normalize(file.path);//返回正确格式的路径
	 
	   var newfilename='xzx'+file.name;
	   var newpath=uploadDir+newfilename;
	   var date = new Date().Format('yyyyMMddhhmmss');
	   //写入数据库的信息
	  var good={
	   productName:productName,
	   salePrice:salePrice,
	   productImage:newfilename,
	   productNum:1,
	   checked:'1',
	   productDetail:'',
	   album:[],
	   saleNum:0,
	   addDate:date,
	   productType:productType
	  };
	 fs.rename(oldpath,newpath,function(err){
	   if(err){
	    console.error("失败"+err);
	   }
	   else {
	     Goods.create(good);
	     res.send('成功')
	   }
	  });
	  //将老的图片路径改为新的图片路径

	 })
})
//编辑商品
router.post('/editProduct',(req,res,next)=>{

	var uploadDir='static/';
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
	   var productName=fields.productName;
	   var salePrice=fields.salePrice;
	   var productType = fields.productType;
	   var _id = fields._id;   
	   var file=files.file;

	   var oldpath =path.normalize(file.path);//返回正确格式的路径
	 
	   var newfilename='xzx'+file.name;
	   var newpath=uploadDir+newfilename;
	 
	   //写入数据库的信息

	 fs.rename(oldpath,newpath,function(err){
	   if(err){
	    console.error("失败"+err);
	   }else {
	     	  Goods.update({_id:_id},{
				'productName':productName,
				'salePrice':salePrice,
				'productImage':newfilename,
				'productType':productType
				},(err1,Doc)=>{
					if(err1){
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
	   }
	  });
	  //将老的图片路径改为新的图片路径

	 })
})



//删除商品
router.post('/delGoods',(req,res,next)=>{
	let _id = req.body._id;
	Goods.remove({_id:_id},(err,Doc)=>{
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

//添加到购物车
router.post('/addCart',(req,res,next)=>{
	let userId = req.cookies.userId;
	let productId = req.body._id;
	let User = require('../models/user');
	User.findOne({_id:userId},(err,userDoc)=>{
		if(err){
			res.json({
				status:1,
				msg:err.message,
				result:'userIdErr'
			})
		}else{
			if(userDoc){
				let item = '';
				userDoc.cartList.forEach((productItem)=>{
					if(productItem._id == productId){
						productItem.productNum++;
						item = productItem;
					}
				})
				if(item){
					userDoc.save((err1,doc)=>{
						if(err){
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
					})
				}else{
					Goods.findOne({_id:productId},(err2,goodsDoc)=>{
						if(err2){
							res.json({
								status:1,
								msg:err2.message,
								result:'err'
							})
						}else{
							goodsDoc.productNum = 1;
							goodsDoc.checked = 1;
							userDoc.cartList.push(goodsDoc);
							userDoc.save((err3,doc1)=>{
								if(err3){
									res.json({
										status:1,
										msg:err3.message,
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
						}
					})
				}
			}
		}
	})
})

router.post('/editProductDetail',(req,res,next) =>{
	let id = req.body.id;
	let detail = req.body.detail;
	Goods.update({_id:id},{
		'productDetail':detail
	},(err,Doc) =>{
		if(err){
			res.json({
				status:1,
				msg:err.message,
				result:'err'
			})
		}else{
			res.json({
				status:0,
				msg:"suc",
				result:'suc'
			})
		}
	})
})

router.post('/delProductDetailImg',(req,res,next) =>{
	let productId = req.body.id;
	let imgId = req.body.imgId;
	Goods.update({_id:productId},{$pull:{'productDetailImg':{_id:imgId}}},(err,Doc)=>{
		if(err){
			res.json({
				status:1,
				msg:'err',
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




router.post('/editProductDetailImg',(req,res,next) =>{
	var uploadDir='static/productImg/';
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
	   var id = fields.id;
	   var file=files.file;
	 
	   var oldpath =path.normalize(file.path);//返回正确格式的路径
	   var r = Math.floor(Math.random()*100000000);
	   var newfilename=r+file.name;
	   var newpath=uploadDir+newfilename;
	   //写入数据库的信息
	  var productDetailImg={
			url : newfilename
	  };
	 fs.rename(oldpath,newpath,function(err){
	   if(err){
	    console.error("失败"+err);
	   }else {
	     	Goods.findOne({_id:id},(err1,Doc1) =>{
	     		Doc1.productDetailImg.push(productDetailImg);
	     		Doc1.save((err2,Doc2) =>{
	     			if(err2){
	     				res.json({
							status:1,
							msg:err2.message,
							result:'err'
						})
	     			}else{
	     				res.json({
							status:0,
							msg:"suc",
							result:{
	     							_id:Doc2.productDetailImg[Doc2.productDetailImg.length-1]._id,
	     							count:Doc2.productDetailImg.length
	     						}
						})
	     			}
	     		})
	     	})
	   }
	  });
	  //将老的图片路径改为新的图片路径

	 })
})


router.get('/getProductDetail',(req,res,next) =>{
	let id = req.param('id');
	Goods.findOne({_id:id},(err,Doc) =>{
		if(err){
			res.json({
				status:1,
				msg:err.message,
				result:'err'
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





module.exports = router;