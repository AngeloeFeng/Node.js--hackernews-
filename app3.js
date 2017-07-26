

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

var server = http.createServer(function (req,res) {


    //为res对象挂载一个render方法
    render(res);

    //获取用户请求过来的路径
    var reqUrl = req.url.toLowerCase();


    // 参数2，如果是 true, 表示 urlObj.query 属性被解析成了一个json 对象；
    // 如果是 false，那么 urlObj.query 依然是一个字符串
    var urlobj = url.parse(reqUrl,true);

    // console.log(urlobj);

    // 让 reqUrl 中保存的值变成 pathname
    reqUrl = urlobj.pathname;


    // 把 /favicon.ico 的请求，替换成 /resources/images/y18.gif
    reqUrl = (reqUrl === '/favicon.ico') ? '/resources/images/y18.gif' : reqUrl;

    console.log(reqUrl);
    //设置统一响应报文头
    res.setHeader('Content-Type','text/html;charset=utf-8');

    //用if else if 来判断用户请求(路由)
    if ((reqUrl === '/' || reqUrl === 'index') && req.method.toLowerCase() === 'get') {
        //读取view 下的index.html给用户
        res.render(path.join(__dirname,'view','index.html'));
    }else if (reqUrl === '/details') {
        //读取view 下的details.html给用户
        res.render(path.join(__dirname,'view','details.html'));
    }else if (reqUrl === '/submit') {
        //读取view 下的submit.html给用户
        res.render(path.join(__dirname,'view','submit.html'));
    }else if (reqUrl === '/add' && req.method.toLowerCase() === 'get') {
        //表示以 get 形式提交数据
        // 1.先读取data.json里的数据,将获取到的json对象转换成list数组
        fs.readFile(path.join(__dirname,'data','data.json'),'utf-8',function(err,data){
            if (err && err.code !=='ENOENT') {
                throw err;
            }
            //把读取到的json字符串转成数组
            var list = JSON.parse(data || '[]');

            // 表示 get 方式提交数据
            // 1. 获取用户提交过来的数据
            // req.url
            // urlObj.query 通过 url 模块解析后，就可以获取 用户 get 提交过来的数据

            //把用户提交过来的数据对象保存到数组中
            list.push(urlobj.query);
            //执行文件操作,把list数组中的数据写入到data.json文件中
            fs.writeFile(path.join(__dirname,'data','data.json'),JSON.stringify(list),function(err){
                if (err) {
                    throw err;
                }
                console.log('文件写入成功!')
                //3.重定向操作,通过服务器向浏览器响应一个报文头来实现
                res.statusCode=302;
                res.statusMessage='Found';
                //3.2设置重定向路径
                res.setHeader('Location','/');
                //结束响应
                res.end();
            });

        });

    }else if (reqUrl === '/add' && req.method.toLowerCase() === 'post') {
        //表示以 post 形式提交数据
    }else if (reqUrl.startsWith('/resouress')) {
        // 如果请求是以 /resources 开头的，表示请求的是静态资源
        // 如果是静态资源就直接读取 resources 目录下的资源直接返回
        res.render(path.join(__dirname,reqUrl));
    }else{
        res.statusCode === 404;
        res.statusMessage === 'Not Found';
        res.render(path.join(__dirname,'view','404.html'));
    }

});

//开启服务
server.listen(9090,function (){
    console.log('http://localhost:9090');
})

function render(res) {
    res.render=function (filename){
        //执行读取文件,并渲染代码
        fs.readFile(filename,function (err,data){
            if (err) {
                throw err;
            }
            //设置正确的 mime 类型
            res.setHeader('Content-Type', mime.lookup(filename));
            res.end(data);
        });
    };
}
