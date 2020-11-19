module.exports = (app:any) => {
    app.use(async (ctx:any, next:any) => {
        let status = 0;
        let fileName = "";
        try{
            await next();
            status = ctx.status;
        }catch(err){
            //console.log(err);
            status = 500;
        }
        if(status >= 400){
            switch(status){
                case 400:
                case 404:
                case 500:
                    fileName = status.toString();
                    break;
                default:
                    fileName = "other";
                    break;
            }
        }
        ctx.response.status = status;
        ctx.render('index',{
            title:'page not find'
          })
        console.log(fileName);
    },
    app.use(async (ctx:any, next:any)=>{
        try{
            await next();   // 执行后代的代码
            if(!ctx.body){  // 没有资源
                // ctx.body = "not found"
                ctx.render('error',{
                    content:'hasaki',
                    error:{
                        status:ctx.status,
                        stack:'page not find',
                        message:'page not find'
                    }
                  })
            }
        }catch(e){
         
        }
    })
    );
}