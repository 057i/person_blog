//每日一句实例

let everyDay = new Vue({
    el: "#every-day",
    data: {
        content: "",
        author: ""
    },
    computed: {
        getContent() {
            return this.content
        }
    },
    created: function () {

        //组件创建的时候发送ajax请求
        let self = this
        axios.get("/getEveryDay").then(function (res) {
            self.content = res.data[0].content
            self.author = res.data[0].author
        })
    },

})


//文章列表实例
let articleList = new Vue({
    el: "#articleList",
    data: {
        list: [],
        curPage: 1,
        pageSize: 5,
        totalPage: 0,
        pageNumberList: [],
        totalCount: 0


    },
    methods: {
        setCurPage(index) {
            this.curPage = index + 1
            console.log(index + 1)
            this.getTurnPage()
            this.getContent()

        },
        setMovePage(index) {
            console.log(index)
            if (index == 1 && this.curPage + index <= this.totalPage) {
                this.curPage = this.curPage + index
                this.getTurnPage()
                this.getContent()

            } else if (index == -1 && this.curPage + index != 0) {
                this.curPage = this.curPage + index
                this.getTurnPage()
                this.getContent()
            } else {
                return
            }
        },
        formatDate(time) {
            var now = new Date(time);
            var year = now.getFullYear();  //取得4位数的年份
            console.log(now)
            var month = now.getMonth() + 1;  //取得日期中的月份，其中0表示1月，11表示12月
            var date = now.getDate();      //返回日期月份中的天数（1到31）
            var hour = now.getHours();     //返回日期中的小时数（0到23）
            var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
            var second = now.getSeconds(); //返回日期中的秒数（0到59）
            return year + "-" + month + "-" + date + " " + hour + ":" + minute
        }

    },
    computed: {
        //获取内容
        getContent() {
            let self = this
            return function () {

                //截取url中的关键字key,以后用正则获取
                let expStr = /(key=)?=\w+/g
                let url = location.href

                //判断url有搜索值的情况
                if (url.match(expStr)) {
                    self.searchKey = url.match(expStr)[0].slice(1)
                    console.log(self.searchKey)
                }

                //如果有搜索值，按搜索值查找翻页，否则，按照正常来
                if (self.searchKey) {
                    axios.get(`/searchByKey?key=${self.searchKey}&page=${self.curPage}&pageSize=${self.pageSize}`).then(function (res) {
                        console.log(res)
                        self.list = res.data

                    })

                } else {
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

                        console.log(res.data, 999998)
                        self.list = res.data
                    })
                }
                document.documentElement.scrollTop = 0

            }
        },
        //获取翻页
        getTurnPage() {
            return function () {
                let result = []
                let totalPage = Math.ceil(this.totalCount / this.pageSize)

                if (totalPage <= 4) {
                    for (let i = 1; i <= 4; i++) {
                        result.push({text: i, val: i})
                    }
                } else {
                    if (this.curPage > 2) {
                        result.push({text: this.curPage - 2, val: this.curPage - 2})
                    }
                    if (this.curPage > 1) {
                        result.push({text: this.curPage - 1, val: this.curPage - 1})
                    }
                    result.push({text: this.curPage, val: this.curPage})

                    console.log(this.curPage, (totalPage + this.pageSize - 1) / this.pageSize)


                    //判断倒数最后一页
                    if (this.curPage + 1 <= (totalPage + this.totalCount - 1) / this.pageSize) {
                        result.push({text: this.curPage + 1, val: this.curPage + 1})
                    }
                    //判断倒数最后两页
                    if (this.curPage + 2 <= (totalPage + this.totalCount - 1) / this.pageSize) {
                        result.push({text: this.curPage + 2, val: this.curPage + 2})

                    }

                }


                console.log(result, this.curPage, totalPage, this.totalCount)
                this.pageNumberList = result
            }

        },
        //获取总页数
        getToTalPage() {
            let self = this
            return function () {
                axios.get("/getblogcount").then(function (res) {
                    self.list = res.data
                    self.totalCount = res.data["count(*)"]
                    self.totalPage = Math.ceil(self.totalCount / self.pageSize)
                    console.log("总页数", self.totalPage, self.pageSize, res, res.data["count(*)"])
                })
            }
        }
    },


    created() {
        //初始化的时候
        // 拿到当前页数和页面大小发送ajax请求
        //渲染翻页容器数据
        this.getToTalPage()
        this.getContent()
        this.getTurnPage()
    }
})



