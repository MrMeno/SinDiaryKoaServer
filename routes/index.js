const router = require('koa-router')()

var md5 = require('md5');
const { toolClass } = require('../utils/tools');
const {sqlMap} =require('../map/index');
const { resolve } = require('bluebird');
var worldTree =require('../dist/Classes/world_tree');
router.get('/', async (ctx, next) => {
  (async () => {
    var admin = await sqlMap.zh_grab_detail_info.create({
      content: '虎狗',
      title: 'admin',
      href: 'www.baidu.com',
      author: 'admin',
      publishTime:  toolClass.getCurrentTime(new Date(),'yyyy-MM-dd'),
      updateTime:  toolClass.getCurrentTime(new Date(),'yyyy-MM-dd'),
      zhNumber: toolClass.getRadomHex(16),
      nickName: '一只羊咩咩咩didid',
      grabPoint: '知乎'
    });
    console.log('created: ' + JSON.stringify(admin));
    console.log('----------------------')
    console.log(worldTree)
})();
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })

});

router.get('/prd_db_test', async (ctx, next) => {
//   (async () => {
//     var admin = await sg_grab_info.create({
//       id:0,
//       content: '虎狗',
//       title: 'admin',
//       href: 'www.baidu.com',
//       author: 'admin',
//       publishTime:  toolClass.getCurrentTime(new Date(),'yyyy-MM-dd hh:mm:ss.S'),
//       updateTime:  toolClass.getCurrentTime(new Date(),'yyyy-MM-dd hh:mm:ss.S'),
//       grabPoint: '搜狗'
//     });
//     console.log('created: ' + JSON.stringify(admin));
// })();
  ctx.body = 'koa2 prd database test'
});

router.post('/login', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
});
module.exports = router
