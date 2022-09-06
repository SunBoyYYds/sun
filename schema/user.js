const joi =require('joi')

//定义用户名和密码的验证规则
const username=joi.string().alphanum().min(1).max(10).required()
const password=joi.string().pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$/).required()
// 定义验证注册和登录表单数据的规则对象
exports.regLoginSchema={
	body:{
		username,
		password
	}
}

//定义用户修改基本信息验证规则
const id =joi.number().integer().min(1).required()
const nickname=joi.string().required()
const email=joi.string().email().required()
exports.updateUserinfoSchema={
	body:{
		id,
		nickname,
		email
	}
}

//重置密码
exports.updatePwdSchema={
	body:{
		oldPwd:password,
		newPwd:joi.not(joi.ref('oldPwd')).concat(password)
	}
}