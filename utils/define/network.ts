import 'reflect-metadata'
import { ROUTER_MAP } from './constant'
/**
 * @desc 生成 http method 装饰器
 * @param {string} method - http method，如 get、post、head
 * @return Decorator - 装饰器
 */
function createMethodDecorator(method: string) {
  // 装饰器接收路由 path 作为参数
  return function httpMethodDecorator(path: string, isVerify?: boolean) {
    return (proto: any, name: string) => {
      const target = proto.constructor;
      const routeMap = Reflect.getMetadata(ROUTER_MAP, target, 'method') || [];
      routeMap.push({ name, method, path, isVerify: !!isVerify });
      Reflect.defineMetadata(ROUTER_MAP, routeMap, target, 'method');
    };
  };
}
// 导出 http method 装饰器
export const POST = createMethodDecorator('post');
export const GET = createMethodDecorator('get');
export const DELETE = createMethodDecorator('delete');
export const PUT = createMethodDecorator('put');
export const PATCH = createMethodDecorator('patch');
export const OPTIONS = createMethodDecorator('options');
export const HEAD = createMethodDecorator('head');
export const ALL = createMethodDecorator('all');