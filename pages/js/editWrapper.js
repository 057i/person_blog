//编辑文章实例和每日一句实例

let editArticle = new Vue({
    el: "#editWrapper",
    data: function () {
        return {
            curEditor: "",
            blogId: "",
            blogTitle: "",
            blohTags: "",
            everydayId: "",
            everydayAuthor: "",
            content: ""

        }

    },
    methods: {
        modifyBlog() {
            let data = {
                id: this.blogId,
                title: this.blogTitle,
                content: this.content
            }
            data = JSON.stringify(data)
            axios.post('/setBlog', data).then(function (res) {
                if (res.status === 200 && res.statusText === "OK") {
                    alert("修改成功")
                }
            })

        },
        addBlog() {

        },
        delBlog() {
            let data = {
                id: this.blogId
            }
            data = JSON.stringify(data)
            axios.post('/delblog', data).then(function (res) {
                if (res.status === 200 && res.statusText === "OK") {
                    alert("删除博客成功")
                }
            })

        },
        addEveryDay() {

        },
        modifyEveryDay() {
            let data = {
                id: this.everydayId,
                author: this.everydayAuthor,
                content: this.content
            }
            data = JSON.stringify(data)
            axios.post('/setEveryDay', data).then(function (res) {
                if (res.status === 200 && res.statusText === "OK") {
                    alert("修改每日一句成功")
                }
            })
        },
        delEveryDay() {
            let data = {
                id: this.everydayId
            }
            data = JSON.stringify(data)
            axios.post('/delEveryDay', data).then(function (res) {
                if (res.status === 200 && res.statusText === "OK") {
                    alert("删除每日一句成功")
                }
            })
        },
        modify() {
            if (this.curEditor = "博客编辑器") {
                this.modifyBlog()

            } else if (this.curEditor = "每日一句编辑器") {
                this.modifyEveryDay()

            }


        },
        delete() {
            if (this.curEditor = "博客编辑器") {
                this.delBlog()

            } else if (this.curEditor = "每日一句编辑器") {
                this.delEveryDay()

            }

        },
        changeText(e) {
            this.content = e.srcElement.innerText
        }


    },
    created() {
        //  判断是获取博客还是每日一句

        let paramsStr = location.search.slice(1).split("=")
        if (paramsStr[0] == "bid") {
            this.curEditor = "博客编辑器"
            let self = this
            //获取文章详细信息
            //获取文章详细信息
            axios.get(`/getBlogById?bid=${paramsStr[1]}`).then(function (res) {
                let result = res.data[0]
                self.blogId = result.id;
                self.blogTitle = result.title;
                self.blogTags = result.tags
                self.content = result.content
                console.log(res)
            })







        } else if (paramsStr[0] == "everydayId") {
            this.curEditor = "每日一句编辑器"

            let self = this
            //获取文章详细信息
            axios.get(`/getEveryDay?everydayId=${paramsStr[1]}`).then(function (res) {
                let result = res.data[0]
                self.everydayId = result.id;
                self.everydayTitle = result.title;
                self.content = result.content;
                self.everydayAuthor = result.author
                console.log(res)
            })


        }

    }

})


