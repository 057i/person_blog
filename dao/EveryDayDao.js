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

//添加每日一句的数据库操作
function addEveryDay(author, content, time, success) {
    let connection = dbUtail.createConnect();
    let queryStr = "insert into every_day(author,content,ctime) values(?,?,?)"
    connection.connect()
    connection.query(queryStr, [author, content, time], function (err, result) {
        if (err === null) {
            console.log(success)
            success(result)
        } else {
            console.log(err)
        }
    })
    connection.end()//拿到数据后关闭连接
}


//修改每日一句的数据库操作
function setEveryDay(id, author, content, time, success) {
    let connection = dbUtail.createConnect();
    let queryStr = "update every_day set author=?,content=?,ctime=? where id=?"
    connection.connect()
    connection.query(queryStr, [author, content, time, id], function (err, result) {
        if (err === null) {
            console.log(success, "修改")
            success(result)
        } else {
            console.log(err)
        }
    })
    connection.end()//拿到数据后关闭连接
}

function delEveryDay(id, success) {
    let connection = dbUtail.createConnect();
    let queryStr = "delete from every_day  where id=?"
    connection.connect()
    connection.query(queryStr, [id], function (err, result) {
        if (err === null) {
            console.log(success)
            success(result)
        } else {
            console.log(err)
        }
    })
    connection.end()//拿到数据后关闭连接
}




//获取所有每日一句的数据库连接操作
function getAllEveryDay(success) {
    let connection = dbUtail.createConnect();
    let queryStr = "select * from every_day ";
    connection.connect()
    connection.query(queryStr, [], function (err, result) {

        //没有错的情况
        if (err === null) {
            console.log(result)
            success(result)

        } else {
            console.log("出错了", err === null)
        }
    })
    connection.end()//拿到数据后关闭连接
}




module.exports = {
    getEveryDay: getEveryDay,
    setEveryDay: setEveryDay,
    getAllEveryDay: getAllEveryDay,
    addEveryDay: addEveryDay,
    delEveryDay: delEveryDay
}