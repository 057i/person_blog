let globalConf = require("./config")
let express = require("express")
let loader = require("./loader")
let app = new express()


app.use(express.static(globalConf["pages_path"]))

//每日一句
app.get("/getEveryDay", loader.get("/getEveryDay"))
app.post("/setEveryDay", loader.get("/setEveryDay"))

//博客文章
app.post("/setBlog", loader.get("/setBlog"))
app.get("/getBlog", loader.get("/getBlog"))
app.get("/getBlogCount", loader.get("/getBlogCount"))


//标签
// app.get("/getTags", loader.get("/getTags"))
// app.post("/setTags", loader.get("/setTags"))


//文章详情页
app.get("/getBlogById", loader.get("/getBlogById"))


//评论区接口
app.get("/getComments", loader.get("/getComments"))
app.get("/setComment", loader.get("/setComment"))
app.get("/getCommentsCount", loader.get("/getCommentsCount"))


//随机验证码
app.get("/createRandomCode", loader.get("/createRandomCode"))


//站点地图
app.get("/getNewBlogs", loader.get("/getNewBlogs"))

//随机标签云
app.get("/getRandomTags", loader.get("/getRandomTags"))

//获取全部标签
app.get("/getAllTags", loader.get("/getAllTags"))

//最新评论
app.get("/getNewComments", loader.get("/getNewComments"))

//热门博客
app.get("/getHotBlogs", loader.get("/getHotBlogs"))

//添加浏览次数
app.get("/addView", loader.get("/addView"))

//按关键字查找
app.get("/searchByKey", loader.get("/searchByKey"))


app.listen(globalConf["port"], function () {
    console.log("服务已启动")
})

