var mongoose = require('mongoose');
require('../config/config2.js');
//载入我们的Schema 和 model
var Article = mongoose.model('Article');
//添加文章
exports.addArticle = function(req,res){
	var article = new Article({
		addArticleTitle:req.body.addArticleTitle,
		addArticleAuthor:req.body.addArticleAuthor,
		addArticleContent:req.body.addArticleContent,
		addArticleTime:new Date()
	
	})
	console.log(article)
	article.save(function(err,doc){
		if (err) {
			console.log(err)
		}
		else{
			res.json({code:100})
		    
			
		}
	})
}

exports.ArticleFind = function(req,res){
	article.find({},function(err,doc){
		if(err){
			console.log(err)

		}
		else{
			res.json(doc)

		}
	})
}
//分页查询
exports.pagingQuery = function(req,res){
	var pageSize = 8 ;//一页显示多少条数
	var currentPage = req.body.currentPage;//当前第几页
	var sort = {'addArticleTime':-1}// 排序按登录时间 倒序
	var skipnum = (currentPage - 1) *pageSize; //跳过数
	Article.find({}).skip(skipnum).limit(pageSize).sort(sort).exec(function(err,doc){
        if(err){
			console.log(err)

		}
		else{
			res.json({'msg':doc})
			
		}
	})
}
//获取文章数量
exports.getArticleCount = function(req,res){
	Article.count({},function(err,doc){
		if (err) {
			console.log(err);
		}
		else{
			res.json({'msg':doc});
		}
	})
}
//删除文章
exports.deleteArticle = function(req,res){
	var id = req.body.id;
	Article.findByIdAndRemove(id,function(err,doc){
		if(err){
			console.log(err)
		}
		else{
			res.json({code:100})
		}
	})　　
}


