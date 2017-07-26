var http = require('http');
var fs = require('fs');
var path = require('path');


var server = http.createServer(function (req,res){

    //用去请求的路径
    var reqUrl = req.url.toLowerCase();

    //判断一下用户请求过来的图标
    reqUrl = (reqUrl === '/favicon.ico') ? '404.gif' : reqUrl;

    res.setHeader('Content-Type','image/gif');


    if (reqUrl === '/a.html') {
        fs.readFile(path.join(__dirname,'404.gif'),function(err,data){
            if (err) {
                throw err;
            }
            res.setHeader('Content-Type','image/gif')
            res.end(data);
        })
    }
})

server.listen(9999,function(){
    console.log('http://localhost:9999');
})