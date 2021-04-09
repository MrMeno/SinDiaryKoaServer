import type { Dialect } from 'sequelize'
import path from 'path';

type dbInfo = {
    readonly user: string
    readonly password: string
    readonly database: string
    readonly host: string
    readonly port: number
    readonly dialect: Dialect
    readonly alias: string
    readonly name: string
}
type serverOption = {
    readonly Host: string
    readonly Port: number
    readonly Name: string
    readonly Name_CN: string
}
type httpOptions = {
    host: string,
    port: number,
    path: string,
    method: string,
    headers: any,
    api?: string
}
type ConfigCollection = {
    mysqlConfigDev: dbInfo,
    gocrondb_dev_shkf: dbInfo,
    gocrondb_dev_shzb: dbInfo,
    shkf: serverOption,
    shzb: serverOption,
    rjck_prd: serverOption,
    HostListInfo: Array<serverOption>,
    dbListInfo: Array<dbInfo>,
    config: dbInfo,
    hostConfig: serverOption,
    remote_server_url: string;
    setConfig: (name?: string) => void,
    setHostConfig: (stationName?: string) => void,
    getPublicAuth: (url: string, timestap: number) => string,
    getAllHost: () => void,
    getAllDb: () => void
}
const env: string | undefined = process.env.NODE_ENV;
const SSOUrl = 'http://wcms.wind.com.cn:9000/ssoweb/sso_login.aspx';
var SSOReturnUrl = '';
if (env === 'prd') {
    SSOReturnUrl = 'http://10.100.3.138:3001/task/task/set/auth';
}
if (env === 'dev') {
    SSOReturnUrl = 'http://10.100.1.223:3001/task/task/set/auth';
}
if (env === 'local') {
    SSOReturnUrl = 'http://10.100.2.25:3005/task/set/auth';
}
const redis_url: string = '127.0.0.1:6379';
const appid: string = 'DepotTask';
const md5_key: string = "abcd1234";
const md5_secrect: string = "ABcd_1234";
const rootPath:string= path.resolve(__dirname,'../');
export {
    dbInfo,
    serverOption,
    httpOptions,
    SSOUrl,
    SSOReturnUrl,
    appid,
    md5_key,
    md5_secrect,
    redis_url,
    ConfigCollection,
    rootPath
}