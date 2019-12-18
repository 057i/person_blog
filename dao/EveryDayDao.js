let dbUtail = require("./dbUtail")

//获取每日一句的数据库连接操作
function getEveryDay(success) {
    let connection = dbUtail.createConnect();
    let randomStr = Math.floor(Math.random() * 10)
    let queryStr = "select * from every_day limit ?,1";
    connection.connect()
    connection.query(queryStr, [randomStr], function (err, result) {

        //没有错的情况
        if (err === null) {
            success(result)

        } else {
            console.log("出错了", err === null)
        }
    })
    connection.end()//拿到数据后关闭连接
}

//设置每日一句的数据库操作
function setEveryDay(content, time, success) {
    let connection = dbUtail.createConnect();
    let queryStr = "insert into every_day(content,ctime) values(?,?)"
    connection.connect()
    connection.query(queryStr, [content, time], function (err, result) {
        if (err === null) {
            console.log(success)
            success(result)
        } else {
            console.log(err)
        }
    })
    connection.end()//拿到数据后关闭连接
}

module.exports = {
    getEveryDay: getEveryDay,
    setEveryDay: setEveryDay

}
