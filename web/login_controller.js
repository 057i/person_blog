let path = new Map()
let LoginDao = require("../dao/LoginDao")



// 登录验证
function checkLogin(request, response) {
    request.on("data", function (data) {
        let content = JSON.parse(data)
        LoginDao.checkLogin(content.username, function (result) {

            console.log(result, result.length)
            // if (result.length == 0) {

            //     let data = {
            //         checkLogin: false,
            //         reason: "用户名或密码错误"
            //     }
            //     data = JSON.stringify(data)
            //     response.writeHead(200)
            //     response.write(data)
            //     response.end()

            // } else {
            //     if (result[0].passwd === content.passwd) {
            //         let data = {
            //             checkLogin: true,
            //             reason: "验证成功"
            //         }
            //         data = JSON.stringify(data)
            //         response.writeHead(200)
            //         response.write(data)
            //         response.end()

            //     } else {
            //         let data = {
            //             checkLogin: false,
            //             reason: "用户名或密码错误"
            //         }
            //         data = JSON.stringify(data)
            //         response.writeHead(200)
            //         response.write(data)
            //         response.end()
            //     }
            // }

            response.writeHead(200)
            response.write(JSON.stringify(result))//对象不能直接写回到页面，必须字符串
            // console.log(result)
            response.end()


        })
    })
}



path.set("/checkLogin", checkLogin)


module.exports.path = path


