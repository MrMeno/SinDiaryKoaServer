import * as Router from 'koa-router'
import * as md5 from 'md5'
import toolClass from '../utils/tool/index'
import db from '../utils/map/index'
import worldTree from '../serveModel/Classes/world_tree'
import { Context } from 'koa';
import { get, post } from '../utils/define/network';

var router=new Router();

export default class UserRouter {
  @get('/user', true)
  async user(ctx:Context){
    await ctx.render('index',{
      title:'Hello Koa 2!'
    })
  }
}
 
