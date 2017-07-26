//加载 http 模块
var http = require('http');
//加载 文件 模块
var fs = require('fs');
//加载 路径 模块
var path = require('path');
//加载 文件后缀名 模块
var mime = require('mime');
//加载 获取用户请求路径的数据 内置模块(核心模块)
var url = require('url');

var server = http.createServer(function (req,res) {
    //获取用户请求过来的路径
    var reqUrl = req.url.toLowerCase();

    // 把 /favicon.ico 的请求，替换成 /resources/images/y18.gif
    reqUrl = (reqUrl === '/favicon.ico') ? '/resources/images/y18.gif' : reqUrl;

    //设置统一响应报文头
    res.setHeader('Content-Type','text/html;charset=utf-8');

    //用if else if 来判断用户请求(路由)
    if (reqUrl === '/' || reqUrl === 'index' && req.method.toLowerCase() === 'get') {
        //读取view 下的index.html给用户
        render(path.join(__dirname,'view','index.html'),res);
    }else if (reqUrl === '/details') {
        //读取view 下的details.html给用户
        render(path.join(__dirname,'view','details.html'),res);
    }else if (reqUrl === '/submit') {
        //读取view 下的submit.html给用户
        render(path.join(__dirname,'view','submit.html'),res);
    }else if (reqUrl === '/add' && req.method.toLowerCase() === 'get') {
        //表示以 get 形式提交数据

    }else if (reqUrl === '/add' && req.method.toLowerCase() === 'post') {
        //表示以 post 形式提交数据
    }else if (reqUrl.startsWith('/resouress')) {
        // 如果请求是以 /resources 开头的，表示请求的是静态资源
        // 如果是静态资源就直接读取 resources 目录下的资源直接返回
        render(path.join(__dirname,reqUrl),res);
    }else{
        res.statusCode === 404;
        res.statusMessage === 'Not Found';
        res.setHeader('Content-Type','text/html;charset=utf-8');
        res.end('<h1>404:找不到了!</h1>')
    }

});

//开启服务
server.listen(9090,function (){
    console.log('http://localhost:9090');
})


function render(filename,res){
    fs.readFile(filename,function (err,data){
        if (err) {
            throw err;
        }
        //设置正确的 mime 类型
        res.setHeader('Content-Type',mime.lookup(filename));
        res.end(data);
    })
}