let http = require('http');
let url = require('url');
let util = require('util');
let fs = require('fs');

let server = http.createServer((req,res)=>{
//	res.statusCode = 200;
//	res.setHeader('Content-Type','Text/plain; charset=utf-8');
//	
//	res.end(util.inspect(url.parse(req.url)));
	let pathName = url.parse(req.url).pathname.toString().substring(1);
	fs.readFile(pathName,(error,data)=>{
		if(error){
			res.writeHeader(404,{
				'Content-Type':'Text/html; charset=utf-8'
			})
			res.end('为找到相应的页面！');
		}else{
			res.writeHeader(200,{
				'Content-Type':'Text/html; charset=utf-8'
			})
			res.end(data.toString());
		}
	})
})
server.listen(3001,()=>{
	console.log('服务器已经运行，请输入localhost:3001访问');
})
