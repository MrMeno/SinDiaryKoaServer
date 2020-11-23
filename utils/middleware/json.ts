const jsonHandler=(app:any) => {
    app.use(async (ctx:any, next:any) => {
        ctx.success = function (data:any,msg?:string) {
            ctx.type = app.type || 'json'
            ctx.body = {
                code : app.successCode || '000000',
                msg : msg
            }
            if(data){
                ctx.body.data=data; 
            }
        }
        ctx.fail = function (msg:string,code:number,data?:any) {
            ctx.type = app.type || 'json'
            ctx.body = {
                code : code || app.failCode || '999999',
                msg : msg || app.successMsg || 'fail',
            }
            if(data){
                ctx.body.data=data; 
            }
            console.log(ctx.body)
        }
        ctx.unauth = function (msg:string,code:number) {
            ctx.type = app.type || 'json'
            ctx.body = {
                code : code || app.failCode || '900001',
                msg : msg || app.successMsg || 'unauth',
            }
            console.log(ctx.body)
        }
       await next()
    }
    );
}
export{
    jsonHandler
}