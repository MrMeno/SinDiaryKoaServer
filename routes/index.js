const router = require('koa-router')()
const { sqlEntry } = require('../utils/query');
const crypto = require('crypto');
var md5 = require('md5');
const { toolClass } = require('../utils/tools');
var zh_grab_detail_info=require('../map/zh_grab_detail_info.js');
var sg_grab_info=require('../map/sg_grab_info.js');
const {
  // CREATE_TABLE,
  INSERT,
  UPDATE,
  DELETE,
  QUERY,
  getRandomId,
  getRadomHex
} = require('../utils/sql_helper')

router.get('/', async (ctx, next) => {
  (async () => {
    var admin = await zh_grab_detail_info.create({
      content: '虎狗',
      title: 'admin',
      href: 'www.baidu.com',
      author: 'admin',
      publishTime:  toolClass.getCurrentTime(new Date(),'yyyy-MM-dd'),
      updateTime:  toolClass.getCurrentTime(new Date(),'yyyy-MM-dd'),
      zhNumber: getRandomId(),
      nickName: '一只羊',
      grabPoint: '知乎'
    });
    console.log('created: ' + JSON.stringify(admin));
})();
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })

});

router.get('/prd_db_test', async (ctx, next) => {
  console.log(getRadomHex(16));
  (async () => {
    var admin = await sg_grab_info.create({
      id:0,
      content: '虎狗',
      title: 'admin',
      href: 'www.baidu.com',
      author: 'admin',
      publishTime:  toolClass.getCurrentTime(new Date(),'yyyy-MM-dd hh:mm:ss.S'),
      updateTime:  toolClass.getCurrentTime(new Date(),'yyyy-MM-dd hh:mm:ss.S'),
      grabPoint: '搜狗'
    });
    console.log('created: ' + JSON.stringify(admin));
})();
  ctx.body = 'koa2 prd database test'
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
