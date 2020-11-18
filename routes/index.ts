// import koaRouter from 'koa-router'
// import * as md5 from 'md5'
// import toolClass from '../utils/tool/index'
// import db from '../utils/map/index'
// import worldTree from '../serveModel/Classes/world_tree'
import { Context } from 'koa';
import { get } from '../utils/define/network';


export default class indexRouter {
  @get('/login', true)
  async login(ctx:Context){
    await ctx.render('index',{
      title:'Hello Koa 2!'
    })
  }
}
 
