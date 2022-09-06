const express=require('express')
const router=express.Router()
const {updateUserinfoSchema,updatePwdSchema}=require('../schema/user')
//导入验证数据的中间件
const expressJoi=require('@escook/express-joi')

//导入处理路由函数
const userinfo=require('../router_handler/userinfo')

//获取用户基本信息
router.get('/userinfo',userinfo.getUserInfo)

//用户更改信息
router.post('/userinfo',expressJoi(updateUserinfoSchema),userinfo.setUserInfo)


//重置密码
router.post('/updatepwd',expressJoi(updatePwdSchema),userinfo.setPassword)





module.exports=router
