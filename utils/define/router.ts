import 'reflect-metadata'
import * as fs from 'fs'
import * as path from 'path'
import { ROUTER_MAP } from './constant'
import { RouteMeta } from './type'
import koaRouter from 'koa-router'

const addRouter = (router: koaRouter) => {
  const ctrPath = path.join(__dirname, 'controller');
  const modules: ObjectConstructor[] = [];
  // 扫描controller文件夹，收集所有controller
  fs.readdirSync(ctrPath).forEach(name => {
    if (/^[^.]+\.(t|j)s$/.test(name)) {
      modules.push(require(path.join(ctrPath, name)).default)
    }
  });
  // 结合meta数据添加路由 和 验证
  modules.forEach(m => {
    const routerMap: RouteMeta[] = Reflect.getMetadata(ROUTER_MAP, m, 'method') || [];
    if (routerMap.length) {
      const ctr = new m();
      routerMap.forEach(route => {
        const { name, method, path} = route;
        router[method](path, ctr[name]);
      })
    }
  })
}
export default addRouter