//加载 http 模块
var http = require('http');
//加载 文件 模块
var fs = require('fs');
//加载 路径 模块
var path = require('path');
//加载 文件后缀名 模块
var mime = require('mime');
// 加载 内置模块（核心模块） url
// url 模块的作用就是把 get 请求的查询字符串
// ?title=fdasfd&url=http%3A%2F%2Flocalhost%3A9998%2Fsubmit&text=fdsafdsa
// 转换为 json 对象，以方便后续使用
var url = require('url');


var server = http.createServer(function (req,res){
    //获取用户请过来的路径
    var reqUrl = req.url.toLowerCase();

    //给res对象挂载一个render方法
    render(res);

    //设置网站图标
    reqUrl = (reqUrl === '/favicon.ico') ? '/resources/images/y18.gif' : reqUrl;

    // 参数2，如果是 true, 表示 urlObj.query 属性被解析成了一个json 对象；
    // 如果是 false，那么 urlObj.query 依然是一个字符串
    var urlObj = url.parse(reqUrl,true);
    console.log(urlObj)
    // 让 reqUrl 中保存的值变成 pathname
    reqUrl = urlObj.pathname;

    //设置统一响应报文头
    res.setHeader('Content-Type','text/html;charset=utf-8');

    if ((reqUrl === '/' || reqUrl === '/index') && req.method.toLowerCase() === 'get') {

        //根据用户请求的路径找到对应的文件
        res.render(path.join(__dirname,'view','index.html'));

    }else if (reqUrl === '/details') {

        //根据用户请求的路径找到对应的文件
        res.render(path.join(__dirname,'view','details.html'));

    }else if (reqUrl === '/submit') {

        //根据用户请求的路径找到对应的文件
       res.render(path.join(__dirname,'view','submit.html'));

    }else if (reqUrl === '/add' && req.method.toLowerCase() === 'get'){
        //表示请求方式是get

        //1.先读取data.json里的数据,然后加到list数组中
        fs.readFile(path.join(__dirname,'data','data.json'),'utf-8',function (err,data){
            if (err && err.code != 'ENOENT') {
                throw err;
            }

            //把读取到的json字符串转成数组
            var list = JSON.parse(data || '[]');

            //然后再把用户提交过来的数据保存到数组中
            list.push(urlObj.query);

            //然后再把数组中的数据写入到data.json文件中
            fs.writeFile(path.join(__dirname,'data','data.json'),JSON.stringify(list),function (err){
                if (err) {
                    throw err;
                }
                console.log('文件写入成功')
                //3.重定向操作,通过服务器向浏览器响应一个报文头来实现
                res.statusCode = 302;
                res.statusMessage = 'Found';

                //执行重定向路径,回到首页
                res.setHeader('location','/');

                //结束响应
                res.end();
            })
        })

    }else if (reqUrl === '/add' && req.method.toLowerCase() === 'post') {
        //表示请求方式是post

    }else if (reqUrl.startsWith('/resources')) {
        // 如果请求是以 /resources 开头的，表示请求的是静态资源
        // 如果是静态资源就直接读取 resources 目录下的资源直接返回
        res.render(path.join(__dirname,reqUrl));
    }
    else{
        res.statusCode = 302;
        res.statusMessage = 'NOt Found';
        res.render(path.join(__dirname,'view','404.html'));
    }

})

//开启服务
server.listen(9999,function(){
    console.log('http://localhost:9999');
})

function render(res) {
    res.render=function(filename){
        //执行读取文件,并渲染代码
        fs.readFile(filename,function(err,data){
            if (err) {
                throw err;
            }
            res.setHeader('Content-Type',mime.lookup(filename));
            res.end(data);
        });
    };
}

