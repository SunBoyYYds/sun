// 导入数据库模块
const db=require('../db/index')
//导入bcryptjs对密码加密
const bcrypt=require('bcryptjs')
//导入生成token的包
const jwt=require('jsonwebtoken')
//导入密钥 
const config=require('../config')
//注册
exports.reguser=(req,res)=>{
	//判断用户输入的账号密码是否为空
	// if(!req.body.username||!req.body.password)return res.cc('输入的账号密码不合法!')
  // 判断数据库是否有
	const select='select * from ev_users where username=?'
	db.query(select,req.body.username,(err,results)=>{
		if(err)return res.cc(err)
		if(results.length>0)return res.cc('用户名已存在')
		//对用户密码进行加密
		// req.body.password=bcrypt.hashSync(req.body.password,10)
		//存入数据库
		const insert='insert into ev_users set ?'
		db.query(insert,{username:req.body.username,password:req.body.password},(err,results)=>{
			if(err)return res.cc(err)
			if(results.affectedRows!==1)return res.cc(err)
			res.cc('注册成功',0)
	  })
	})
}
//登录
exports.login= (req,res)=>{
	//校验用户名跟密码
	const select= 'select * from ev_users where username=?'
	db.query(select,req.body.username,(err,results)=>{
		if(err)return res.cc(err)
		if(results.length!==1) return res.cc('用户不存在！')
		if(req.body.password!==results[0].password)return res.cc('密码错误')
		const info={...results[0],password:'',user_pic:''}
	// 对用户的信息进行加密生成token字符串
			//调用jwt.sign方法第一个参数是数据，第二个是密钥，第三个是一个对象，时间
			//Bearer 空格  是token必带的
			const token='Bearer '+ jwt.sign(info,config.jwtSecretKey,{expiresIn:'10h'})
		  res.send({
				status:0,
				msg:'登录成功',
				token
			})
	})
}