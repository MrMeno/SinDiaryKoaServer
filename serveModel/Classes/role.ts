import {Skill} from './skill'
class Role{
    private userName:string;/*角色名称*/
    private experience:number;/*角色经验值*/
    private treeLevel:string;/*世界树等级*/
    private skillList:Array<Skill>;/*技能列表*/
}
export{
  Role
}