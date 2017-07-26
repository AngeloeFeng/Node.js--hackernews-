
var http = require('http');

var path = require('path');

var fs = require('fs');

//加载 mime 模块cvv
var mime = require('mime');

//监听请求事件
var server = http.createServer(function(req,res){
    //获取请求过来的路径
    var reqUrl = req.url.toLowerCase();

    //做一个判断,
    reqUrl = (reqUrl === '/favicon.ico') ? '/imgs/index.png' : reqUrl;


    // http://localhost:9090/imgs/404.gif
    // 根据用户请求的路径,去 public 目录下查找对应的文件
    var filename = path.join(__dirname,'public',reqUrl);
    console.log(filename)
    //读取文件
    fs.readFile(filename,function (err,data){
        if (err) {
            // 如果是文件不存在，那么向用户响应一个 404 文件不存在的页面
            if (err.code === 'ENOENT') {
                res.setHeader('Content-Type','text/html;charset=utf-8');
                res.end('404:你查找的不存在!');

                return;//阻止继续执行
            }
            throw err;
        }
        res.setHeader('Content-Type',mime.lookup(filename));
        res.end(data);
    })

})

//开启服务
server.listen(9090,function (){
    console.log('http://localhost:9090');
})
