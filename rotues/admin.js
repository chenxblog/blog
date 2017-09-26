var mongoose = require('mongoose');
require('../config/config1.js');
//载入我们的Schema 和 model
var AdminUser = mongoose.model('AdminUser');
//添加管理员账户
exports.addAdmin = function(req,res){
	var adminUser = new AdminUser({
		adminUserId:req.body.adminUserId,
		adminUserPwd:req.body.adminUserPwd,
		adminUserName:req.body.adminUserName,
		adminUserAge:req.body.adminUserAge,
		adminUserSex:req.body.adminUserSex,
		adminUserImg:req.body.adminUserImg
		
	})
	console.log(adminUser)
	adminUser.save(function(err,doc){
		if (err) {
			console.log(err)
		}
		else{
			res.json({code:100})
		}
	})
}
//管理员登录账户
exports.loginAdmin = function(req,res){
	var adminUserId = {adminUserId:req.body.adminUserId};
	var adminUserPwd = req.body.adminUserPwd;
	AdminUser.find(adminUserId,function(err,doc){
		if (err) {
			console.log(err)
		}
		else{
			if (doc[0] == undefined) {
				//账号不存在
				res.json({code:103})
			}
			else if(doc[0].adminUserPwd == adminUserPwd){
				//账号存在 且 密码正确
				res.json({code:100,id:doc[0]._id})

			}
			else{
				res.json({code:102})
			}
		}
	})

}
//后台管理账户id唯一
exports.findIdAdmin = function(req,res){
	var id = req.body.id;
	AdminUser.findById(id,function(err,doc){
		if (err) {
			res.json({code:102})
		}
		else{
			res.json({code:100})
		}
	})

}
//将注册信息显示到后台个人信息里面
exports.matchidAdmin = function(req,res){
	var id = req.body.id;
	AdminUser.findById(id,function(err,doc){
		if (err) {
			console.log(err)
		}
		else{
			res.json(doc)
			
		}
	})

}


