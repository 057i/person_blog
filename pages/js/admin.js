//管理员管理实例

let adminPage = new Vue({
    el: "#manager",
    data: function () {
        return {
            tab: 4,
            list: [],
            curPage: 1,
            pageSize: 5,
            totalPage: 0,
            pageNumberList: [],
            totalCount: 0,
            commentList: [],
            count: 0,
            everydayList: [],
            replayIndex: null,
            replayNum: 0,
            replayContent: ""
        }
    },
    methods: {
        // 切换标签
        nextTab(val) {
            this.tab = val

            if (val == 1) {
                window.history.pushState(null, null, "/admin.html?operation=add_everyday")
            } else if (val == 2) {
                window.history.pushState(null, null, "/admin.html?operation=edit_everyday")

            } else if (val == 3) {
                window.history.pushState(null, null, "/admin.html?operation=add_blog")

            } else if (val == 4) {
                window.history.pushState(null, null, "/admin.html?operation=edit_everyday")

            } else if (val == 5) {
                //两个留言页数据切换 
                this.initialComments(-2)//关于页
                window.history.pushState(null, null, "/admin.html?operation=edit_aboutMe")

            } else if (val == 6) {
                this.initialComments(-1)
                window.history.pushState(null, null, "/admin.html?operation=edit_guesthook")

            }

        },
        // 每日一句相关函数
        addNewEveryday() {

        },
        editEveryDay(id) {

        },
        delEveryDay(id) {
            console.log(id)
            let data = {
                id: id
            }
            data = JSON.stringify(data)
            axios.post('/delEveryDay', data).then(function (res) {
                if (res.status === 200 && res.statusText === "OK") {
                    alert("删除成功")
                }
            })
        },


        // 博客相关函数
        setCurPage(index) {
            console.log("setCurPage")
            this.curPage = index + 1
            // console.log(index + 1)
            this.getTurnPage()
            this.getContent()
            document.documentElement.scrollTop = 0

        },
        setMovePage(index) {
            console.log("setMovePage", index)
            if (index == 1 && this.curPage + index <= this.totalPage) {
                this.curPage = this.curPage + index
                this.getTurnPage()
                this.getContent()

            } else if (index == -1 && this.curPage + index != 0) {
                this.curPage = this.curPage + index
                this.getTurnPage()
                this.getContent()
            } else {
                // this.getTurnPage()
                return
            }
            document.documentElement.scrollTop = 0
        },
        // 格式化时间函数
        formatDate(time) {
            var now = new Date(time);
            var year = now.getFullYear();  //取得4位数的年份
            var month = now.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
            var date = now.getDate();      //返回日期月份中的天数（1到31）
            var hour = now.getHours();     //返回日期中的小时数（0到23）
            var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
            var second = now.getSeconds(); //返回日期中的秒数（0到59）
            return year + "-" + month + "-" + date + " " + hour + ":" + minute
        },
        addNewBlog() {

        },
        editBlog() {

        },
        delBlog() {

        },

        // 随机标签函数
        addNewTag() {

        },
        editTag() {

        },
        delTag() {
            // 判定没有使用过才可以删除

        },




        // 关于页评论函数
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
        // 载入评论数据
        initialComments(section) {

            //初始化评论条数
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

                self.commentList = self.format(result)

                //初始化评论条数
                self.count = self.commentList.length
            })
        },
        getEveryDayList() {
            let self = this
            axios.get("/getAllEveryDay").then(res => {
                self.everydayList = res.data
            })
        },



        // 留言页和关于我留言回复
        // reply(index) {
        //     this.replayNum = this.replayNum + 1
        //     this.replayIndex = index
        // }

        delComment(id) {
            let self = this
            let data = {
                id
            }
            data = JSON.stringify(data)
            axios.post("/delComment", data).then(res => {
                if (res.status === 200 && res.statusText === "OK") {
                    alert("删除评论成功")

                    if (self.tab == 5) {
                        self.initialComments(-2)
                    } else if (self.tab == 6) {
                        self.initialComments(-1)

                    }

                }

            })

        }









    },
    computed: {
        //获取内容
        getContent() {
            console.log("getContent")
            let self = this
            return function () {
                let searchParamsStr = location.search
                searchParamsStr = (searchParamsStr == "") ? searchParamsStr : searchParamsStr.split("").slice(1).join("")


                //没有搜索的情况
                if (searchParamsStr.indexOf("searchByWord=true") < 0) {

                    axios.get(`/getBlog?page=${self.curPage}&pageSize=${self.pageSize}`).then(function (res) {
                        let result
                        for (let i = 0; i < res.data.length; i++) {
                            for (let j in res.data[i]) {
                                if (j == "ctime") {
                                    res.data[i][j] = self.formatDate(res.data[i][j])
                                }
                                if (j == "utime") {
                                    res.data[i][j] = self.formatDate(res.data[i][j])
                                }

                            }

                        }
                        // console.log(res.data, 999998)


                        self.list = res.data
                    })

                } else {
                    //有搜索的情况
                    axios.get(`/getBlog?page=${self.curPage}&pageSize=${self.pageSize}&${searchParamsStr}`).then(function (res) {

                        let result
                        for (let i = 0; i < res.data.length; i++) {
                            for (let j in res.data[i]) {
                                if (j == "ctime") {
                                    res.data[i][j] = self.formatDate(res.data[i][j])
                                }
                                if (j == "utime") {
                                    res.data[i][j] = self.formatDate(res.data[i][j])
                                }
                            }

                        }
                        // console.log(res.data, 999998)
                        self.list = res.data
                    })


                }


            }


        },
        //获取翻页
        getTurnPage() {
            return function () {
                // console.log("getTurnPage")
                let result = []
                let totalPage = Math.ceil(this.totalCount / this.pageSize)

                if (totalPage <= 4) {
                    for (let i = 1; i <= totalPage; i++) {
                        result.push({ text: i, val: i })
                    }
                } else {
                    if (this.curPage > 2) {
                        result.push({ text: this.curPage - 2, val: this.curPage - 2 })
                    }
                    if (this.curPage > 1) {
                        result.push({ text: this.curPage - 1, val: this.curPage - 1 })
                    }
                    result.push({ text: this.curPage, val: this.curPage })

                    // console.log(this.curPage, (totalPage + this.pageSize - 1) / this.pageSize)


                    //判断倒数最后一页
                    if (this.curPage + 1 <= (totalPage + this.totalCount - 1) / this.pageSize) {
                        result.push({ text: this.curPage + 1, val: this.curPage + 1 })
                    }
                    //判断倒数最后两页
                    if (this.curPage + 2 <= (totalPage + this.totalCount - 1) / this.pageSize) {
                        result.push({ text: this.curPage + 2, val: this.curPage + 2 })
                    }
                }


                // console.log(result, this.curPage, totalPage, this.totalCount, 99990000)
                this.pageNumberList = result
            }

        },
        //获取总页数
        getToTalPage() {
            let self = this
            return function () {
                // console.log("getToTalPage")
                let paramsStr = location.search.split("").slice(1).join("")
                // console.log(paramsStr, 555777)
                axios.get(`/getblogcount?${paramsStr}`).then(function (res) {
                    self.list = res.data
                    self.totalCount = res.data["count(*)"]
                    self.totalPage = Math.ceil(self.totalCount / self.pageSize)
                    console.log("总页数", self.totalPage, self.pageSize, res, res.data["count(*)"])

                    //回调获取翻页数据
                    self.getTurnPage()
                })
            }
        }
    },
    watch: {
        //监听当前页码变化，则无刷新更新url
        curPage: (newVal) => {
            let url = window.location.href;
            let params = location.search.split("").slice(1).join("")

            url = url.replace(/page\=\d+/, `page=${articleList.curPage}`)
            console.log(url)

            history.replaceState("", "", url);
        }


    },
    created() {

        //初始化的时候
        // 拿到当前页数和页面大小发送ajax请求
        //渲染翻页容器数据
        this.getToTalPage()
        this.getContent()
        this.getEveryDayList()
        window.history.replaceState(null, null, "?operation=edit_blog")

    }

})

