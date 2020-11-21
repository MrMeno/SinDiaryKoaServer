import Config from '../../config/config'
import { Sequelize } from 'sequelize-typescript'
import {sys_RoleBasic} from './sys_role_basic_table'


const isPrd:Boolean = (process.env.NODE_ENV.trim())==='prd'
var db_config=new Config(isPrd).config;
console.log(db_config)
const connection=new Sequelize(
	db_config.database,
	db_config.user,
	db_config.password,
	{
	dialect:db_config.dialect,
    host:db_config.host, 
	port:db_config.port,
	models: [sys_RoleBasic],
	pool: {
	    max: 5,
		min: 0,
		acquire:20000,
	    idle: 10000
	},
	define:{
		freezeTableName:true,
		timestamps:false,
	},
	timezone:"+8:00",


});
export {
	connection
};
