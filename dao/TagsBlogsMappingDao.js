let dbUtils = require("./dbUtail")

//设置映射
function setMapping(tagId, blogId, ctime, success) {
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

module.exports = {
    setMapping: setMapping
}
