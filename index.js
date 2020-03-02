let globalConf = require("./config")
let express = require("express")
let loader = require("./loader")
let app = new express()


app.use(express.static(globalConf["pages_path"]))



// 每日一句相关接口
//每日一句
app.get("/addEveryDay", loader.get("/addEveryDay"))
app.get("/getEveryDay", loader.get("/getEveryDay"))
app.post("/setEveryDay", loader.get("/setEveryDay"))
app.post("/delEveryDay", loader.get("/delEveryDay"))
app.get('/getAllEveryDay', loader.get("/getAllEveryDay"))


// 博客文章相关接口

app.post("/addBlog", loader.get("/addBlog"))

app.post("/setBlog", loader.get("/setBlog"))

app.post("/delBlog", loader.get("/delBlog"))

app.get("/getBlog", loader.get("/getBlog"))

// 获取文章条数
app.get("/getBlogCount", loader.get("/getBlogCount"))

//文章详情页
app.get("/getBlogById", loader.get("/getBlogById"))

//热门博客
app.get("/getHotBlogs", loader.get("/getHotBlogs"))

//添加浏览次数
app.get("/addView", loader.get("/addView"))

//按关键字查找
app.get("/searchByKey", loader.get("/searchByKey"))




//标签相关接口
// app.get("/getTags", loader.get("/getTags"))
// app.post("/setTags", loader.get("/setTags"))
//随机标签云
app.get("/getRandomTags", loader.get("/getRandomTags"))

//获取全部标签
app.get("/getAllTags", loader.get("/getAllTags"))






//评论区相关接口
app.get("/getComments", loader.get("/getComments"))
app.post("/setComment", loader.get("/setComment"))
// app.get("/getCommentsCount", loader.get("/getCommentsCount"))
app.post("/delComment", loader.get("/delComment"))

//最新评论
app.get("/getNewComments", loader.get("/getNewComments"))



//随机验证码接口
app.get("/createRandomCode", loader.get("/createRandomCode"))


//站点地图接口
app.get("/getNewBlogs", loader.get("/getNewBlogs"))

//登录校验接口
app.post("/checkLogin", loader.get("/checkLogin"))




app.listen(globalConf["port"], function () {
    console.log("服务已启动")
})

