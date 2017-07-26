//加载模块
var http = require('http');

var fs = require('fs');

var mime = require('mime');

var path = require('path');

//创建服务
var server = http.createServer(function(req,res){

    //获取用户请求过来的路径
    reqUrl = req.url.toLowerCase();

    //设置请求过来的图标
    reqUrl = (reqUrl === '/favicon.ico') ? '/imgs/index.png' : reqUrl;

    //用户请求的过来的路径去public目录下找对应的文件
    var filename = path.join(__dirname,'public',reqUrl);

    //读取文件
    fs.readFile(filename,function(err,data){
        if (err) {
            if (err.code === 'ENOENT') {
                res.setHeader('Content-Type','text/html;charset=utf-8');
                res.end('您访问的页面不存在!')
            }
            throw err;
        }
        res.setHeader('Content-Type',mime.lookup(filename));
        res.end(data);
    })

})


//开启服务
server.listen(9999,function(){
    console.log('http://localhost:9999');
})
