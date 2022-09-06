const mysql= require('mysql')
const db=mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'sun123',
	database:'my_demo'
})
module.exports=db