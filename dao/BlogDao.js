let dbUtil = require("./dbUtail")

//设置博客
function setBlog(title, content, ctime, view, tags, utime, success) {
    let connection = dbUtil.createConnect()
    let queryStr = "insert into blogs(title,content,ctime,view,tags,utime) values(?,?,?,?,?,?)"
    connection.connect()
    connection.query(queryStr, [title, content, ctime, view, tags, utime], function (err, result) {
        if (err === null) {
            success(result)
        } else {
            console.log(err)
        }
    })
    connection.end()
}

//从数据库中调取博客id
function getBlogId(title, content, ctime, success) {
    let connection = dbUtil.createConnect()
    let queryStr = "select id from blogs where title=? and content=? and ctime=?"
    connection.connect()

    connection.query(queryStr, [title, content, ctime], function (err, result) {

        if (err === null) {
            //当数据库查询没有错的时候，因为数据库查询需要时间，可能没有那么快响应，所以当有值的时候才返回
            if (result[0].id) {
                success(result[0].id)
            }
        } else {
            console.log(err)
        }
    })
    connection.end()
}

//数据库中获取当前页应展示的的博客文章
function getBlog(page, pageSize, success) {

    let connection = dbUtil.createConnect()
    let queryStr = "select * from blogs order by ctime desc limit ?,?"
    connection.connect()
    connection.query(queryStr, [Number(page), Number(pageSize)], function (err, result) {
        if (err === null) {
            success(result)
        } else {
            console.log(err)
        }
    })
    connection.end()
}


//获取文章总数
function getBlogCount(success) {
    let connection = dbUtil.createConnect()
    let queryStr = "select count(*) from blogs"
    connection.connect()
    connection.query(queryStr, function (err, result) {
        console.log(result)
        if (err === null) {
            success(result)
        } else {
            console.log(err)
        }
    })
    connection.end()
}


//根据博客id获取博客详情
function getBlogById(blogId, success) {

    let connection = dbUtil.createConnect()
    let queryStr = "select * from blogs where id = ?"
    connection.connect()
    connection.query(queryStr, [blogId], function (err, result) {
        if (err === null) {
            success(result)
        } else {
            console.log(err)
        }
    })
    connection.end()
}


//获取最新文章
function getNewBlogs(limit, success) {
    let connection = dbUtil.createConnect()
    let queryStr = "select * from blogs order by ctime desc limit ?"
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


//获取最新文章
function getHotBlogs(limit, success) {
    let connection = dbUtil.createConnect()
    let queryStr = "select * from blogs order by view desc limit ?"
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


//添加浏览次数
function addView(id, success) {
    let connection = dbUtil.createConnect()
    let queryStr = "update blogs set view=view+1 where id=?"
    connection.connect()
    connection.query(queryStr, [id], function (err, result) {
        if (err === null) {
            success(result)
        } else {
            console.log(err)
        }
    })
    connection.end()
}


//按标题查找博客
function searchByKey(key, page, pageSize, success) {
    let connection = dbUtil.createConnect()
    let queryKey = `%${key}%`
    let queryStr = "select * from blogs where title like ? order by ctime desc limit ?,?"
    connection.connect()
    connection.query(queryStr, [queryKey, (page - 1) * pageSize, page * pageSize], function (err, result) {
        if (err === null) {
            success(result)
        } else {
            console.log(err)
        }
    })
    connection.end()
}


module.exports = {
    setBlog: setBlog,
    getBlog: getBlog,
    getBlogId: getBlogId,
    getBlogCount: getBlogCount,
    getBlogById: getBlogById,
    getNewBlogs: getNewBlogs,
    getHotBlogs: getHotBlogs,
    addView: addView,
    searchByKey: searchByKey
}


