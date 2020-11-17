   abstract class worldTree{
   abstract roleChange():void;
   private level:number =0;
   constructor(levelUp:Boolean,token:string){    
    levelUp? this.levelUp(token):this.levelDown(token)
   }
   levelUp(token:string):void{
          this.level ++
   }
   levelDown(token:string):void{
       this.level--
   }
   goDie(token:string):void{
       this.level=0
   }
    
}
export default {
    worldTree
}