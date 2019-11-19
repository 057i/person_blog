let dbUtils = require("./dbUtail")

//设置标签
function setTags(tagName, ctime, success) {
    let connection = dbUtils.createConnect()
    let queryStr = "insert into tags(tagName,ctime) values(?,?)"
    connection.connect()
    connection.query(queryStr, [tagName, ctime], function (err, result) {
        if (err === null) {
            console.log("标签")
            success(result)
        } else {
            console.log(err)
        }
    })
    connection.end()
}


//获取标签是否存在
function getTags(tagName, success) {
    let connection = dbUtils.createConnect()
    let queryStr = "select * from tags where tagName=?"
    connection.connect()
    connection.query(queryStr, [tagName], function (err, result) {
        if (err === null) {
            if (result && result.length != 0) {
                console.log(result, "tagResp")
                success(result)
            } else {
                success(null)
            }

        } else {
            console.log(err)
        }
    })
    connection.end()
}


//获取标签id
function getTagId(tagName, success) {
    console.log(tagName)
    let connection = dbUtils.createConnect()
    let queryStr = "select id from tags where tagName=?"
    connection.connect()
    connection.query(queryStr, [tagName], function (err, result) {
        console.log(result, "tagid")
        if (err === null) {
            console.log("getIDrESULT", result)
            if (result[0] && result[0].id) {
                success(result[0].id, 5423432)
            } else {
                success(null)
            }

        } else {
            console.log(err)
        }
    })
    connection.end()
}


function getAllTags(success) {
    let connection = dbUtils.createConnect()
    let queryStr = "select * from tags"
    connection.connect()
    connection.query(queryStr, [], function (err, result) {
        console.log(result, 890)
        if (err === null) {
            success(result)
        } else {
            console.log(err)
        }
    })
    connection.end()
}


module.exports = {
    setTags: setTags,
    getTags: getTags,
    getTagId: getTagId,
    getAllTags: getAllTags
}
