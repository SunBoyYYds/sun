const db=require('../db/index')
//导入bcryptjs对密码加密
const bcrypt=require('bcryptjs')
//导入解析token
// const bcrypt =require('bcryptjs')
//获取用户基本信息
exports.getUserInfo=(req,res)=>{
	//登录成拿到token里的用户的id
	//解析token成功会会自动往req身上挂载req.user.id
	const select='select id, username, nickname, email, user_pic from ev_users where id=?'
	db.query(select,req.user.id,(err,results)=>{
   if(err) return res.cc(err)
	 if(results.length!==1)return res.cc('获取用户信息失败')
	 res.send({
		status:0,
		msg:'获取用户信息成功',
		data:results[0]
	 })
	})
}
//用户更改信息
exports.setUserInfo=(req,res)=>{
	const update='update ev_users set ? where id=?'
	req.body.password=bcrypt.hashSync(req.body.password,10)
	db.query(update,[req.body,req.user.id],(err,results)=>{
		if(err)return res.cc(err)
		if(results.affectedRows!==1) return res.cc('修改信息失败')
		return res.cc('修改成功',0)
	})
}

//重置密码
exports.setPassword=(req,res)=>{
	const select='select * from ev_users where id=?'
	db.query(select,req.user.id,(err,results)=>{
		if(err) return res.cc(err)
		if(results.length!==1)return res.cc('用户不存在')
		//判断用户输入的密码对不对
		if(!bcrypt.compareSync(req.body.oldPwd,results[0].password))return res.cc('旧密码错误')
		const update='update ev_users set password=? where id=?'
		//对新密码进行加密
	  req.body.oldPwd=bcrypt.hashSync(req.body.oldPwd,10)
		db.query(update,[req.body.newPwd,req.user.id],(err,results)=>{
			if(err) return res.cc(err)
			if(results.affectedRows!==1)return res.cc('修改失败')
			res.cc('修改成功!',0)
		})
	})
	
}