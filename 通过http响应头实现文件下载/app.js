
var http = require('http');

var server = http.createServer(function(req,res){


    res.setHeader('Content-Type','application/octet-stream');
    res.setHeader('Content-Disposition','attachment;filename=demo.txt');
    res.end('hello 你好!');
})

//开启服务
server.listen(9090,function(){
   console.log('http://localhost:9090');
});
