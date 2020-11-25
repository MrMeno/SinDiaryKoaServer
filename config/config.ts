
import type { Dialect} from 'sequelize'
import path from 'path'

interface dbInfo{
    user:string
    password: string
    database: string
    host:string
    port: number
    dialect:Dialect
}
export default class Config{
    constructor(isPrd?:Boolean){
        this.setConfig(isPrd)
    }
    private mysqlConfigDev:dbInfo= {
        user: "root",
        password: "",
        database: "dev",
        host:"localhost",//外网连接
        port: 3306,
        dialect:'mysql'
    }
    private mysqlConfigPrd:dbInfo= {
        user: "merio_db",
        password: "Merio_20",
        database: "dev",
        host:"rm-2zed76hhd8hls6x68125010.mysql.rds.aliyuncs.com",//外网连接
        port: 3306,
        dialect:'mysql'
    }
   public config:dbInfo;
   public static rootPth:string=path.resolve(__dirname,'../');
   private setConfig=(isPrd?:Boolean):void=>{
        this.config=isPrd?this.mysqlConfigPrd:this.mysqlConfigDev
    }
}
 