let path = new Map()
let url = require("url")
let BlogDao = require("../dao/BlogDao")

function getBlogById(req, res) {

    let params = url.parse(req.url, true).query
    BlogDao.getBlogById(params.bid, function (result) {
        res.writeHead(200)
        res.write(JSON.stringify(result))
        res.end()
    })

}


//添加浏览次数
function addView(req, res) {
    let id = url.parse(req.url, true).query.bid
    BlogDao.addView(id, function (result) {
        res.writeHead(200)
        res.write(JSON.stringify(result))
        res.end()
    })
}

path.set("/getBlogById", getBlogById)
path.set("/addView", addView)


module.exports.path = path
