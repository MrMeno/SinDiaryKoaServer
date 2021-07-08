import { ABSTRACT, Dialect } from 'sequelize'
import path from 'path'
import * as crypto from 'crypto'
import fs from 'fs'
import { dbInfo, serverOption, md5_key, md5_secrect, ConfigCollection } from './config.base'
import { OPTIONS } from 'serveModel/Interfaces/network'
 class DevConfig implements ConfigCollection {
    /***
    *@paramname
    数据库简称
    `gocrondb_dev_${name}`
    */
    constructor(name?: string) {
        fs.readFile(path.join(__dirname,'../my.conf'),(err,data)=>{
            if(err){
                throw(new SyntaxError(err.message));
            }
           
            if(this[name]){
                this[name].password = data.toString();
            }
            this.db.password = data.toString();
        })
        this.setConfig(name)//设置数据库配置
    }
    db: dbInfo = {
        user: "merio",
        password: "",
        database: "dev",
        host: "8.142.178.27",//软件仓库开发环境
        port: 3306,
        dialect: 'mysql',
        alias: 'merio_db',
        name: '开发专用'
    }
    config: dbInfo;
    hostConfig: serverOption;
    remote_server_url = 'http://127.0.0.1:3035';
    setConfig = (name?: string): void => {
        this.config = name ? this[name] : this.db
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