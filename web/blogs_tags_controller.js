// let blogDao = require("../dao/BlogDao")
// let url = require("url")
// let path = new Map()
// let timer = require("../utils/timeUtil")
// let tagsDao = require("../dao/TagsDao")
//
//
// function setBlog(req, res) {
//     console.log(url.parse(req.url, true).query, 111)
//     let params = url.parse(req.url, true).query
//     let title = params.title
//     let content = params.blog
//     let ctime = timer();
//     let tags = url.parse(req.url, true).query.tags.replace("，", ",")
//
//     let utime = timer()
//     let view = 0
//
//     console.log(title, content, ctime, view, tags, utime, 2222)
//
//     blogDao.setBlog(title, content, ctime, view, tags, utime, function (result) {
//         console.log(result)
//         res.writeHead(200)
//         res.write("添加博客成功")
//         res.end()
//     })
//
//     //在插入一条新的文章后
//     //要判断当前文章的标签是否存在，不在就插一条
//     //要往标签和文章的映射表里面也插入一条
//     let tagArr = tags.split(",")
//
//     for (let i = 0; i < tagArr.length; i++) {
//         tagsDao.getTags(tagArr[i], function (result) {
//             //判断如果标签不存在的话，在数据库里面添加一条新的纪录
//             if (result === null) {
//                 tagsDao.setTags(tagArr[i], function (result) {
//                     console.log("添加新的标签记录")
//                 })
//             }
//         })
//     }
// }
//
// //添加新的标签数据并且添加映射
// function addNewTags(tags) {
//
// }
//
// //添加新的标签和博客的映射数据
// function addTagsBlogsMapping(tagsId, blogId) {
//
//
// }
//
//
// path.set("/setBlog", setBlog)
//
// module.exports.path = path
//
