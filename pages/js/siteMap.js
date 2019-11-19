let siteMap = new Vue({
    el: "#siteMapContent",
    data: {
        siteMapList: []
    },
    computed: {},
    created() {
        axios.get("/getNewBlogs").then(function (res) {
            let result = []
            for (let i = 0; i < res.data.length; i++) {
                result.push({link: `/blog_detail.html?bid=${res.data[i].id}`, title: res.data[i].title})

            }
            console.log(result)
            siteMap.siteMapList = result

        })
    }
})
