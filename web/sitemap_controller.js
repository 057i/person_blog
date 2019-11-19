let BlogDao = require("../dao/BlogDao")

let path = new Map()

function getNewBlogs(request, response) {
    BlogDao.getNewBlogs(20, function (result) {
        response.writeHead(200)
        response.write(JSON.stringify(result))//对象不能直接写回到页面，必须字符串
        response.end()
    })

}

path.set("/getNewBlogs", getNewBlogs)
module.exports.path = path


