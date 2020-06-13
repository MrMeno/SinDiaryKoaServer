const databaseConfig={
    host:"rm-2zed76hhd8hls6x68ro.mysql.rds.aliyuncs.com",
    port:"3306",
    database:"merio_db"
    //username:merio_db 
    //password:Merio
};
const koaServerConfig={
  port:3005
}
 module.exports={
    databaseConfig,koaServerConfig
 }