
//加载 hhtp fs path 模块
var http = require('http');
var fs = require('fs');
var path = require('path');

//创建 http 服务
const server = http.createServer(function(req,res){
    if (req.url === '/a.html') {
        //返回一张图片
        fs.readFile(path.join(__dirname,'远方明灯.jpg'),function(err,data){
            if (err) {
                throw err;
            }
            //响应请求报文头,数据类型
            res.setHeader('Content-Type','image/jpg');
            res.end(data);
        })
    }
})

//开启服务
server.listen(9090,function (){
    console.log('http://localhost:9090');
})