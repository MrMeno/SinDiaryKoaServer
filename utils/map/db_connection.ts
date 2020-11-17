import Config from '../../config/mysql_config'
import { Sequelize} from 'sequelize'
const isPrd:Boolean = (process.env.NODE_ENV.trim())==='prd'
var sql_config=new Config(isPrd).config;
console.log()
const connection=new Sequelize(
sql_config.config.database,
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
