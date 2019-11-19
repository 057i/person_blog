let path = new Map()
let commentDao = require("../dao/CommentDao")
let url = require("url")
let timer = require("../utils/timeUtil")

function getComments(req, res) {
    let params = url.parse(req.url, true).query
    commentDao.getComments(params.bid, function (result) {
        res.writeHead(200)
        res.write(JSON.stringify(result))
        res.end()
    })
}

function setComment(req, res) {
    let params = url.parse(req.url, true).query

    let time = timer()
    commentDao.setComment(params.blog_id, params.parent, params.user_name, params.comment, params.email, time, time, function (result) {
            res.writeHead(200)
            res.write(JSON.stringify(result))
            res.end()
        }
    )
}

//获取评论数量
function getCommentsCount(req, res) {
    let params = url.parse(req.url, true).query

    commentDao.getCommentsCount(params.parent, function (result) {
        if (result) {
            res.writeHead(200)
            res.write(JSON.stringify(result))
            res.end()
        }
    })

}


function createRandomCode(req, res) {
    commentDao.createRandomCode(function (result) {
        res.writeHead(200)
        res.write(JSON.stringify(result))
        res.end()

    })
}

//获取最新评论
function getNewComments(req, res) {
    commentDao.getNewComments(5, function (result) {
        res.writeHead(200)
        res.write(JSON.stringify(result))
        res.end()

    })
}



path.set("/getComments", getComments)
path.set("/setComment", setComment)
path.set("/getCommentsCount", getCommentsCount)
path.set("/createRandomCode", createRandomCode)
path.set("/getNewComments", getNewComments)


module.exports.path = path

