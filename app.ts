import Koa,{ Context } from "koa"
import koaRouter from 'koa-router'
import views from 'koa-views';
import json from 'koa-json';
const onError = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const KoaStatic = require('koa-static');
import koaBody from 'koa-body';
import KoaLogger from 'koa-logger';
import addRouter from './utils/define/routeHook'
import {jsonHandler} from './utils/middleware/json'
import {errorHandler} from './utils/middleware/error'
import path from 'path'
const app=new Koa();
const router=new koaRouter();
addRouter(router);
errorHandler(app)
onError(app)
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
jsonHandler(app)
 
app.use(json())
app.use(koaBody({
  multipart: true, 
}))
app.use(KoaLogger())
app.use(KoaStatic(path.join(__dirname, 'statics')))
app.use(views(__dirname + '/engine', {
  extension: 'pug'
}))
app.use(async(ctx:Context, next:any) => {
  const start = new Date()
  await next()
  const ms:any = new Date().valueOf()- start.valueOf()
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
app.use(router.routes()).use(router.allowedMethods());

app.on('error', (err:any, ctx:any) => {
  console.error('server error', err, ctx)
});

export default app
