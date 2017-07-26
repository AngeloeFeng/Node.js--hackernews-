var http = require('http');

var server = http.createServer(function (req,res){

        res.setHeader('Content-Type','application/octet-stream');
        res.setHeader('Content-Disposition','attachment;filename=demo.txt');
        res.end('hello 你好!');
})

server.listen(8888,function(){
    console.log('http://localhost:8888');
})