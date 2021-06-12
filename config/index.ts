import DevConfig from './config.dev'
import {ConfigCollection} from'./config.base'
const env:string|undefined=process.env.NODE_ENV;
const getConfig= ():ConfigCollection=>{
return new DevConfig();
}
export default getConfig;