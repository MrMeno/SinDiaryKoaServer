const { config } = require('../../config/mysql_config');
require('process');
var Sequelize=require('Sequelize');
const isDevelopment = (process.env.NODE_ENV.trim())==='dev'
const sql_config=isDevelopment?config.mysqlConfigDev:config.mysqlConfigPrd;
console.log(sql_config)
var connection=new Sequelize(
sql_config.database,
sql_config.user,
sql_config.password,
{
    host:sql_config.host, 
    dialect: sql_config.dialect,
    port:sql_config.port,
	pool: {
	    max: 5,
	    min: 0,
	    idle: 10000
	  },
});
module.exports=connection;
