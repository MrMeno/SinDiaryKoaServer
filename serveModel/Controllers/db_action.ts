import { createConection } from '../Database/db_connection';
//importtoolClassfrom'../utils/tool/index';
import { dbInfo, serverOption, httpOptions,ConfigCollection } from '../../config/config.base'
import toolClass from '../../utils/tool/index';
import { Context, Next } from 'koa';
import HttpRequestMethod from '../Interfaces/HttpRequest';
import Qs from 'qs';
import getConfig from '../../config/index'
import { OperationCanceledException } from 'typescript';
const Sequlize = require('sequelize');
const Config: ConfigCollection = getConfig();
const Op = Sequlize.Op;
/***
*
数据库操作类
***/
export default class dbAction {
    constructor() {
    }
    /*
    *
    记录用户操作
    */
    async getAllUser(queryBody: any) {
        try{
            let dbInfo: dbInfo = Config.config;
            console.log(dbInfo)
        const sqlStr:string = `select * from tb_basic_user;`;
        let db = createConection(dbInfo);
        const [result,meta] = await db.query(sqlStr);
        console.log(result);
        return new Promise((resolve, reject) => {
           resolve(result);   
         })
        }
        catch(e){
            return new Promise((resolve, reject) => {
                reject(e);   
              })
        }
    }
    // async updateAction(queryBody: any) {
    //     let dbInfo: dbInfo = new Config('db').config;
    //     let db = createConection(dbInfo);
    //     return new Promise((resolve, reject) => {
    //         db.models.tb_it_task_action.create(
    //             queryBody
    //         ).then(res => {
    //             db.close()
    //             resolve(res);
    //         }).catch(error => {
    //             db.close()
    //             reject(error);
    //         });
    //     })
    // }
    // /*
    // *
    // 获取用户操作记录
    // */
    // asyncgetUserAction(queryBody: any) {
    //     let dbInfo: dbInfo = new Config('db').config
    //     let db = createConection(dbInfo);
    //     let currentPage = queryBody.page;
    //     let pageSize = queryBody.page_size;
    //     delete queryBody.page_size;
    //     delete queryBody.page;
    //     let ops = {};
    //     if (queryBody.task_id) {
    //         ops['task_id'] = { [Op.like]: '%' + queryBody.task_id + '%' };
    //     }
    //     if (queryBody.task_name) {
    //         ops['task_name'] = { [Op.like]: '%' + queryBody.task_name + '%' };
    //     }
    //     if (queryBody.editor) {
    //         ops['editor'] = { [Op.like]: '%' + queryBody.editor + '%' };
    //     }
    //     return new Promise((resolve, reject) => {
    //         db.models.tb_it_task_action.findAndCountAll(
    //             {
    //                 order: [['actionTime', 'DESC']],
    //                 where: ops,
    //                 offset: (currentPage - 1) * pageSize,
    //                 limit: Number(pageSize)
    //             }
    //         ).then(res => {
    //             let result = { data: res.rows, total: res.count }
    //             db.close()
    //             resolve(result);
    //         }).catch(error => {
    //             db.close()
    //             reject(error);
    //         });
    //     })
    // }
    // /*
    // *
    // 根据任务
    // id
    // 查询该
    // id
    // 绑定的主机
    // */
    // asyncgetHostFromTaskID(queryBody: any) {
    //     let dbInfo: dbInfo = new Config(`gocrondb_dev_${queryBody.station}`).config;
    //     let db = createConection(dbInfo);
    //     return new Promise((resolve, reject) => {
    //         db.models.gc_task_host.belongsTo(//数据表左联映射
    //             db.models.gc_task,
    //             {
    //                 foreignKey: 'task_id',//外键
    //                 targetKey: 'id',//匹配字段
    //                 as: 'c'
    //             });
    //         db.models.gc_task_host.findAll({
    //             attributes: ['host_id'],
    //             include: [
    //                 {
    //                     model: db.models.gc_task,
    //                     where: {
    //                         name: queryBody.name
    //                     },
    //                     attributes: [],
    //                     as: 'c'
    //                 }
    //             ],
    //         }).then(res => {
    //             let arr = res.map(item => {
    //                 return item[`host_id`];
    //             })
    //             db.models.gc_host.findAll(
    //                 {
    //                     order: [['id', 'DESC']],
    //                     where: {
    //                         'id': {
    //                             [Op.in]: arr
    //                         }
    //                     },
    //                 }
    //             ).then(res2 => {
    //                 db.close()
    //                 resolve(res2);
    //             }).catch(error => {
    //                 db.close()
    //                 reject(error);
    //             });
    //         });
    //     })
    // }
    // /*
    // *
    // 获取站点同步信息
    // */
    // async getTaskStation(queryBody: any) {
    //     let dbListInfo: Array<dbInfo> = new Config('db').dbListInfo;
    //     let HostListInfo: Array < serverOption >= new Config('db').HostListInfo;
    //     let name = queryBody.name || '';
    //     let list: any = [];
    //     let error: any = [];
    //     for (let i = 0; i < dbListInfo.length; i++) {
    //         let dbInfo = dbListInfo[i];
    //         let db = createConection(dbInfo);
    //         await db.models.gc_task.findAndCountAll(
    //             {
    //                 order: [['name', 'DESC']],
    //                 where: {
    //                     name: name,
    //                     deleted: {
    //                         [Op.eq]: null
    //                     }
    //                 },
    //             }
    //         ).then(res => {
    //             if (res.count > 0) {
    //                 let result = {
    //                     exist: true,
    //                     station_name: dbInfo.name,
    //                     station_id: dbInfo.alias,
    //                     task_id: res.rows[0]['id'],
    //                     task_name: name
    //                 }
    //                 db.close()
    //                 list.push(result);
    //             }
    //             else {
    //                 let result = {
    //                     exist: false,
    //                     station_name: dbInfo.name,
    //                     station_id: dbInfo.alias,
    //                     task_name: name
    //                 }
    //                 list.push(result);
    //             }
    //         }).catch(error => {
    //             db.close()
    //             error.push({ error: error });
    //         });
    //     }
    //     return new Promise((resolve, reject) => {
    //         if (error.length == 0) {
    //             resolve(list);
    //         }
    //         else {
    //             reject(error);
    //         }
    //     })
    // }
    // /*
    // *
    // 同步站点任务信息
    // */
    // asyncaddTaskMatchAction(queryBody: any) {
    //     let dbInfo: dbInfo = new Config(`gocrondb_dev_${queryBody.station}`).config;
    //     let db = createConection(dbInfo);
    //     let id: any = '';
    //     //console.log(queryBody);
    //     return new Promise((resolve, reject) => {
    //         db.models.gc_task.findAndCountAll({
    //             where: {
    //                 name: queryBody.name
    //             }
    //         }).then(a => {
    //             if (a.count > 0) {
    //                 id = a.rows[0]['id'];
    //                 db.models.gc_task.update({
    //                     deleted: null,
    //                     operator: queryBody.operator
    //                 },
    //                     {
    //                         where: {
    //                             id
    //                         }
    //                     }
    //                 ).then(b => {
    //                     if (b[0] == 1) {
    //                         resolve({ code: 0, message: '更新成功' });
    //                     }
    //                     else {
    //                         reject(null);
    //                     }
    //                 })
    //             }
    //             else {
    //                 if (queryBody.station) {
    //                     delete queryBody.station;
    //                 };
    //                 db.models.gc_task.create({
    //                     ...queryBody
    //                 }).then(c => {
    //                     resolve({ code: 0, message: '更新成功' });
    //                 })
    //             }
    //         }).catch(ae => {
    //             reject(ae);
    //         });
    //     })
    // }
    // /*
    // *
    // 同步站点任务信息
    // */
    // async addTaskMatchActionAsync(queryBody: any) {
    //     let station: string = queryBody.station.toString();
    //     let name = queryBody.name;
    //     let dbInfo: dbInfo = new Config(`gocrondb_dev_${station}`).config;
    //     let dbs = createConection(dbInfo);
    //     let updaRes = { ...queryBody, deleted: null }
    //     return new Promise(async (resolve, reject) => {
    //         await dbs.models.gc_task.update(updaRes,
    //             {
    //                 where: {
    //                     name
    //                 }
    //             }
    //         ).then(b => {
    //             if (Number(b[0]) > 0) {
    //                 resolve({ code: 0, message: '更新成功', data: null });
    //             }
    //             else {
    //                 reject({ code: 200, message: '数据无变动', data: null });
    //             }
    //         }).catch(error => {
    //             reject({ code: 1, message: '更新失败', data: { error } });
    //         })
    //     })
    // }
    // /*
    // *
    // 删除站点任务信息
    // */
    // asyncdelTaskMatchAction(queryBody: any) {
    //     let dbInfo: dbInfo = new Config(`gocrondb_dev_${queryBody.station}`).config;
    //     let db = createConection(dbInfo);
    //     let id: any = '';
    //     return new Promise((resolve, reject) => {
    //         db.models.gc_task.findAll({
    //             where: {
    //                 name: queryBody.name
    //             }
    //         }).then(a => {
    //             id = a[0]['id'];
    //             db.models.gc_task.update({
    //                 deleted: toolClass.getJoinDateFormat(new Date(), 'YYYY-MM-DDHH:MM:SS',
    //                     false),
    //                 operator: queryBody.operator
    //             },
    //                 {
    //                     where: {
    //                         id
    //                     }
    //                 }
    //             ).then(b => {
    //                 if (!b) {
    //                     reject(null);
    //                 }
    //             }).then(c => {
    //                 db.models.gc_task_host.destroy({
    //                     where: {
    //                         task_id: id
    //                     }
    //                 }).then(d => {
    //                     resolve(d);
    //                 })
    //             }).catch(de => {
    //                 reject(de);
    //             })
    //         }).catch(ae => {
    //             reject(ae);
    //         });
    //     })
    // }
    // /**
    // *
    // 查找站点任务信息
    // *@paramname
    // 任务名称
    // *@paramstation
    // 站点名称
    // **/
    // findTaskThroughName(name: string, station: string) {
    //     let dbInfo: dbInfo = new Config(`gocrondb_dev_${station}`).config;
    //     let db = createConection(dbInfo);
    //     return new Promise((resolve, reject) => {
    //         db.models.gc_task.findAndCountAll({
    //             where: {
    //                 name: name || ''
    //             }
    //         }).then(res => {
    //             resolve(res)
    //         })
    //             .catch(err => {
    //                 reject(err)
    //             })
    //     })
    // }
    // /**
    // *
    // 查找站点任务信息
    // *@paramname
    // 任务名称
    // *@paramstation
    // 站点名称
    // **/
    // asyncgetEmployeeInfo(ctx: Context) {
    //     let queryObj = Qs.parse(ctx.request.querystring);
    //     let id = ctx.headers['userid'] || queryObj['userid'];
    //     let hostConfig: serverOption = new Config('db').rjck_prd;
    //     var options: httpOptions = {
    //         host: hostConfig.Host,
    //         port: hostConfig.Port,
    //         path: `/employee/leader/${id}`,
    //         method: 'GET',
    //         api: ``,
    //         headers: {
    //             "Content-Type": "application/x-www-form-urlencoded"
    //         }
    //     };
    //     var str = "";
    //     return new Promise((resolve, reject) => {
    //         HttpRequestMethod.get(options, ctx).then((res) => {
    //             str += res;
    //             console.log(str);
    //             resolve(JSON.parse(str));
    //         }).catch(err => {
    //             reject(err);
    //         })
    //     })
    // }
    // /**
    // *
    // 查找站点任务信息
    // *@paramname
    // 任务名称
    // *@paramstation
    // 站点名称
    // **/
    // async getEmployeeInfos(ctx: Context) {
    //     let queryObj = Qs.parse(ctx.request.querystring);
    //     let id = ctx.headers['userid'] || queryObj['userid'];
    //     let hostConfig: serverOption = new Config('db').rjck_prd;
    //     var options: httpOptions = {
    //         host: hostConfig.Host,
    //         port: hostConfig.Port,
    //         path: `/employee/${id}`,
    //         method: 'GET',
    //         api: ``,
    //         headers: {
    //             "Content-Type": "application/x-www-form-urlencoded"
    //         }
    //     };
    //     var str = "";
    //     return new Promise((resolve, reject) => {
    //         HttpRequestMethod.get(options, ctx).then((res) => {
    //             str += res;
    //             console.log(str);
    //             resolve(JSON.parse(str));
    //         }).catch(err => {
    //             reject(err);
    //         })
    //     })
    // }
}