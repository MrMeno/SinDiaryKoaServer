import { Sequelize } from 'sequelize-typescript'
import { dbInfo,ConfigCollection } from '../../config/config.base';
import Tables from './main/index';
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
               ...Tables
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