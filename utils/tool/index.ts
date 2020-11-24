import * as crypto from 'crypto'
export default class toolClass {
     /**
     * @dateTime 时间类型
     * @fmt 格式化的类型 yyyy-MM-dd hh:mm:ss.S 
     * @return 时间字符串
    */
 public static getCurrentTime = (dateTime:Date=new Date(), fmt:string) => {
        var o = {
            "M+": dateTime.getMonth() + 1, // 月份
            "d+": dateTime.getDate(), // 日
            "h+": dateTime.getHours(), // 小时
            "m+": dateTime.getMinutes(), // 分
            "s+": dateTime.getSeconds(), // 秒
            "q+": Math.floor((dateTime.getMonth() + 3) / 3), // 季度
            "S": dateTime.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (dateTime.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;

    }
    /**
     * @len 随机字符串长度
     * @return 随机字符串
    */
    public static getRadomHex = (len:number) => {
        let bufferStr= crypto.randomBytes(len);
        return bufferStr.toString('hex');
    }
    /** 
     * @min 最小值
     * @max 最大值
     * @return 随机数
     */
    public static getRandom(min:number, max:number) {
        return Math.floor(Math.random() * (min - max) + max) + Number(Math.random().toFixed(4));
    }
    /** 
     * *洗牌算法
     * @arr 输入的数组
     * @return 输出重新排序的数组
     */
    public static yateFisher(arr:Array<string>) {
        let i = arr.length;
        while (i) {
            let j = Math.floor(Math.random() * i--); //5555
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
        return arr;
    }
};
 