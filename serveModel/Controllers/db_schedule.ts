const schedule = require('node-schedule');
const redisStore = require('koa-redis');
const stroe = new redisStore().client;
/***
*
定时任务类
***/
export default class ScheduleController {
    constructor() {
    }
    async canelAuthTask(user: any) {
        schedule.cancelJob(`KOA:TASK_SESSION:${user}`);
        schedule.scheduleJob(`KOA:TASK_SESSION:${user}`, '*/3****', () => {
            stroe.get(`KOA:TASK_SESSION:${user}`).then((res: any) => {
                console.log(`user${user}:${res}`);
                console.log(typeof res);
                if (res === 'true') {
                    stroe.set(`KOA:TASK_SESSION:${user}`, false);
                    console.log(`canceluser:${user}'sauth,at${new Date()}`);
                }
                else {
                    schedule.cancelJob(`KOA:TASK_SESSION:${user}`);
                }
            });
        })
    }
}