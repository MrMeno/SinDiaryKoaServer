import http from 'http';
import { Context } from 'koa';
import Qs from 'qs';
import getConfig from '../../config/index';
const Config: any = getConfig();
class HttpRequestMethod {
    constructor() {
    }
    public static get = (option: object, ctx: Context): Promise<any> => {
        var str: string = "";
        //vartoken:string="";
        //if(ctx.headers['auth-token'])
        //{token=ctx.headers['auth-token']};
        //option['headers']={...option['headers'],'auth-token':token};
        let config = new Config('db');
        let param = {};
        if (option['api']) {
            let time = parseInt((new Date().getTime() / 1000).toString());
            let sign = config.getPublicAuth(option['api'], time);
            param = { time, sign };
        }
        if (option['path'].indexOf('?') > 0) {
            option['path'] += `&${Qs.stringify(param)}`;
        }
        else {
            option['path'] += `?${Qs.stringify(param)}`;
        }
        return new Promise((resolve, reject) => {
            try {
                http.request(option, res => {
                    res.on('data', (data) => {
                        res.setEncoding('utf-8');
                        str += data.toString();
                    });
                    res.on('end', () => {
                        res.setEncoding('utf-8');
                        resolve(str);
                    });
                }).end();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /***
    *@methodPOST
    形式传递
    x-www-form-urlencoded
    *@options
    参数设置
    *@ctxhttp
    事件请求体
    ***/
    public static post = (option: object, ctx: Context): Promise<any> => {
        var json: any = "";
        //vartoken:string="";
        //if(ctx.headers['auth-token'])
        //{token=ctx.headers['auth-token']};
        //option['headers']={...option['headers'],'auth-token':token};
        let config = new Config('db');
        let param = {};
        if (option['api']) {
            let time = parseInt((new Date().getTime() / 1000).toString());
            let sign = config.getPublicAuth(option['api'], time);
            param = { time, sign };
        }
        if (option['path'].indexOf('?') > 0) {
            option['path'] += `&${Qs.stringify(param)}`;
        }
        else {
            option['path'] += `?${Qs.stringify(param)}`;
        }
        return new Promise((resolve, reject) => {
            try {
                http.request(option, res => {
                    res.on('data', (d) => {
                        res.setEncoding('utf-8');
                        json = JSON.parse(d);
                    });
                    res.on('end', () => {
                        resolve(json);
                    });
                }).end();
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /***
    *@methodPOST
    形式传递
    json
    *@options
    参数设置
    *@ctxhttp
    事件请求体
    ***/
    publicstaticpostJson = (option: object, jsonStr: string, ctx: Context): Promise<any> => {
        //vartoken:string="";
        var str: string = '';
        //if(ctx.headers['auth-token'])
        //{token=ctx.headers['auth-token']};
        //option['headers']={...option['headers'],'auth-token':token};
        let config = new Config('db');
        let param = {};
        if (option['api']) {
            let time = parseInt((new Date().getTime() / 1000).toString());
            let sign = config.getPublicAuth(option['api'], time);
            param = { time, sign };
        }
        if (option['path'].indexOf('?') > 0) {
            option['path'] += `&${Qs.stringify(param)}`;
        }
        else {
            option['path'] += `?${Qs.stringify(param)}`;
        }
        return new Promise((resolve, reject) => {
            try {
                var req = http.request(option, res => {
                    res.on('data', (d) => {
                        str += d;
                    });
                    res.on('end', () => {
                        resolve(str);
                    });
                });
                req.write(jsonStr);
                req.end();
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
export default HttpRequestMethod;