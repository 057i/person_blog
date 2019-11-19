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
    methods: {},
    computed: {},
    created() {
        let paramsStr = location.search.slice(1).split("=")
        console.log(paramsStr)

        //获取文章详细信息
        axios.get(`/getBlogById?bid=${paramsStr[1]}`).then(function (res) {
            let result = res.data[0]
            blogDetail.id = result.id;
            blogDetail.title = result.title;
            blogDetail.ctime = result.ctime;
            blogDetail.view = result.view;
            blogDetail.content = result.content
        })

        //增加浏览次数
        axios.get(`/addView?bid=${paramsStr[1]}`).then(function (res) {
            console.log(res)
        })


    }

})




