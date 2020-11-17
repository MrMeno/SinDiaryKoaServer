const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const koaBody =require('koa-body')
const logger = require('koa-logger')
const index = require('./routes/index')
const users = require('./routes/users')

onerror(app)

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(koaBody({
  multipart: true, 
}))
app.use(logger())
app.use(require('koa-static')(__dirname + '/statics'))

app.use(views(__dirname + '/engine', {
  extension: 'pug'
}))

app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
