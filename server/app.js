var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var svgCaptcha = require('svg-captcha');


var index = require('./routes/index');
var users = require('./routes/users');
var goods = require('./routes/goods');
var admins = require('./routes/admins');
var bannerList = require('./routes/bannerList');
var app = express();

app.get('/captcha', function (req, res) {
	var codeConfig = {
        size: 5,// 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        height: 44 
    }
	var captcha = svgCaptcha.create(codeConfig);
	//req.session.captcha = captcha.text;
	res.cookie('captcha',captcha.text.toLowerCase(),{
		path:'/',
		maxAge:1000*60*2
	})
//	res.type('svg');
	res.status(200).send(captcha.data);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/bannerList',bannerList);
app.use('/admin', admins);
app.use(express.static('public'));
app.use((req,res,next)=>{
	if(req.cookies.userId){
		next();
	}else{
		if(req.originalUrl == '/users/login'||req.originalUrl == '/users/logOut'||req.path == '/goods/list'
		||req.originalUrl == '/users/register'||req.originalUrl == '/users/addAlbum'
		||req.originalUrl == '/goods/delGoods'||req.originalUrl == '/goods/addProduct'
		||req.originalUrl == '/goods/editProduct'||req.path == '/users/usersList'
		||req.originalUrl == '/users/delUser'||req.originalUrl == '/users/editUser'
		||req.originalUrl == '/users/delPhoto'||req.originalUrl == '/users/getShippingMethods'
		||req.originalUrl == '/users/mailValidation'||req.path == '/goods/getProductDetail'){
			next();
		}else{
			res.json({
				status:1,
				msg :"当前未登录",
				result:''
			})
		}
	}
})


app.use('/', index);
app.use('/users', users);
app.use('/goods',goods);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
