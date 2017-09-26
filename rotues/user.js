var mongoose = require('mongoose');
require('../config/config_user.js');
//载入我们的Schema 和 model
var OrdinUser = mongoose.model('OrdinUser');
//添加管理员账户
exports.addUser = function(req,res){
	var ordinUser = new OrdinUser({
		ordinUserId:req.body.ordinUserId,
		ordinUserPwd:req.body.ordinUserPwd,
		ordinUserName:req.body.ordinUserName,
		ordinUserAge:req.body.ordinUserAge,
		ordinUserSex:req.body.ordinUserSex,
		ordinUserImg:req.body.ordinUserImg,
		ordinUserTime:new Date()
		
	})
	console.log(ordinUser)
	ordinUser.save(function(err,doc){
		if (err) {
			if( err.code === 11000){
				res.json({code:102})
				//账号重复

			}
			else{
				console.log(err)
				res.json({code:101})
				//其他错误
			}
		}
		else{
			res.json({code:100})
			//注册成功
		}
	})
}
//普通用户登录账户
exports.loginUser = function(req,res){
	var ordinUserId = {ordinUserId:req.body.ordinUserId};
	var ordinUserPwd = req.body.ordinUserPwd;
	OrdinUser.find(ordinUserId,function(err,doc){
		if (err) {
			console.log(err)
		}
		else{
			if (doc[0] == undefined) {
				//账号不存在
				res.json({code:103})
			}
			else if(doc[0].ordinUserPwd == ordinUserPwd){
				//账号存在 且 密码正确
				res.json({code:100,id:doc[0]._id})

			}
			else{
				res.json({code:102})
			}
		}
	})

}
//将注册信息显示到后台个人信息里面
exports.matchidUser = function(req,res){
	var id = req.body.id;
	OrdinUser.findById(id,function(err,doc){
		if (err) {
			console.log(err)
		}
		else{
			res.json(doc)
			console.log(doc)
			
		}
	})

}
//分页查询
exports.pagingUser = function(req,res){
	var pageSize = 8 ;//一页显示多少条数
	var currentPage = req.body.currentPage;//当前第几页
	var sort = {'ordinUserTime':-1}// 排序按登录时间 倒序
	var skipnum = (currentPage - 1) *pageSize; //跳过数
	OrdinUser.find({}).skip(skipnum).limit(pageSize).sort(sort).exec(function(err,doc){
        if(err){
			console.log(err)

		}
		else{
			res.json({'msg':doc})
			
		}
	})
}
//获取用户数量
exports.getUserCount = function(req,res){
	OrdinUser.count({},function(err,doc){
		if (err) {
			console.log(err);
		}
		else{
			res.json({'msg':doc});
		}
	})
}
//删除用户
exports.deleteUser = function(req,res){
	var id = req.body.id;
	OrdinUser.findByIdAndRemove(id,function(err,doc){
		if(err){
			console.log(err)
		}
		else{
			res.json({code:100})
		}
	})　　
}