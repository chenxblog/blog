var mongoose = require('mongoose');
//载入一个mongoose 主要用于 链接 操作数据库 mongodb
var uri = 'mongodb://localhost/adminUser1';
//设置数据库的地址 以及添加数据库表
mongoose.connect(uri);
// 链接数据库
var adminUserSchema = new mongoose.Schema({
	adminUserId:{type:String,unique:true},
	adminUserPwd:{type:String},
	adminUserName:{type:String},
	adminUserSex:{type:Boolean},
	adminUserAge:{type:String},
	adminUserImg:{type:String}
})
//创建一个 mongoose Schema 用于设置表的结构
mongoose.model('AdminUser',adminUserSchema);
//使用mongoose model方法 给我们的Schema 能够 让我们的Schema有添加 删除等功能
//主要用作我们管理员账户