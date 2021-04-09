import { Context, Next } from 'koa';
import { GET, POST, PUT, DELETE } from '../serveModel/Interfaces/network';
import Qs from 'qs';
import fs from 'fs';
import path from 'path';
import getConfig from '../config/index'
import toolClass from '../utils/tool/index';
const redisStore = require('koa-redis');
const NodeRSA = require('node-rsa');
import * as crypto from 'crypto';
import ScheduleController from '../serveModel/Controllers/db_schedule';
import { SSOUrl, SSOReturnUrl, appid, redis_url } from '../config/config.base'
const stroe = new redisStore({
    isRedisCluster: false,
    url: redis_url
}).client;
const Config: any = getConfig();
/*
*redis
接口实现类
*/
export default class RedisController {
    //redis-test
    @POST('/task/set/hello')
    async setHello(ctx: Context, next: Next) {
        let queryObj = ctx.request.body;
        const value = await stroe.set('hello', queryObj.value);
        await ctx.success({ value });
        await next();
    }
    @GET('/task/get/hello')
    async getHello(ctx: Context, next: Next) {
        const value = await stroe.get('hello');
        console.log(value)
        console.log(stroe);
        await ctx.success({ value });
        await next();
    }
    ///////////////////////////
    @POST('/task/init/auth')
    async initAuth(ctx: Context, next: Next) {
        let queryObj = ctx.request.body;
        let userid = queryObj['userid'] || '';
        let value = '';
        if (userid) {
            value = await stroe.set(`KOA:TASK_SESSION:${userid}`, false);
        }
        let privateKey = fs.readFileSync(path.join(__dirname, '../statics/pem/private.pem'));
        let key = privateKey.toString('ascii');
        let config = new Config('', '');
        let t = toolClass.getJoinDateFormat(new Date(), 'YYYYMMDDHHMMSS', false);
        let signObject = {
            appid,
            p: userid,
            t
        };
        let keyStr = `${SSOUrl}?${Qs.stringify(signObject)}&returnUrl=${SSOReturnUrl}`;
        const sha1 = crypto.createSign('sha1');
        sha1.update(keyStr, 'utf8');
        const sign: string = sha1.sign(key, 'base64');
        if (value == 'OK') {
            await ctx.success({ url: `${keyStr}&sign=${encodeURIComponent(sign)}` }, '初始化成功');
        }
        else {
            await ctx.fail('接口调用失败');
        }
        await next();
    }
    ///////////////////////////
    @POST('/task/private/sign')
    async getSign(ctx: Context, next: Next) {
        let queryObj = ctx.request.body;
        let userid = (ctx.headers['userid'] || queryObj['userid']) || '';
        const value = await stroe.set(`KOA:TASK_SESSION:${userid}`, false);
        let
            bufferStr = fs.readFileSync(path.join(__dirname, '../statics/pem/private.pem')).toString('ascii');
        if (value == 'OK') {
            await ctx.success({ privateKey: bufferStr }, '初始化成功');
        }
        else {
            await ctx.fail('接口调用失败');
        }
        await next();
    }
    @GET('/task/set/auth')
    async setAuth(ctx: Context, next: Next) {
        let queryObj = Qs.parse(ctx.request.querystring);
        console.log(queryObj)
        let config = new Config('', '');
        if (queryObj.p != queryObj.account) {
            await ctx.render('error', {
                error: {
                    message: '身份认证失败，请重新认证',
                    host: config.remote_server_url
                }
            });
        }
        else {
            const value = await stroe.set(`KOA:TASK_SESSION:${queryObj.account}`, true);
            const taskClass = new ScheduleController();
            taskClass.canelAuthTask(queryObj.account);
            await ctx.render('auth_success', {
                data: {
                    message: '身份认证成功',
                    host: config.remote_server_url
                }
            });
        }
        await next();
    }
    @GET('/task/get/auth')
    async getAuth(ctx: Context, next: Next) {
        let queryObj = Qs.parse(ctx.request.querystring);
        let userid: any = '';
        userid = queryObj.userid || '';
        if (ctx.headers['userid']) {
            userid = ctx.headers['userid'].toString();
        }
        const value = await stroe.get(`KOA:TASK_SESSION:${userid}`);
        await ctx.success({ isAuth: value === 'true' });
        await next();
    }
}