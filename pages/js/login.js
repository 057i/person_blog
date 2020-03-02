// import axios from "axios"

let Login = new Vue({
    el: '#loginForm',
    data: function () {
        return {
            username: "",
            password: "",
            errMsg: ""
        }
    },
    methods: {
        checkLogin() {
            let data = {
                username: this.username,
                password: this.passwd
            }
            let self = this
            data = JSON.stringify(data)
            axios.post("/checkLogin", data).then((res) => {
                if (res.checkLogin === true) {
                    // 登陆成功

                } else {
                    self.errMsg = res.reason
                }
            })
            console.log(this.username, this.password)

        }

    }

})
