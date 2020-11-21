// import * as md5 from 'md5'
// import toolClass from '../utils/tool/index'
// import worldTree from '../serveModel/Classes/world_tree'
import { Context } from 'koa';
//import { sys_RoleBasic } from 'utils/map/sys_role_basic_table';
import { get } from '../utils/define/network';
import { connection } from '../utils/map/db_connection';
export default class indexRouter {
  @get('/login', true)
  async login(ctx:Context){
   await connection.models.sys_RoleBasic.findAll().then(role=>{
      console.log('ALL Role:',JSON.stringify(role))
    })
    await ctx.render('index',{
      title:'Hello Koa 2!'
    })
  }
}
 
