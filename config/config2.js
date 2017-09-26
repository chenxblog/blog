var mongoose = require('mongoose');
var uri = 'mongodb://localhost/adminAdd';
mongoose.connect(uri);
var addArticle = new mongoose.Schema({
	addArticleTitle:{type:String,unique:true},
	addArticleAuthor:{type:String},
	addArticleContent:{type:String},
	addArticleTime:{type:Date}
})

mongoose.model('Article',addArticle);
//用作添加我们文章的信息