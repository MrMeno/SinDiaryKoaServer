const compose = require('koa-compose');
const Koa = require('koa');
const app = module.exports = new Koa();
var mysql = require('mysql');
var config = require('./config/default.js')

var create_database_connection=(username,password)=>{
    return mysql.createPool({
        host     : config.databaseConfig.host,
        port     : config.databaseConfig.port,
        user     : username,
        password : password,
        database : config.databaseConfig.database
      });
}

var pool= create_database_connection("merio_db","Merio2020");

class Mysql {
    constructor () {

    }
    query () {
      return new Promise((resolve, reject) => {
        pool.query('select * from wx_user_info', function (error, results, fields) {
            if (error) {
                throw error
            };
            resolve(results)
        });
      })
       
    }
}

var sql=new Mysql();
app.use(async (ctx) => {
    let data = await sql.query()
    ctx.body = {
        "code": 1,
        "data": data,
        "mesg": 'ok'
    }
    console.log(data)
})
app.listen(config.koaServerConfig.port)
console.log(`listening on port ${config.koaServerConfig.port}`)