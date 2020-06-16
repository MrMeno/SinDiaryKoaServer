const router = require('koa-router')()
const { sqlEntry } = require('../utils/query');
const crypto = require('crypto');
var md5 = require('md5');
const { toolClass } = require('../utils/tools');
var WX_USER_INFO_TABLE=require('../map/wx_user_info.js');

const {
  // CREATE_TABLE,
  INSERT,
  UPDATE,
  DELETE,
  QUERY,
  getRandomId
} = require('../utils/sql')

// 初始化数据库，创建表
//sqlEntry(CREATE_TABLE)

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
});

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
});

router.post('/login', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
});
router.post('/regist', async (ctx, next) => {
  let name = ctx.request.body.userName;
  let mobile = ctx.request.body.mobile;
  let password = ctx.request.body.password;
  let paramObj = {
    user_name: name,
    user_id: getRandomId(28),
    create_time: toolClass.getCurrentTime(new Date(), 'yyyy-MM-dd hh:mm:ss'),
    user_phone: mobile,
    password: md5(password)
  };
  //生成sql语句
  let getUserSql = QUERY('wx_user_info', { user_phone: mobile }, true);
  let sql = INSERT('wx_user_info', paramObj);
  await sqlEntry(getUserSql).then(data => {
    //查询用户是否已注册
    let dataCount=JSON.parse(JSON.stringify(data))[0]['COUNT(*)'];
    console.log(dataCount)
    if (dataCount != 0) {
      //用户手机号已存在
       ctx.response.body = { code: '100210', data: { userName: name, mobile: mobile }, msg: '用户已存在' };
      }
    else {
      //不存在则注册用户
        sqlEntry(sql).then(res => {
        ctx.response.body = { code: '000000', data: { userName: name, mobile: mobile }, msg: '注册成功' };
      }).catch(err => {
        ctx.response.body = { code: '999999', data: err, msg: '注册失败' };
      });
    }
  }).catch(resErr=>{
    ctx.response.body = { code: '999999', data: resErr, msg: '注册失败' };
  })
  next()
});


module.exports = router
