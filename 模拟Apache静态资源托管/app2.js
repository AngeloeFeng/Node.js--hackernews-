

//加载模块
var http = require('http');

var fs = require('fs');

var path = require('path');


var mime = require('mime');


//创建服务
var server = http.createServer(function(req,res){

    //获取用户请求过来的路径
    var reqUrl = req.url.toLowerCase();

    //判断一下用户请求的路径是不是由favicon.icon
    var reqUrl = (reqUrl === '/favicon.ico') ? '/imgs/index.png' : reqUrl;

    //根据用户请求过来的路径,去public下找对应的文件
    var filename = path.join(__dirname,'public',reqUrl);

    //读取文件
    fs.readFile(filename,function(err,data){
        if (err) {
            //如果有错误,并且错误状态码为'ENOENT'时就在页面给用户提示错误信息
            if (err.code === 'ENOENT') {
                res.setHeader('Content-Type','text/html;charset=utf-8');
                res.end('<h1>您访问的页面不存在!</h1>')
            }
            throw err;
        }
        res.setHeader('Content-Type',mime.lookup(filename));
        res.end(data);
    })

})

//开启服务
server.listen(9090,function(){
    console.log('http://localhost:9090');
})

