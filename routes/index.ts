import { Context ,Next} from 'koa';
import { GET ,POST, PUT ,DELETE} from '../serveModel/Interfaces/network';
import { createConection } from '../serveModel/Database/db_connection';
import toolClass from '../utils/tool/index';
import {static_server_url } from '../config/config.base';
import { Sequelize } from 'sequelize/types';
import dbAction from '../serveModel/Controllers/db_action';

const connection:Sequelize = createConection();
export default class indexRouter {

  @GET('/', true)
  async root(ctx:Context){

    await ctx.render('index',{
      title:'Hello Koa 2!',
      data:{
        host: static_server_url
      }
    })
  }

  @GET('/login', true)
  async login(ctx:Context){
    const dbHandler = new dbAction();
    let result:any = [];
    await dbHandler.getAllUser(ctx.body).then(res=>{
      result = res;
    });
    await ctx.render('index',{
      title:'Hello Koa 2!',
      data:{
        host: static_server_url
      }
    })
  }
  @GET('/role',true)
  async role(ctx:Context,next:Next){
    await connection.models.sys_RoleBasic.findAll().then(role=>{
         ctx.success({roleList:role})
         next();
    }).catch(error=>{
      ctx.fail(error)
      next();
    })
     
  }
  @POST('/addRole',true)
  async addRole(ctx:Context,next:Next){
    let param=ctx.request.body;
    console.log(JSON.stringify(param))
    param=Object.assign({id:toolClass.getRadomHex(16)},param);
    await connection.models.sys_RoleBasic.create(param).then(res=>{
      ctx.success(res);
    })
    .catch(error=>{
      ctx.fail(error)
      next();
    })
  }

  @PUT('/editRole',true)
  async editRole(ctx:Context){
     let id=ctx.request.body.id;
    const param=ctx.request.body;

    console.log(JSON.stringify(param))
    try{
    delete param.id;
    await connection.models.sys_RoleBasic.update(param,{where:{id:id}})
    .then(res=>{
      if(res[0]==0){
        ctx.success(null,'数据无改动');
      }
      else{
        ctx.success({count:res[0]},`修改成功`);
      }
 
    })
    .catch(error=>{
      ctx.fail(error)
    })
    }
    catch (e){
      ctx.fail(e);
    }
  }
  @DELETE('/delRole',true)
  async delRole(ctx:Context,next:Next){
    let id=ctx.request.body.id;
    try{
    await connection.models.sys_RoleBasic.destroy({where:{id:`${id}`}})
    .then((count)=>{
      console.log(count)
      ctx.success(`删除成功`);
    })
    .catch(error=>{
      ctx.fail(error)
    })
    }
    catch (e){
      ctx.fail(e);
      next()
    }
  }

}
 
