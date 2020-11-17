const { config } = require('../../config/mysql_config');
import { Sequelize} from 'sequelize'
const isDevelopment = (process.env.NODE_ENV.trim())==='dev'
const sql_config=isDevelopment?config.mysqlConfigDev:config.mysqlConfigPrd;
console.log(sql_config)
const connection=new Sequelize(
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
export {
	connection
};
