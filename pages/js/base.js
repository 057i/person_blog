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
            // console.log(result.data)
            for (let i = 0; i < result.data.length; i++) {
                arr.push({tagName: result.data[i].tagName, link: result.data[i].id})
            }
            // console.log(arr)
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
            // {
            //     userName: "用户名",
            //     ctime: " 发布时间",
            //     commentContent: "使用码云git的webhook实现生产环境代"
            // }
        ]
    },
    created() {
        let self = this
        axios.get("/getNewComments").then(function (res) {
            let result = []
            for (let i = 0; i < res.data.length; i++) {
                result.push({
                    userName: res.data[i].user_name,
                    ctime: self.formatDate(res.data[i].ctime),
                    commentContent: res.data[i].comment
                })
            }
            newComment.newCommentList = result
        })
    },
    methods: {
        formatDate(time) {
            var now = new Date(time);
            var year = now.getFullYear();  //取得4位数的年份
            // console.log(now)
            var month = now.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
            var date = now.getDate();      //返回日期月份中的天数（1到31）
            var hour = now.getHours();     //返回日期中的小时数（0到23）
            var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
            var second = now.getSeconds(); //返回日期中的秒数（0到59）
            return year + "-" + month + "-" + date + " " + hour + ":" + minute
        }
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
        section: null,
        parent: null,
        blodId: null
    },
    methods: {
        //格式化请求回来的数组数据的时间
        format(arr) {
            let newArr = []
            let self = this
            for (let i = 0; i < arr.length; i++) {
                newArr[i] = {}
                for (let j in arr[i]) {

                    if (j == "ctime" || j == "utime") {
                        newArr[i][j] = self.formatDate(arr[i][j])
                    } else {
                        newArr[i][j] = arr[i][j]
                    }
                }
            }
            return newArr

        },
        //格式化时间函数
        formatDate(time) {
            var now = new Date(time);
            var year = now.getFullYear();  //取得4位数的年份
            // console.log(now)
            var month = now.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
            var date = now.getDate();      //返回日期月份中的天数（1到31）
            var hour = now.getHours();     //返回日期中的小时数（0到23）
            var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
            var second = now.getSeconds(); //返回日期中的秒数（0到59）
            return year + "-" + month + "-" + date + " " + hour + ":" + minute
        },
        initialComments(section) {

            //初始化评论
            let self = this
            axios.get("/getComments?section=" + section).then(function (res) {

                let result = []
                for (let i = 0; i < res.data.length; i++) {
                    result.push(res.data[i])
                    for (let j = 0; j < res.data.length; j++) {
                        if (res.data[j].parent == res.data[i].id) {
                            res.data[j].options = res.data[i].user_name
                        }
                    }
                }
                console.log(result, 6786875)
                commentArea.commentList = self.format(result)
                //初始化评论条数
                commentArea.count = commentArea.commentList.length
            })
        },
        initialCheck() {
            //初始化验证码区域
            // 初始化svg验证码
            axios.get("/createRandomCode").then(function (res) {
                commentArea.vcode = res.data.text
                commentArea.vImg = res.data.data
            })
        }
    },

    computed: {
        //computed监听多个属性，watch只监听一个

        //设置评论
        sendComment() {
            let self = this
            return function () {

                //正则判断当前回复是对页面的还是个人的，看看url是否有parent属性
                let hasParent = location.hash.match(/(?<=parent=)\d*/)

                //正则判断当前页面是博客详情页还是其他页面
                let isBlogPage = location.href.match(/(?<=bid=)\d*/)
                console.log(hasParent, isBlogPage, 90)


                if (!isBlogPage) {

                    //parent不存在，表示关于页面的评论，否则就是针对用户评论
                    // 关于页面
                    if (location.pathname === "/about.html" && !hasParent) {
                        //关于页
                        self.section = -2
                        self.parent = -2
                        self.blogId = -2

                    } else if (location.pathname === "/about.html" && hasParent) {
                        //关于页
                        self.section = -2
                        self.parent = hasParent[0]
                        self.blogId = -2

                    } else if (location.pathname === "/guesthook.html" && !hasParent) {
                        //留言页
                        self.section = -1
                        self.parent = -1
                        self.blogId = -1
                    } else if (location.pathname === "/guesthook.html" && hasParent) {
                        //留言页
                        self.section = -1
                        self.parent = hasParent[0]
                        self.blogId = -1
                    }


                } else {
                    //博客详情页评论
                    if (!hasParent) {
                        //关于博客评论
                        self.section = isBlogPage[0]
                        self.parent = isBlogPage[0]
                        self.blogId = isBlogPage[0]

                    } else {
                        //关于回复评论
                        self.section = isBlogPage[0]
                        self.parent = hasParent[0]
                        self.blogId = isBlogPage[0]
                        console.log(self.section, self.parent, self.blogId)

                    }
                }

                //置空表格
                let user_name = document.getElementById("creator").value
                let email = document.getElementById("creator-email").value
                let comment = document.getElementById("submit_content").value
                let applyCode = document.getElementById("check_inp").value

                //判断验证码
                //动态拼接正则
                let applyStr = new RegExp(`${commentArea.vcode}`, "i")
                if (applyCode.match(applyStr) !== null) {
                    axios.get(`/setComment?blog_id=${self.blogId}&parent=${self.parent}&section=${self.section}&user_name=${user_name}&comment=${comment}&email=${email}`)
                        .then(function (res) {
                            if (res != null) {
                                alert("添加新回复成功")

                                document.getElementById("creator").value = ""
                                document.getElementById("creator-email").value = ""
                                document.getElementById("submit_content").value = ""
                                document.getElementById("check_inp").value = ""

                                //添加回复成功后再获取一次评论信息
                                // self.initialComments(section)
                                //
                                // //初始化验证码
                                // self.initialCheck(section)


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
            return function (id) {

                //点击评论跳转回复区域，参数分别为stateObject,title,url
                history.replaceState(null, '', `${location.pathname}#submit-comment-area?${location.search}parent=${id}`);

            }
        }

    },
    created() {
        //置空url
        history.replaceState(null, '', location.pathname + location.search);


        //初始化评论区,判断是否是留言模块或者是关于模块的评论

        let section;
        if (location.pathname === "/about.html") {
            section = -2

        } else if (location.pathname === "/guesthook.html") {
            section = -1
        } else {
            //关于某条博客页面的评论
            let paramsStr = location.search.slice(1).split("=")
            section = paramsStr[1]
        }
        console.log(section)
        //初始化评论
        this.initialComments(section)

        //初始化验证码
        this.initialCheck(section)

    }
})


//搜索框按标题搜索实例(bug)
let searchBar = new Vue({
    el: "#searchBar",
    data: {
        key: ""
    },
    computed: {
        setSearchKey() {
            return function () {
                //将搜索映射到url
                if (searchBar.key != "") {
                    console.log(searchBar.key, location.href)
                    location.href = location.origin + `/?searchByWord=true&key=${searchBar.key}`
                    console.log(searchBar.key)
                } else {
                    history.pushState("", "", `/?searchByWord=false&page=1`);
                    articleList.getToTalPage()
                    articleList.getContent()
                }


            }
        }
    },
    created() {
        let params = location.search.split("").slice(1).join("");
        let searchKey = params.match(/(?<=key\=)\w+(?=\&)*/)
        console.log("搜索词", searchKey[0])
        this.key = searchKey[0]
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




