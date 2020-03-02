let dbUtail = require("./dbUtail")


//获取所有每日一句的数据库连接操作
function checkLogin(username, success) {
    let connection = dbUtail.createConnect();
    let queryStr = "select passwd from user where user = ? ";
    connection.connect()
    connection.query(queryStr, [username], function (err, result) {

        //没有错的情况
        if (err === null) {
            console.log(result, 999)
            success(result)

        } else {
            console.log("出错了", err)
            success(err)
        }
        
    })
    connection.end()//拿到数据后关闭连接
}







module.exports = {
    checkLogin: checkLogin,

}