let fs = require("fs")
let globalConf = {}
let conf = fs.readFileSync("./server.conf")
let confArr = conf.toString().trim().split("\r\n")

//拆分文件配置路径
for (let i = 0; i < confArr.length; i++) {
    if (confArr[i].split("=").length == 2) {
        globalConf[confArr[i].split("=")[0]] = confArr[i].split("=")[1]
    } else {
        continue
    }
}

module.exports = globalConf


