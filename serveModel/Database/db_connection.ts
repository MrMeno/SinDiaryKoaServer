import { Sequelize } from 'sequelize-typescript'
import { gc_host } from './gocrondb/gc_host'
import { gc_task } from './gocrondb/gc_task'
import { dbInfo,ConfigCollection } from '../../config/config.base';
import getConfig from '../../config';

const baseConfig:ConfigCollection = getConfig();
const createConection = (db_config: dbInfo = baseConfig.config):Sequelize => {
    return new Sequelize(
        db_config.database,
        db_config.user,
        db_config.password,
        {
            dialect: db_config.dialect,
            host: db_config.host,
            port: db_config.port,
            models: [
               
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