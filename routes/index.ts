import * as Router from 'koa-router'
import * as md5 from 'md5'
import {toolClass} from '../utils/tool/index'
import db from '../utils/map/index'
import {resolve } from 'bluebird'
import worldTree from '../serveModel/Classes/world_tree'
import 'reflect-metadata'


var router=new Router();


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
 
