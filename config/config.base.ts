import type { Dialect } from 'sequelize'
import path from 'path';

type dbInfo = {
    readonly user: string
    password: string
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
    config: dbInfo,
    hostConfig: serverOption,
    db: dbInfo,
    remote_server_url: string;
    setConfig: (name?: string) => void,
}
const env: string | undefined = process.env.NODE_ENV;
const redis_url: string = '127.0.0.1:6379';
const static_server_url: string = 'http://localhost:3000';
const md5_key: string = "abcd1234";
const md5_secrect: string = "ABcd_1234";
const rootPath:string= path.resolve(__dirname,'../');
export {
    dbInfo,
    serverOption,
    httpOptions,
    env,
    md5_key,
    md5_secrect,
    redis_url,
    ConfigCollection,
    rootPath,
    static_server_url
}