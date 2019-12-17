let dbUtil = require("./dbUtail")

let svgCaptcha = require("svg-captcha")

//获取评论信息
function getComments(section, success) {
    let connection = dbUtil.createConnect()
    let queryStr = "select * from comments where section =? order by utime desc limit 1 ,5 "

    connection.connect()
    connection.query(queryStr, [section], function (err, result) {
        if (err === null) {
            console.log(result)
            success(result)

        } else {
            console.log(err)
        }

    })
    connection.end()
}

//设置评论
function setComment(blog_id, parent, section, user_name, comment, email, ctime, utime, success) {
    console.log(arguments, 990890)
    let connection = dbUtil.createConnect()
    let queryStr = "insert into comments(blog_id,parent,section,user_name,comment,email,ctime,utime)values(?,?,?,?,?,?,?,?) "

    connection.connect()
    connection.query(queryStr, [blog_id, parent, section, user_name, comment, email, ctime, utime], function (err, result) {
        if (err === null) {
            success(result)
        } else {
            console.log(err)
        }
    })
    connection.end()
}


// //获取评论数(bid为-1是留言模块的评论，bid为-2)
// function getCommentsCount(module, success) {
//     let connection = dbUtil.createConnect()
//     let queryStr = "select count(*) from comments where parent =? "

//     connection.connect()
//     connection.query(queryStr, [parent], function (err, result) {
//         if (err === null) {
//             success(result)
//         } else {
//             console.log(err)
//         }
//     })
//     connection.end()
// }

//获取最新评论
function getNewComments(limit, success) {
    let connection = dbUtil.createConnect()
    let queryStr = "select * from comments order by ctime desc limit ? "

    connection.connect()
    connection.query(queryStr, [limit], function (err, result) {
        if (err === null) {
            success(result)
        } else {
            console.log(err)
        }
    })
    connection.end()
}


//获取svg验证码
function createRandomCode(success) {
    let cap = svgCaptcha.create({fontSize: 50, height: 34, width: 100});
    success(cap)
}


module.exports = {
    setComment: setComment,
    getComments: getComments,
    // getCommentsCount: getCommentsCount,
    createRandomCode: createRandomCode,
    getNewComments: getNewComments
}
