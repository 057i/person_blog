let globalConf = require("./config")
let fs = require("fs")
let pathMap = new Map()
let controllerSet = []
let pagesFiles = fs.readdirSync(globalConf["web_path"])

//将全局的pages下的文件做成映射
for (let i = 0; i < pagesFiles.length; i++) {
    let temp = require(`./${globalConf["web_path"]}/${pagesFiles[i]}`)
    if (temp.path) {
        for (let [key, value] of temp.path) {
            if (pathMap.get(key) == null) {
                pathMap.set(key, value)
            } else {
                throw new Error("url path异常,url:" + key)
            }
            controllerSet.push(temp)
        }
    }
}

module.exports = pathMap

