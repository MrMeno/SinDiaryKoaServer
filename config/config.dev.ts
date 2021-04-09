import type { Dialect } from 'sequelize'
import path from 'path'
import * as crypto from 'crypto'
import { dbInfo, serverOption, md5_key, md5_secrect, ConfigCollection } from './config.base'
class DevConfig implements ConfigCollection {
    /***
    *@paramname
    数据库简称
    `gocrondb_dev_${name}`
    *@paramstationName
    站点简称
    shkfshzb
    */
    constructor(name?: string, staionName?: string) {
        this.setConfig(name)//设置数据库配置
        this.setHostConfig(staionName)//设置服务器配置
        this.getAllHost();//获取所有服务器列表
        this.getAllDb();//获取所有数据库列表
    }
    ////数据库配置/////////
    mysqlConfigDev: dbInfo = {
        user: "depot",
        password: "depot",
        database: "depot",
        host: "10.100.1.232",//软件仓库开发环境
        port: 3306,
        dialect: 'mysql',
        alias: 'rjck_dev',
        name: '软件仓库体验站'
    }
    gocrondb_dev_shkf: dbInfo = {
        user: "root",
        password: "ABcd_1234",
        database: "gocrondb",
        host: "10.100.6.162",//eagles-上海开发站
        port: 3306,
        dialect: 'mysql',
        alias: 'shkf',
        name: '上海开发站'
    }
    gocrondb_dev_shzb: dbInfo = {
        user: "root",
        password: "ABcd_1234",
        database: "gocrondb",
        host: "10.100.2.11",////eagles-总部机房
        port: 3306,
        dialect: 'mysql',
        alias: 'shzb',
        name: '上海总部机房'
    }
    /////////////////////
    //// 服务器配置
    ////////
    shkf: serverOption = {
        Host: "10.102.17.108",
        Port: 5920,
        Name: 'shkf',
        Name_CN: '上海开发站'
    };
    shzb: serverOption = {
        Host: "10.100.2.11",
        Port: 5920,
        Name: 'shzb',
        Name_CN: '上海总部机房'
    };
    ////服务器配置////////
    rjck_prd: serverOption = {
        Host: "10.100.3.138",
        Port: 8080,
        Name: 'rjck_prd',
        Name_CN: '软件仓库主站'
    };
    //////////////////////
    HostListInfo: Array<serverOption> = [];
    dbListInfo: Array<dbInfo> = [];
    config: dbInfo;
    hostConfig: serverOption;
    //publicstaticrootPath:string=path.resolve(__dirname,'../');
    //// 设置数据库配置
    setConfig = (name?: string): void => {
        this.config = name ? this[name] : this.mysqlConfigDev
    }
    //// 设置服务器配置
    setHostConfig = (stationName?: string): void => {
        this.hostConfig = stationName ? this[stationName] : this['shkf'];
    }
    ////redis服务主机
    //publicredis_port=6379;
    //publicredis_host='127.0.0.1';
    ////主机服务地址
    remote_server_url = 'http://10.100.1.223:3005';
    ////接口加密
    getPublicAuth = (url: string, timestap: number): string => {
        //letdateNow=1613979791;
        let keyStr = `${md5_key}${timestap}${url}${md5_secrect}`;
        let md5 = crypto.createHash('md5');
        md5.update(keyStr, 'utf8');
        return md5.digest('hex');
    }
    //// 获取所有服务器
    getAllHost = (): void => {
        this.HostListInfo = [
            this.shkf,
            this.shzb
        ];
    }
    ///获取所有数据库
    getAllDb = (): void => {
        this.dbListInfo = [
            this.gocrondb_dev_shkf
            , this.gocrondb_dev_shzb
        ];
    }
}
export default DevConfig;