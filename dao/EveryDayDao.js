let dbUtail = require("./dbUtail")

console.log(dbUtail)

//获取每日一句的数据库连接操作
function getEveryDay(success) {
    let connection = dbUtail.createConnect();
    let queryStr = "select * from every_day order by id asc limit 1;";
    connection.connect()
    connection.query(queryStr, [], function (err, result) {

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
