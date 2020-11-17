const router = require('koa-router')()

var md5 = require('md5');
const { toolClass } = require('../utils/tool/index');
const {sqlMap} =require('../utils/map/index');
const { resolve } = require('bluebird');
var worldTree =require('../dist/Classes/world_tree');
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
});

router.get('/prd_db_test', async (ctx, next) => {
  ctx.body = 'koa2 prd database test'
});
router.post('/login', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
});
module.exports = router
