import DevConfig from './config.dev'
import {ConfigCollection} from'./config.base'
const env:string|undefined=process.env.NODE_ENV;
function getConfig(){
 
if(env==='dev'){
return DevConfig;
}
return DevConfig;
}
export default getConfig;