// import * as mysql from 'mysql2'
// import { ABSTRACT } from 'sequelize/types';
import path from 'path'
export default class Config{
    constructor(isPrd?:Boolean){
        this.setConfig(isPrd)
    }
     mysqlConfigDev:any= {
        user: "root",
        password: "",
        database: "python_test_grap",
        host:"localhost",//外网连接
        port: 3306,
        dialect:'mysql'
    }
     mysqlConfigPrd:any= {
        user: "merio_db",
        password: "Merio_20",
        database: "dev",
        host:"rm-2zed76hhd8hls6x68ro.mysql.rds.aliyuncs.com",//外网连接
        port: 3306,
        dialect:'mysql'
    }
   public config:any;
   public static rootPth:string=path.resolve(__dirname,'../');
   private setConfig=(isPrd?:Boolean):void=>{
        this.config=isPrd?this.mysqlConfigPrd:this.mysqlConfigDev
    }
}
 