import type { Dialect } from 'sequelize'
import path from 'path'
import * as crypto from 'crypto'
import { dbInfo, serverOption, md5_key, md5_secrect, ConfigCollection } from './config.base'
class DevConfig implements ConfigCollection {
    /***
    *@paramname
    数据库简称
    `gocrondb_dev_${name}`
    */
    constructor(name?: string) {
        this.setConfig(name)//设置数据库配置
    }
    mysqlConfigDev: dbInfo = {
        user: "root",
        password: "depot",
        database: "merio_db",
        host: "8.142.178.27",//软件仓库开发环境
        port: 3306,
        dialect: 'mysql',
        alias: 'merio_db',
        name: '开发专用'
    }
    config: dbInfo;
    hostConfig: serverOption;
    remote_server_url = 'http://8.142.178.27:3005';
    setConfig = (name?: string): void => {
        this.config = name ? this[name] : this.mysqlConfigDev
    }


    ////接口加密
    // getPublicAuth = (url: string, timestap: number): string => {
    //     //letdateNow=1613979791;
    //     let keyStr = `${md5_key}${timestap}${url}${md5_secrect}`;
    //     let md5 = crypto.createHash('md5');
    //     md5.update(keyStr, 'utf8');
    //     return md5.digest('hex');
    // }
}
export default DevConfig;