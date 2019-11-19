let path = new Map()

let tagsDao = require("../dao/TagsDao")

function getRandomTags(req, res) {
    tagsDao.getAllTags(function (result) {
        console.log(result, 770)
        if (result != null && result.length > 0) {
            result.sort(function () {
                return Math.random() > 0.5 ? true : false
            })

            res.writeHead(200)
            res.write(JSON.stringify(result))
            res.end()
        }
    })

}

function getAllTags(req, res) {
    tagsDao.getAllTags(function (result) {
        if (result != null && result.length > 0) {
            res.writeHead(200)
            res.write(JSON.stringify(result))
            res.end()
        }
    })
}





path.set("/getRandomTags", getRandomTags)
path.set("/getAllTags", getAllTags)

module.exports.path = path

