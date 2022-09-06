const express=require('express')
const router=express.Router()
//导入验证数据的中间件
const expressJoi=require('@escook/express-joi')
//导出验证规则对象
const {regLoginSchema}= require('../schema/user')
//导入对应的路由处理函数
const user=require('../router_handler/user')
//注册
router.post('/reguser',expressJoi(regLoginSchema),user.reguser)

//登录
router.post('/login',expressJoi(regLoginSchema),user.login)


module.exports=router