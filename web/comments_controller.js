let path = new Map()
let commentDao = require("../dao/CommentDao")
let url = require("url")
let timer = require("../utils/timeUtil")

function getComments(req, res) {
    let params = url.parse(req.url, true).query
    commentDao.getComments(params.section, function (result) {
        res.writeHead(200)
        res.write(JSON.stringify(result))
        res.end()
    })
}

function setComment(req, res) {
    let params = url.parse(req.url, true).query

    let time = timer()
    console.log(params, 6785687, time)
    commentDao.setComment(params.blog_id, params.parent, params.section, params.user_name, params.comment, params.email, time, time, function (result) {
        res.writeHead(200)
        res.write(JSON.stringify(result))
        res.end()
    }
    )
}


function delComment(request, response) {
    request.on("data", function (data) {
        let content = JSON.parse(data)
        console.log(content)
        commentDao.delComment(content.id, function (result) {
            response.writeHead(200)
            response.write("删除评论成功")
            console.log("删除评论成功")
            response.end()

        })
    })
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
path.set("/delComment", delComment)



module.exports.path = path

