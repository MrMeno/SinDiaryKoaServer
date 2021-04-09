import { Sequelize } from 'sequelize-typescript'
//import{sys_RoleBasic}from'./sys_role_basic_table'
//import{tb_appInfo}from'./tb_app_info'
import { gc_host } from './gocrondb/gc_host'
import { gc_task } from './gocrondb/gc_task'
import { dbInfo } from '../../config/config.base';
const createConection = (db_config: dbInfo) => {
    //constisPrd:Boolean=(process.env.NODE_ENV.trim())==='prd'
    //vardb_config=newConfig(isPrd).config;
    console.log(db_config);
    return new Sequelize(
        db_config.database,
        db_config.user,
        db_config.password,
        {
            dialect: db_config.dialect,
            host: db_config.host,
            port: db_config.port,
            models: [
                gc_host,
                gc_task,
            ],
            pool: {
                max: 100,
                min: 0,
                acquire: 20000,
                idle: 10000
            },
            define: {
                freezeTableName: true,
                timestamps: false,
            },
            timezone: "+8:00",
        });
}
export {
    createConection
};