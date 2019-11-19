let dbUtils = require("./dbUtail")

//设置映射
function setMapping(tagId, blogId, ctime, success) {
    console.log(tagId, blogId, ctime,)
    let connection = dbUtils.createConnect()
    let queryStr = "insert into tags_blogs_mapping(tags_id,blogs_id,ctime) values(?,?,?)"
    connection.connect()
    connection.query(queryStr, [tagId, blogId, ctime], function (err, result) {

        if (err === null) {
            success(result)
            console.log("mapping")
        } else {
            console.log(err)
        }
    })
    connection.end()
}


// 获取映射

// function getTags(tagName, success) {
//     let connection = dbUtils.createConnect()
//     let queryStr = "select * from tags where tagName=?"
//     connection.connect()
//     connection.query(queryStr, [tagName], function (err, result) {
//         if (err === null) {
//             success(result)
//         } else {
//             console.log(err)
//         }
//     })
//     connection.end()
// }

module.exports = {
    setMapping: setMapping
}
