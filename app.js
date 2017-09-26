var express = require('express');
//载入一个express 模块
var app = express();
//创建一个express实例
var bodyParser = require('body-parser');//引入
//载入解析req的 express第三方中间件 body-parser
var images = require('images');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
app.use(multipart({uploadDir:'./public/images/temp'}));
app.use(express.static('public'));
//使用express内置中间件 托管静态资源
/*app.use(bodyParser.urlencoded({extended:false}))*/
app.use(bodyParser.json());
//app.use使用中间件的方法 我们使用的是BodyParser JSON主要用解析JSON

var article = require('./rotues/article.js');
var adminUser = require('./rotues/admin.js');
var ordinUser = require('./rotues/user.js');
app.get('/',function(req,res){
	res.redirect('./admin/login.html')
})
//处理 由客户端发过来的请求 并做出响应的过程 叫做路由
//定义一个路由接口 这个接口 做接收客户端提交的信息 并可以做出处理
//express写一些路由
app.post('/addAdmin',adminUser.addAdmin);

app.post('/loginAdmin',adminUser.loginAdmin);

app.post('/findIdAdmin',adminUser.matchidAdmin);

app.post('/addArticle',article.addArticle);

app.post('/ArticleFind',article.ArticleFind);

app.post('/pagingQuery',article.pagingQuery);

app.post('/getArticleCount',article.getArticleCount);

app.post('/deleteArticle',article.deleteArticle);

app.post('/addUser',ordinUser.addUser);

app.post('/loginUser',ordinUser.loginUser);

app.post('/matchidUser',ordinUser.matchidUser);

app.post('/pagingUser',ordinUser.pagingUser);

app.post('/getUserCount',ordinUser.getUserCount);

app.post('/deleteUser',ordinUser.deleteUser);


app.post('/tpmdata',multipartMiddleware,function(req,res){
	console.log(req.files.myfile)
	/*images(('./public/images/temp/BIXXqQwY9tR_3UuroUyPlZFx.png'),200,0,150,150)
	.size(150)
	.save('./public/images/temp/BIXXqQwY9tR_3UuroUyPlZFx.png')*/
	res.json({src:req.files.myfile.path})

})

app.post('/caijian',function(req,res){
	console.log(req.body)
	images(images(req.body.src),req.body.clX,req.body.clY,150,150)
	 .size(150)
	 .save(req.body.src);
	 res.json({code:100,src:req.body.src})
})
app.post('/userCheck',adminUser.findIdAdmin);


app.listen('8080',function(){
	console.log('我的服务器启动了,端口号：8080')
})
