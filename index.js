//起步
//1.下载express yarn add express
//2.引用并开启服务器
//3.解决跨域 yarn add cors
//4.引入并注册中间件
//5.处理表单格式的数据，json数据格式的中间件
//6.新建routre用来存放所有的路由
//routre_handler用来存放所有路由的处理函数
//7.引入注册路由模块
//8.下载mysql yarn add mysql 并创建db/index.js文件存放sql
//9.在router_handler模块引入数据库后续使用
//10.对用户密码进行加密yarn add bcryptjs并在router_handler中引入
//11.优化res.send代码
//12.安装验证的包yarn add @hapi/joi@17.1.0 @escook/express-joi
//新建schema文件引入验证规则包，定义用户名密码验证规则
//定义验证注册和登录表单数据的规则对象
//在router文件导入验证数据的中间件和规则对象
//13.定义全局的错误中间件 引入const joi =require('@hapi/joi')
//14.用户登录成功给用户发token  yarn add jsonwebtoken@8.5.1
//在router_handler模块引入
//15.配置解析token的中间件 yarn add express-jwt@5.3.3
//在index中路由之前配置解析token的中间件
const express=require('express')
const app=express()
const joi =require('joi')
app.use(require('cors')())
app.use(express.urlencoded({extended:false}))//表单	格式的数据
app.use(express.json())//json数据格式
//优化res.send代码
app.use((req,res,next)=>{
  res.cc = (err,status = 1)=>{
			res.send({
				status:status,
				msg:err instanceof Error?err.message:err
			})
	}
	next()
})

//解析token
const jwt=require('express-jwt')
const fig=require('./config')
//配置jwt需要的密钥,需要通过unless来排除不需要token的路由
app.use(jwt({secret:fig.jwtSecretKey}).unless({path:[/^\/api/]}))

//路由
const userRoute=require('./router/uesr')
app.use('/api',userRoute)
const userinfoRouter=require('./router/userinfo')
app.use('/my',userinfoRouter)
//错误中间件必须写在全部路由的后面
app.use((err,req,res,next)=>{
	//验证失败导致的错误
	if(err instanceof joi.ValidationError)return res.cc(err)
	//验证token
	if(err.name==='UnauthorizedError') return res.cc('身份认证失败')
	//未知
	res.cc(err)
})
app.listen(80,()=>{
	console.log('开启成功,http://127.0.0.1');
})