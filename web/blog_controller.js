let blogDao = require("../dao/BlogDao")
let url = require("url")
let path = new Map()
let timer = require("../utils/timeUtil")
let tagsDao = require("../dao/TagsDao")
let tagsBlogsMappingDao = require("../dao/TagsBlogsMappingDao")

//添加博客
function setBlog(req, res) {
    let params = url.parse(req.url, true).query
    let title = params.title
    let content = params.blog
    let ctime = Math.round(timer());
    let tags = url.parse(req.url, true).query.tags.replace("，", ",")

    let utime = Math.round(timer());
    let view = 0

    console.log(title, content, ctime, view, tags, utime, 2222)

    blogDao.setBlog(title, content, ctime, view, tags, utime, function (result) {
        console.log(result)
        res.writeHead(200)
        res.write("添加博客成功")
        res.end()


        //统一逗号大小写
        let tagArr = tags.split(",")


        //在插入一条新的文章后
        //要判断当前文章的标签是否存在，不在就插一条
        //要往标签和文章的映射表里面也插入一条
        blogDao.getBlogId(title, content, ctime, function (blogid) {
            console.log(blogid, "blogid")
            if (blogid) {

                for (let i = 0; i < tagArr.length; i++) {

                    tagsDao.getTags(tagArr[i], function (tagsResult) {

                        console.log("tagsResult", tagsResult)
                        if (tagsResult == null) {
                            //判断如果标签不存在的话，在数据库里面添加一条新的纪录，并且添加映射
                            console.log(1)
                            addNewTags(tagArr[i], ctime)
                            addTagsBlogsMapping(tagArr[i], blogid, ctime)
                        } else {
                            console.log(2)
                            //如果标签记录存在的话，则只添加映射记录
                            addTagsBlogsMapping(tagArr[i], blogid, ctime)
                        }
                    })
                }

            }


        })


    })


}

//添加新的标签数据
function addNewTags(tag, ctime) {
    console.log("addNewTags")
    tagsDao.setTags(tag, ctime, function (result) {
        console.log("添加新的标签记录成功", result)
    })

}

//根据tagName，获取到tagid，然后添加新的标签和博客的映射数据
function addTagsBlogsMapping(tagName, blogId, ctime) {
    console.log("addTagsBlogsMapping", tagName, blogId, ctime)

    tagsDao.getTagId(tagName, function (result) {
        //以从数据库中获取到的tagid为参数，再去请求一次数据库
        if (result != null) {
            tagsBlogsMappingDao.setMapping(result, blogId, ctime, function (resp) {
                console.log("添加映射记录成功")
            })
        }
    })
}


//按页数查询博客
function getBlog(req, res) {
    let params = url.parse(req.url, true).query
    console.log(params)
    let page = params.page;
    let pageSize = params.pageSize
    blogDao.getBlog(page, pageSize, function (result) {
        res.writeHead(200)
        res.write(JSON.stringify(result))
        res.end()

    })
}

//查询博客总数
function getBlogCount(req, res) {
    blogDao.getBlogCount(function (result) {
        res.writeHead(200)
        res.write(JSON.stringify(result[0]))
        res.end()
    })
}

//按关键字查找博客
function searchByKey(req, res) {
    let params = url.parse(req.url, true).query
    console.log(params, 909)
    blogDao.searchByKey(params.key, params.page, params.pageSize, function (result) {
        res.writeHead(200)
        res.write(JSON.stringify(result))
        res.end()
    })
}


//按页数查询博客
function getHotBlogs(req, res) {
    blogDao.getHotBlogs(5, function (result) {
        res.writeHead(200)
        res.write(JSON.stringify(result))
        res.end()
    })
}


path.set("/getBlogCount", getBlogCount)
path.set("/setBlog", setBlog)
path.set("/getBlog", getBlog)
path.set("/getHotBlogs", getHotBlogs)
path.set("/searchByKey", searchByKey)


module.exports.path = path

