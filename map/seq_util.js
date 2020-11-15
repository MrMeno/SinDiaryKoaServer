const { config } = require('../config/mysql_config');
var Sequelize=require('Sequelize');
const sql_config=process.env.NODE_ENV === 'dev' ? config.mysqlConfigDev: config.mysqlConfigPrd;
console.log(sql_config)
var connection=new Sequelize(
sql_config.database,
sql_config.user,
sql_config.password,
{
    host:sql_config.host, 
    dialect: sql_config.dialect,
    port:sql_config.port
});
module.exports=connection;
