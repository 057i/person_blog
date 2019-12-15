//随机标签vue实例
let randomTags = new Vue({
    el: "#randomTags",
    data: {
        tags: ["git", "模拟飞行", "树莓派", "伤不起", "git", "模拟飞行", "树莓派", "伤不起", "git", "模拟飞行", "树莓派", "伤不起",
            "git", "模拟飞行", "树莓派", "伤不起",]
    },
    computed: {
        //渲染随机的标签颜色
        randomColor() {
            return function () {
                let red = Math.random() * 255
                let green = Math.random() * 255
                let blue = Math.random() * 255
                return `rgb(${red},${green},${blue})`
            }

        },
        //渲染随机字体大小
        randomFontSize: function () {
            // 疑问：computed里面的监听函数为什么要返回一个函数???
            return function () {
                let randomSize = Math.random() * 20 + 12 + "px"  //要记得写px
                return randomSize
            }
        }
    },
    created() {
        //ajax请求将标签数据拿过来
        axios.get("/getRandomTags").then(function (result) {
            let arr = []
            console.log(result.data)
            for (let i = 0; i < result.data.length; i++) {
                arr.push({ tagName: result.data[i].tagName, link: result.data[i].id })
            }
            console.log(arr)
            randomTags.tags = arr
        })
    }
})


//最近热门实例
let newHot = new Vue({
    el: "#hot",
    data: {
        hotList: []
    },
    computed: {},
    created() {
        axios.get("/getHotBlogs").then(function (res) {
            let result = []
            for (let i = 0; i < res.data.length; i++) {
                result.push({
                    title: res.data[i].title,
                    url: `/blog_detail.html?bid=${res.data[i].id}`
                })
            }
            newHot.hotList = result

        })

    }
})


//最新评论实例
let newComment = new Vue({
    el: "#newComment",
    data: {
        newCommentList: [
            {
                userName: "用户名",
                ctime: " 发布时间",
                commentContent: "使用码云git的webhook实现生产环境代"
            },
            {
                userName: "用户名",
                ctime: " 发布时间",
                commentContent: "使用码云git的webhook实现生产环境代"
            },
            {
                userName: "用户名",
                ctime: " 发布时间",
                commentContent: "使用码云git的webhook实现生产环境代"
            },
            {
                userName: "用户名",
                ctime: " 发布时间",
                commentContent: "使用码云git的webhook实现生产环境代"
            },
            {
                userName: "用户名",
                ctime: " 发布时间",
                commentContent: "使用码云git的webhook实现生产环境代"
            }
        ]
    },
    computed: {},
    created() {
        axios.get("/getNewComments").then(function (res) {
            let result = []
            for (let i = 0; i < res.data.length; i++) {
                result.push({
                    userName: res.data[i].user_name,
                    ctime: res.data[i].ctime,
                    commentContent: res.data[i].comment
                })
            }
            newComment.newCommentList = result
        })
    }
})


//评论实例
let commentArea = new Vue({
    el: "#commentsArea",
    data: {
        commentList: [],
        count: 0,//页面品论总数
        vcode: "",// 存储验证码
        vImg: "",//随机验证码图片
        replayParent: null
    },

    computed: {
        //computed监听多个属性，watch只监听一个

        //设置评论
        sendComment() {
            return function () {
                let parent;
                let paramsStr = location.search.slice(1).split("=")
                let blog_id;

                console.log(location.pathname === "/about.html")
                console.log(commentArea.replayParent, location.pathname)

                //判断当前回复是对页面的还是个人的
                if (!commentArea.replayParent) {
                    // 关于页面
                    if (location.pathname === "/about.html") {
                        //关于页
                        parent = -2
                        blog_id = -2

                    } else if (location.pathname === "/guesthook.html") {
                        //留言页
                        parent = -1
                        blog_id = -1
                    } else {
                        blog_id = paramsStr[1]
                        parent = -paramsStr[1]
                    }


                } else {

                    // 个人
                    parent = commentArea.replayParent
                    parent = -paramsStr[1]

                }


                let user_name = document.getElementById("creator").value

                let email = document.getElementById("creator-email").value
                let comment = document.getElementById("submit_content").value
                let applyCode = document.getElementById("check_inp").value

                //判断验证码
                //动态拼接正则
                let applyStr = new RegExp(`${commentArea.vcode}`, "i")
                if (applyCode.match(applyStr) !== null) {
                    axios.get(`/setComment?blog_id=${blog_id}&parent=${parent}&user_name=${user_name}&comment=${comment}&email=${email}`)
                        .then(function (res) {
                            if (res != null) {
                                console.log("添加新回复成功")
                                console.log(res)

                                document.getElementById("creator").value = ""
                                document.getElementById("creator-email").value = ""
                                document.getElementById("submit_content").value = ""
                                document.getElementById("check_inp").value = ""
                                parent = -paramsStr[1]//将回复变成页面的回复

                            }

                        })
                } else {
                    alert("验证码错了")
                    commentArea.createRandomCode()
                }


            }
        },

        //初始化验证码
        createRandomCode() {
            return function () {
                axios.get("/createRandomCode").then(function (res) {
                    commentArea.vcode = res.data.text
                    commentArea.vImg = res.data.data
                })
            }
        },

        //设置回复
        reply() {
            //返回一个函数，接收到的参数都是在这个函数中
            return function (id, username) {
                location.href += "#submit-comment-area"//点击评论跳转回复区域
                commentArea.replayParent = id;
                // commentArea.replayUserName = username

                console.log(commentArea.replayParent)

            }
        }

    },
    created() {
        //初始化评论区,判断是否是留言模块或者是关于模块的评论


        let bid;
        if (location.pathname === "/about.html") {
            bid = -2

        } else if (location.pathname === "/guesthook.html") {
            bid = -1
        } else {
            //关于某条博客页面的评论
            let paramsStr = location.search.slice(1).split("=")
            bid = paramsStr[0]
        }


        axios.get("/getComments?bid=" + bid).then(function (res) {

            let result = []
            for (let i = 0; i < res.data.length; i++) {
                result.push(res.data[i])
                for (let j = 0; j < res.data.length; j++) {
                    if (res.data[j].parent == res.data[i].id) {
                        res.data[j].options = res.data[i].user_name
                    }
                }
            }
            console.log(result)
            commentArea.commentList = result


        })

        //初始化评论条数
        axios.get(`/getCommentsCount?parent=${bid}`).then(function (res) {
            commentArea.count = res.data[0]["count(*)"]
        })

        // 初始化svg验证码
        axios.get("/createRandomCode").then(function (res) {
            commentArea.vcode = res.data.text
            commentArea.vImg = res.data.data
        })
    }
})


//搜索框按标题搜索实例
let searchBar = new Vue({
    el: "#searchBar",
    data: {
        key: ""
    },
    computed: {
        setSearchKey(e) {
            return function () {
                console.log(searchBar.key)
                //将搜索映射到url
                location.href = location.href + `?key=${searchBar.key}`
            }
        }
    },


    created() {

    }


})



//导航栏实例
let NavBar = new Vue({
    el: "#navMenu",
    methods: {
        //跳转至主站点
        jumpTo_MyWebSite: function () {
            location.href = "http://www.fz12580.cn"
        }
    }
})




