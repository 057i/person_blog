//文章详情实例
let blogDetail = new Vue({
    el: "#blog_detail",
    data: {
        title: "",
        author: "",
        ctime: null,
        view: 0,
        content: ""
    },
    methods: {
        //格式化时间函数
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
    created() {
        let paramsStr = location.search.slice(1).split("=")
        let self = this

        //获取文章详细信息
        axios.get(`/getBlogById?bid=${paramsStr[1]}`).then(function (res) {
            let result = res.data[0]
            blogDetail.id = result.id;
            blogDetail.title = result.title;
            blogDetail.ctime = self.formatDate(result.ctime);
            blogDetail.view = result.view;
            blogDetail.content = result.content
        })

        //增加浏览次数
        axios.get(`/addView?bid=${paramsStr[1]}`).then(function (res) {
            console.log(res)
        })


    }

})




