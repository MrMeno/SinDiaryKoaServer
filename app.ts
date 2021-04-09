/***@AuthorYoungMerio
*@mailymin@wind.con.cn
*@createTime2021-01-18
*@workID22206
******/
import Koa, { Context, Next } from "koa";
import koaRouter from 'koa-router';
import views from 'koa-views';
//importjsonfrom'koa-json';
const onError = require('koa-onerror');
//constbodyparser=require('koa-bodyparser')
//废弃：与koaBody不兼容，导致appcrash
const KoaStatic = require('koa-static');
const cors = require("koa2-cors");
import koaBody from 'koa-body';
import KoaLogger from 'koa-logger';
import addRouter from './serveModel/Interfaces/routeHook';
import { jsonHandler } from './utils/middleware/json';
import { errorHandler } from './utils/middleware/error';
import path from 'path';
const app = new Koa();
const router = new koaRouter();
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
//设置静态文件服务器
app.use(KoaStatic(path.join(__dirname, 'statics')))
app.use(views(__dirname + '/engine', {
  extension: 'pug'
}))
//绑定中间件
jsonHandler(app)
app.use(KoaLogger())
//onError(app)
//app.use(bodyparser({
//enableTypes:['json','form','text'],
//multipart:true
//}))
//app.use(json())
app.use(koaBody({
  multipart: true,
  urlencoded: true,
  json: true,
  text: true
}))
app.keys = ['wind', 'TASK']
app.use(session({
  key: "KOA:SESSION_ID",
  prefix: 'TASK',
  store: new redisStore(),
}))
//app.use(koaRequest({
//json:true,
//timeout:3000,
//host:`http://${Config.Host}:${Config.Port}/api`
//}))
app.use(cors({
  maxAge: 5,//指定本次预检请求的有效期，单位为秒
  credentials: true,//是否允许发送Cookie
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],//设置所允许的HTTP请求方法
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'Auto-Token', 'userid', 'username'],//设置服务器支持的所有头信息字段
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization']//设置获取其他自定义字段
}))
app.use(async (ctx: Context, next: Next) => {
  const start = new Date()
  await next()
  const ms: any = new Date().valueOf() - start.valueOf()
  //console.log(`${ctx.method}${ctx.url}-${ms}ms`)
  //console.log(`IPfrom:${ctx.request.headers['remoteip']||ctx.req.socket.remoteAddress}`)
})
app.use(router.routes()).use(router.allowedMethods());
//app.on('error',(err:any,ctx:any)=>{
//console.error('servererror',err,ctx)
//});
addRouter(router)
errorHandler(app)
export { app }
