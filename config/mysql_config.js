const mysql = require('mysql')

const mysqlConfig= {
    user: "merio_db",
    password: "Merio2020",
    database: "merio_db",
    host:"localhost",//外网连接
    port: 3306
}

module.exports = mysqlConfig