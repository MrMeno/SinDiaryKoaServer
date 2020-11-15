   import * as INodeTree from '../Interfaces/world_tree_interface'
   abstract class worldTree{
   abstract levelUp():void;
   abstract roleChange():void;
   private level:number =0;
   constructor(){
       return this
   }
   growUp(token:string):void{
          this.level ++
   }
    
}