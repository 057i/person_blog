let mysql = require("mysql")

function createConnect() {
    return mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "123456",
        port: "3306",
        database: "person_blog"
    })
}

module.exports.createConnect = createConnect

