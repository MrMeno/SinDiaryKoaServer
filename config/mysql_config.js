const mysql = require('mysql')
class Config{
     mysqlConfigDev= {
        user: "root",
        password: "",
        database: "python_test_grap",
        host:"localhost",//外网连接
        port: 3306,
        dialect:'mysql'
    }
     mysqlConfigPrd= {
        user: "merio_db",
        password: "Merio_20",
        database: "merio_db",
        host:"rm-2zed76hhd8hls6x68ro.mysql.rds.aliyuncs.com",//外网连接
        port: 3306,
        dialect:'mysql'
    }
}
var config=new Config();
module.exports = {
    config
}