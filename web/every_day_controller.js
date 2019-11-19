let path = new Map()
let every_day_dao = require("../dao/EveryDayDao")
let getId = require("../utils/IdUtil")
let timer = require("../utils/timeUtil")


function getEveryDay(request, response) {
    every_day_dao.getEveryDay(function (result) {
        response.writeHead(200)
        response.write(JSON.stringify(result))//对象不能直接写回到页面，必须字符串
        // console.log(result)
        response.end()
    })
}

function setEveryDay(request, response) {
    request.on("data", function (data) {
        let content = JSON.parse(data)
        console.log(content.everyDayContent)
        every_day_dao.setEveryDay(content.everyDayContent, timer(), function (result) {
            response.writeHead(200)
            response.write("success添加成功")
            console.log("添加每日一句成功")
            response.end()

        })
    })
}

path.set("/getEveryDay", getEveryDay)
path.set("/setEveryDay", setEveryDay)

module.exports.path = path


