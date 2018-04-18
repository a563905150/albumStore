let express = require('express');
let router = express.Router();
let BannerList = require('./../models/bannerList');
let formidable = require('formidable');
let path = require('path');
let fs = require('fs');
router.get('/getList',(req,res,next)=>{
	BannerList.find({},(err,Doc)=>{
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
});

router.post('/addList',(req,res,next)=>{
	var uploadDir='static/banner/';
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

	   var file=files.file;
	 
	   var oldpath =path.normalize(file.path);//返回正确格式的路径
	 
	   var newfilename='banner'+file.name;
	   var newpath=uploadDir+newfilename;
	 
	   //写入数据库的信息
	  var bannerImage={
	   		"url":newfilename
	  };
	 fs.rename(oldpath,newpath,function(err){
	   if(err){
	    console.error("失败"+err);
	   }
	   else {
	     BannerList.create(bannerImage);
	     res.send('成功');
	   }
	  });
	  //将老的图片路径改为新的图片路径

	 })
})


router.post('/delList',(req,res,next)=>{
	let _id = req.body._id;
	BannerList.remove({_id:_id},(err,Doc)=>{
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

module.exports = router;