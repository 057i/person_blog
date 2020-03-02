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

function addEveryDay(request, response) {
    request.on("data", function (data) {
        let content = JSON.parse(data)
        every_day_dao.addEveryDay(content.author, content.content, timer(), function (result) {
            response.writeHead(200)
            response.write("添加每日一句成功")
            console.log("添加每日一句成功")
            response.end()

        })
    })
}

// 修改每日一句
function setEveryDay(request, response) {
    request.on("data", function (data) {
        let content = JSON.parse(data)
        every_day_dao.setEveryDay(content.id, content.author, content.content, timer(), function (result) {
            response.writeHead(200)
            response.write("修改每日一句成功")
            console.log("修改每日一句成功")
            response.end()

        })
    })
}


// 删除每日一句
function delEveryDay(request, response) {
    request.on("data", function (data) {
        let content = JSON.parse(data)
        every_day_dao.delEveryDay(content.id, function (result) {
            response.writeHead(200)
            response.write("删除每日一句成功")
            console.log("删除每日一句成功")
            response.end()

        })
    })
}



function getAllEveryDay(request, response) {
    every_day_dao.getAllEveryDay(function (result) {
        response.writeHead(200)
        response.write(JSON.stringify(result))//对象不能直接写回到页面，必须字符串
        // console.log(result)
        response.end()
    })
}

path.set("/getEveryDay", getEveryDay)
path.set("/setEveryDay", setEveryDay)
path.set("/getAllEveryDay", getAllEveryDay)
path.set("/addEveryDay", addEveryDay)
path.set("/delEveryDay", delEveryDay)

module.exports.path = path


